import * as express from 'express';
// controllers
import questionController from '../controllers/questionController';

// eslint-disable-next-line new-cap
const router = express.Router();


router
    .get('/', questionController.getQuestions)
    .post('/', questionController.postAnswer)

export default router;