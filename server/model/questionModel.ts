import { Answer, Question, QuestionSurveyComplete, Survey } from '../interface';
import * as fs from 'fs';
const db : Survey = JSON.parse(fs.readFileSync('./server/model/db.json').toString())
const survey : Question[] = db.survey;


/**
 * 
 * @param array : array to be shuffled
 * 
 * @returns  The shuffled array
 */

 const shuffle = (array:Question[]) : Question[] =>{
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

const getSurvey = ():Question[] => {
  let questions: Question[] = shuffle(survey.map(el => ({ 
    id: el.id,
    question: el.question,
    answers: el.answers
  }))
  )
  return questions
}
// Helper function to reoeda array based on body ids array
const mapOrder = (array:QuestionSurveyComplete[], order:number[], key:string) : QuestionSurveyComplete[] => {
  
  array.sort( function (a:any, b:any) {
    let A = a[key], B = b[key];
    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });
  return array;
};

// return corrected answer proprety based ids
const getResults = (ids: number[]) : string[] => {

  let filtered: QuestionSurveyComplete[] = mapOrder(db.survey.filter(item => ids.includes(item.id)),ids,'id');
  let result:string[] = [];

  filtered.forEach(item => {
    result.push(item.correctAnswer)
  });
  //console.log(result);
  return result;
}

export {
  getSurvey,
  getResults,
}