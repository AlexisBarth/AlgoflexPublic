import { integer } from "@codingame/monaco-languageclient";

export interface CardItemProps {
    uid?: integer;
    name?: string;
    description?: string;
    imageUrl?: string;
    exerciseCount?: number;
    finishedExerciseCount?: number;
    favoriteStatus?: boolean;
}

export interface CodingQuestionInterface {
    uid?: string;
    name?: string;
    description?: string;
    theme?: string;
    prompt?: string;
}