export interface QuestionInterface {
    id:number;
    question: string,
    answers: [string],
}
export interface ResultTableInterface {
    position: number,
    question: string,
    answer: string,
    correct?: string,
}
export interface userAnswer {
    id:number;
    answer: string;
}
export interface userAnswerResponse {
    correctNumber:number;
    correct: string[];
}