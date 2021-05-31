import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { QuestionInterface, ResultTableInterface, userAnswer, userAnswerResponse } from '../question';
import { MatSnackBar } from '@angular/material/snack-bar';
import { slideInRightAnimation} from 'angular-animations';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  animations: [ 
    slideInRightAnimation(),
   ]
})

export class SurveyComponent implements OnInit {

  questionAll: QuestionInterface[] = [];
  questionToAsk: QuestionInterface[]  = [];
  counter: number = 1 ;

  userAnswerQuestion: userAnswer[] = [];
  userAnswer: string | undefined ;
  currentQuestion!: QuestionInterface

  animState : boolean = false;

  // used for show hide quiz and result
  showQuiz :boolean = true;
  // showTable: boolean = false
  
  resultTable: ResultTableInterface[] = [];
  correctNumber:number = 0;

  displayedColumns: string[] = ['position', 'question', 'answer', 'correct'];

  constructor(private surveyService: SurveyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.surveyService.sendGetQuestionRequest().subscribe((data: QuestionInterface[]) => {
      // console.log(data);
      this.questionAll = data;
      this.questionToAsk = [...this.questionAll];
      
    })
  }

  private openSnackBar(message: string, action: string) : void {
    this._snackBar.open(message, action ,{
      duration: 3000
    });
  }

  setAnswer(value: string): void {
   if(value) {
    this.userAnswerQuestion.push({ id:this.questionToAsk[0].id, answer:value});
    if ( this.userAnswerQuestion.length == this.questionAll.length ) {
        console.log('Stop...sending')
        this.postQuestion();
        this.showQuiz  = false;
        // this.showTable = true;
      }else{
        this.counter ++;
        this.animState = false;
        this.questionToAsk.shift();
        this.userAnswer = undefined;
      }
   } else {
    this.openSnackBar("Select one before proced","close")
   }
  }

  postQuestion():void {
    console.log((this.userAnswerQuestion))
    this.surveyService.sendPostAnswersRequest(this.userAnswerQuestion)
    .subscribe((data : userAnswerResponse) => {
      //console.log(data);
      this.populateFinalTable(data)
    }) 
  }

  animDone(): void {
    this.animState = true;
  }

  private populateFinalTable(data:userAnswerResponse) :void {

    for(let i :number = 0; i < this.questionAll.length; i++ ) {
      
      this.resultTable.push({
        position: i+1, 
        question: this.questionAll[i].question, 
        answer:this.userAnswerQuestion[i].answer,
        correct:data.correct[i] 
      })

    }
    this.correctNumber = data.correctNumber;
    //console.log("final table",data)
  }
}
