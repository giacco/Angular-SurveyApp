const express = require('express')
const cors = require('cors');
const fs = require('fs')
const app = express()
const port = 3000

const db = JSON.parse(fs.readFileSync('./server/db.json'))
app.use(cors());
app.use(express.json())

function shuffle(array) {
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
// get all question from db without the correct answers
app.get('/', (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  let shuffledArray = shuffle(db.survey);

  let questions = shuffledArray.map(el => ({ 
    id: el.id,
    question: el.question,
    answers: el.answers
  }));
  
  res.json(questions)
})

// count corrected answers
function count(tartgetArray) {
  let intersection = db.survey.filter(x => tartgetArray.some(b => x.correctAnswer == b.answer));
  //console.log("int",intersection);
  return intersection.length;
}

// return 
function getCorrected(tartgetArray){
    let mfilter = db.survey.filter(o1 => tartgetArray.some(o2 => o1.id === o2.id));
    let mArray = [];
    for (let i =0 ; i < mfilter.length; i++ ) {
      mArray.push(mfilter[i].correctAnswer)
    }
    let result = {
      correctNumber: count(tartgetArray),
      correct : mArray,
    }
    // console.log(mArray)
    return result
}


// here post an array of answer and chech with db.survery[].correctAnswer
app.post('/', (req,res) => {
  //console.log((req.body))
  let answersToCheck = req.body;
  let a = getCorrected(answersToCheck)
  res.json(a)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})