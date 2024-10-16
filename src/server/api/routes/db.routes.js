import express from 'express';
import {
  createAccountCollection,
  dropAccountCollection,
  getAppStats,
  getCollections,
  resetAppWithSeedAll,
} from '../controllers/db.controller.js';
import upload from '../../middlewares/cloudinary-files-upload.cjs';
import {
  deleteRecommendation,
  getUsersRecommendations,
  getUserRecommendationCollection,
  insertRecommendation,
  updateRecommendation,
} from '../controllers/recommendations.controller.js';
import { excludeRoutes } from '../../utils/routes-excluder.js';
import { isAdmin, isLoggedIn } from '../../middlewares/authorizations-middlewares.js';

const dbRouter = express.Router();

// General Middlewares
dbRouter.use(excludeRoutes(isLoggedIn, ['/app']));

// App
dbRouter.get('/app/stats', getAppStats);
dbRouter.post('/reset', isAdmin, resetAppWithSeedAll);

// Collections
dbRouter.get('/collections', isAdmin, getCollections);
dbRouter.post('/collection/create', upload.single('img'), createAccountCollection);
dbRouter.delete('/collection/delete', dropAccountCollection);

// Recommendations
dbRouter.get('/recommendations/:category', getUsersRecommendations);
dbRouter.get('/recommendations/collection/:user', getUserRecommendationCollection);
dbRouter.post('/recommendation/insert', upload.single('img'), insertRecommendation);
dbRouter.put('/recommendation/:user/:item', upload.single('img'), updateRecommendation);

dbRouter.delete('/recommendations/delete/', deleteRecommendation);

export default dbRouter;
