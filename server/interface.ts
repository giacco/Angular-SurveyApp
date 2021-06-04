export type Survey = {
    survey : QuestionSurveyComplete[];
}

export type QuestionSurveyComplete = {
    id: number;
    question: string;
    answers: string[];
    correctAnswer : string
}

export type Question = {
    id: number;
    question: string;
    answers: string[];
}
export type Answer = {
    id: number
}
