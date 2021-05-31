import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  setAnswer(val:boolean) {
    if(val){
      console.log('yes')
    }
    else {
      console.log('nnn')
    }
  }
}
