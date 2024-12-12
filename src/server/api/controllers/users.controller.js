import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken } from '../../utils/json-web-token.js';
import { deleteImgCloudinary } from '../../config/Cloudinary/Cloudinary.js';
import { Collection, Recommendation } from '../models/Recommendations.js';
import mongoose from 'mongoose';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { user, role } = req.body;
    if (user === 'admin')
      return res.status(404).json({
        message: `Admin's role cannot be modified`,
        status: 404,
      });

    const userToUpdate = await User.findOne({ username: user });
    if (!userToUpdate) {
      return res.status(404).json({
        message: `User not found`,
        status: 404,
      });
    } else {
      await userToUpdate.updateOne({ role: role });
    }

    return res.status(200).json({
      message: 'User updated successfully',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { user } = req.params;
    const oficialUser = await User.findOne({ username: user });

    if (user === 'admin')
      return res.status(404).json({
        message: `Admin's account cannot be deleted`,
        status: 404,
      });

    // User Image Delete
    await deleteImgCloudinary(oficialUser.img);

    // User's Recommendations
    const recommendations = await Recommendation.find({ user: oficialUser._id });
    for (let recommendation of recommendations) {
      await deleteImgCloudinary(recommendation.img);
      await recommendation.deleteOne();
    }

    // From Collections Collection
    const userCollection = await Collection.findOne({ owner: oficialUser._id });
    if (userCollection) {
      await deleteImgCloudinary(userCollection.img);
      await userCollection.deleteOne();
    }

    // Collection Name
    await mongoose.connection.db.collection(user).drop();
    // From Users
    await oficialUser.deleteOne();

    return res.status(200).json({
      message: 'All user data deleted',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({
        message: 'Invalid username or password',
        status: 400,
      });
    }

    const newUser = new User(req.body);
    newUser.img = req.file.path;

    const userInDB = await newUser.save();

    return res.status(201).json({
      message: 'Registration complete',
      status: 201,
      user: userInDB,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        message: `Invalid username or password`,
        status: 400,
      });
    }

    // Increment TokenVersion and Generate
    user.tokenVersion += 1;
    await user.save();
    const token = generateToken(user);
    //
    return res.status(200).json({
      message: `${user.username} logged in`,
      status: 200,
      user: user,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
