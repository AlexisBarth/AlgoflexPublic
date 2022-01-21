import { integer } from "@codingame/monaco-languageclient";

export interface CardItemProps {
    cardId?: integer;
    cardName?: string;
    cardDesc?: string;
    cardImage?: string;
    exerciseCount?: number;
    finishedExerciseCount?: number;
    favoriteStatus?: boolean;
}

