import mongoose from 'mongoose';

import { fork } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();

import User from '../../api/models/User.js';
import { Collection, Recommendation } from '../../api/models/Recommendations.js';

import MOCK_USERS from './mock/users.js';
import MOCK_RECOMMENDATIONS from './mock/recommendation.js';
import MOCK_COLLECTIONS from './mock/collections.js';

let scriptArgument = process.argv[2];

switch (scriptArgument) {
  case 'Users':
    seedInsertion(User, MOCK_USERS);
    break;
  case 'Collections':
    seedInsertion(Collection, MOCK_COLLECTIONS);
    break;
  case 'Recommendations':
    seedInsertion(Recommendation, MOCK_RECOMMENDATIONS);
    break;
  case 'All':
    seedAllData(['Users', 'Collections', 'Recommendations']);
    break;
  default:
    throw new Error('No such script');
}

async function seedInsertion(_model, _data) {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Database connected ✔');

    const collection = await _model.find();
    if (collection.length) {
      await _model.collection.drop();
      console.log(`Collection dropped ✔`);
    }

    const operation = scriptArgument.toString();
    await seedOperation(operation, _data, _model);
    console.log(`${operation} seed operation completed ✔`);
  } catch (error) {
    console.error('Error during seedInsertion', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected ✔');
  }
}

const seedOperation = async (operation, _data, _model) => {
  try {
    for (const data of _data) {
      const user = await User.findOne({ username: data.owner || data.user });
      const username = data.owner || data.user;
      //
      if (operation === 'Users') {
        // Insert
        await _model.create(data);
        // Delete Username Collection
        const collections = await mongoose.connection.db.listCollections().toArray();
        for (let collection of collections) {
          if (collection.name !== 'Recommendations' && collection.name !== 'Users') {
            await mongoose.connection.db.dropCollection(collection.name);
          }
        }
      } else if (operation === 'Collections') {
        data.owner = user._id;
        const userCollection = await _model.create(data);

        // Create user specific Collection
        const collectionAccount = await mongoose.connection.db.createCollection(username);
        await collectionAccount.insertOne(userCollection);
      } else if (operation === 'Recommendations') {
        data.user = user._id;
        await _model.create(data);

        // Insert into user's Collection
        await mongoose.connection.db.collection(username).insertOne(data);
      } else {
        throw new Error('No such seed operation 🐛');
      }
    }
  } catch (error) {
    throw new Error('Seed operation error', error);
  }
};

async function seedAllData([...operations]) {
  try {
    for (let operation of operations) await relaunchScriptWithArgument(operation);
    console.log('All data seeded successfully ✔');
  } catch (error) {
    console.error('Error during seeding all operations', error);
  }
}

function relaunchScriptWithArgument(argument) {
  return new Promise((res, rej) => {
    const child = fork(process.argv[1], [argument]);
    // Node Process
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`Operation ${argument} completed successfully`);
        res();
      } else {
        rej(new Error(`Operation ${argument} failed`));
      }
    });
  });
}
