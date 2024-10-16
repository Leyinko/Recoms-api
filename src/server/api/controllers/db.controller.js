import mongoose from 'mongoose';
import { exec } from 'child_process';

import { Collection, Recommendation } from '../models/Recommendations.js';
import User from '../models/User.js';
import { deleteImgCloudinary } from '../../config/Cloudinary/Cloudinary.js';

export const getAppStats = async (req, res, next) => {
  try {
    const dbStats = await mongoose.connection.db.stats();
    const admin = await mongoose.connection.db.admin().serverStatus();
    const users = await User.find();
    const recommendations = await Recommendation.find();

    const DBData = {
      active: dbStats.ok,
      server_version: admin.version,
      name: dbStats.db,
      users: users.length,
      recommendations: recommendations.length,
    };

    if (dbStats.ok) {
      return res.status(200).json({
        message: 'Welcome to Recom-API',
        status: 200,
        stats: DBData,
      });
    } else {
      return res.status(400).json({
        message: 'Unable to connect',
        status: 400,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const resetAppWithSeedAll = async (req, res, next) => {
  try {
    const user = req.body.user;

    if (user !== 'admin')
      return res.status(400).json({
        message: 'Action prohibited',
        status: 400,
      });

    const script = 'npm run seed All';
    await seedAllScriptExec(script)
      .then((seeded) => {
        return res.status(200).json({
          message: 'Application reset complete',
          status: 200,
          operation: seeded,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          message: 'Application reset failed',
          error: error,
          status: 400,
        });
      });

    // Execute Seed Script
    function seedAllScriptExec(script) {
      return new Promise((resolve, reject) => {
        exec(script, (error, stdout, stderr) => {
          if (error) reject(stderr);
          resolve(stdout);
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getCollections = async (req, res, next) => {
  try {
    // Collections
    const collectionsDB = await Collection.find().populate('owner', 'username');
    // Users Collections
    const usersDB = await mongoose.connection.db.collection('Users').find().toArray();

    if (usersDB.length === 0) {
      return res.status(400).json({
        message: 'No data available',
        status: 400,
      });
    } else {
      return res.status(200).json({
        message: 'Dashboard Access Granted',
        status: 200,
        collections: collectionsDB,
        users: usersDB,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createAccountCollection = async (req, res, next) => {
  try {
    const { user, collection } = req.body;
    const { _id } = await User.findOne({ username: user });

    const data = {
      collection: collection,
      img: req.file.path,
      owner: _id,
    };

    const collectionExists = await mongoose.connection.db.collection(user).find().toArray();

    if (collectionExists.length === 0 || !collectionExists) {
      // Collections
      const userCollection = new Collection(data);
      await userCollection.save();

      // User Collection
      const collectionAccount = await mongoose.connection.db.createCollection(user);
      await collectionAccount.insertOne(userCollection);

      return res.status(201).json({
        message: 'Collection created',
        status: 201,
      });
    } else {
      // Delete Img
      await deleteImgCloudinary(data.img);

      return res.status(400).json({
        message: 'Collection already exists',
        status: 400,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const dropAccountCollection = async (req, res, next) => {
  try {
    const { username } = req.body;
    const { _id } = await User.findOne({ username: username });
    const collection = await mongoose.connection.db.collection(username).find().toArray();

    if (req.user.username === username || req.user.role === 'admin') {
      if (collection.length !== 0) {
        // Drop user Collection
        await mongoose.connection.db.collection(username).drop();

        // Drop user collection from Collections
        const nameCollection = collection.find((item) => item?.collection).collection;
        const DBcollection = await Collection.findOneAndDelete({ collection: nameCollection });

        // ... and all the Recommendations
        await mongoose.connection.db.collection('Recommendations').deleteMany({ user: _id });

        // Cloudinary Img
        DBcollection && (await deleteImgCloudinary(DBcollection.img));

        return res.status(200).json({
          message: 'Collection deleted',
          status: 200,
        });
      } else {
        return res.status(400).json({
          message: 'Collection not found',
          status: 400,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
