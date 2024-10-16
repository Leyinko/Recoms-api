import mongoose from 'mongoose';

import { Recommendation } from '../models/Recommendations.js';
import User from '../models/User.js';
import { deleteImgCloudinary } from '../../config/Cloudinary/Cloudinary.js';

export const getUsersRecommendations = async (req, res, next) => {
  try {
    const { category } = req.params;

    const recommendations =
      category !== 'All'
        ? await Recommendation.find({ category: category }).populate('user', 'username')
        : await Recommendation.find().populate('user', 'username');

    if (!recommendations) {
      return res.status(400).json({
        message: 'Recommendations fetch error',
        status: 400,
      });
    }
    if (recommendations.length === 0) {
      return res.status(200).json({
        message: 'No recoms yet',
        status: 200,
      });
    } else {
      return res.status(200).json({
        message: `${category} recoms`,
        status: 200,
        recommendations: recommendations,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const insertRecommendation = async (req, res, next) => {
  try {
    const username = req.body.user;
    const { _id } = await User.findOne({ username: req.body.user });

    const data = { ...req.body, img: req.file.path, user: _id };

    // Avoid same user Recommendation
    const recommendationExists = await Recommendation.findOne({ name: new RegExp(data.name, 'i'), user: _id });
    if (recommendationExists) {
      return res.status(404).json({
        message: 'Recom already exists',
        status: 404,
      });
    } else {
      // Insert in Recommendations Collection
      const insert = new Recommendation(data);
      await insert.save();

      // Insert in User's Collection
      const userCollection = await mongoose.connection.db.collection(username).insertOne(insert);
      if (userCollection) {
        return res.status(201).json({
          message: 'Recom inserted',
          status: 201,
        });
      } else {
        // Delete Recommendation Image
        await deleteImgCloudinary(data.img);

        return res.status(400).json({
          message: 'Error inserting recom',
          status: 400,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const updateRecommendation = async (req, res, next) => {
  try {
    const { item, user } = req.params;
    const { _id } = await User.findOne({ username: user });

    if (req.user.username === user) {
      const original = await Recommendation.findOne({ name: new RegExp(item, 'i'), user: _id });
      if (!original) {
        return res.status(400).json({
          message: 'Recom not found',
          status: 400,
        });
      } else {
        // Delete Old Img Recommendation
        await deleteImgCloudinary(original.img);

        // Update Data
        const data = { ...req.body, img: req.file.path, user: _id };

        // User Collection
        await mongoose.connection.db.collection(user).findOneAndUpdate({ name: item }, { $set: data });
        // Recommendations Collection
        await Recommendation.findByIdAndUpdate(
          original._id,
          { $set: data },
          {
            new: true,
            runValidators: true,
          }
        );

        return res.status(200).json({
          message: 'Recom updated',
          status: 200,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getUserRecommendationCollection = async (req, res, next) => {
  try {
    const { user } = req.params;

    if (req.user.username === user || req.user.role === 'admin') {
      // User Collection name
      const userCollection = await mongoose.connection.db.collection(user).findOne({ collection: { $exists: true } });
      const recommendationsCollection = await Recommendation.find().populate('user', 'username');

      const userRecommendations = recommendationsCollection.filter(
        (recommendations) => recommendations.user.username === user && recommendations
      );

      if (!userCollection) {
        return res.status(200).json({
          message: 'Ready to insert collection',
          status: 200,
        });
      } else {
        const data = {
          name: userCollection.collection,
          cover: userCollection.img,
          recommendations: userRecommendations,
        };

        return res.status(200).json({
          message: `Profile loaded`,
          status: 200,
          profile: data,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deleteRecommendation = async (req, res, next) => {
  try {
    const { card, user } = req.body;
    const { _id } = await User.findOne({ username: user });

    if (req.user.username === user || req.user.role === 'admin') {
      // From Recommendations collections
      const recommendation = await Recommendation.findOne({ name: new RegExp(card, 'i'), user: _id });
      // Recommendation Image
      await deleteImgCloudinary(recommendation.img);
      await recommendation.deleteOne();
      // From User collection
      await mongoose.connection.db.collection(user).findOneAndDelete({ name: new RegExp(card, 'i') });
      return res.status(200).json({
        message: 'Recom deleted',
        status: 200,
      });
    } else {
      return res.status(401).json({
        message: 'No permission for this action',
        status: 401,
      });
    }
  } catch (error) {
    next(error);
  }
};
