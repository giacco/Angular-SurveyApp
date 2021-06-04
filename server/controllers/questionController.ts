import {Request, Response} from 'express';
import  {getResults, getSurvey}  from '../model/questionModel';


export default {
    getQuestions: async (req:Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
    try {
      return res.status(200).json( getSurvey() );
    } catch (error) {
      return res.status(400).json({success: false, error: error});
    }
  },
  postAnswer: async (req :Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        // console.log('body',req.body)
        return res.status(200).json(getResults(req.body))

    } catch (error) {
      return res.status(400).json({success: false, error: error});
    }
  }

};
