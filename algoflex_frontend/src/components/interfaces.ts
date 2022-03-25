export interface CardItemProps {
    uid?: number;
    name?: string;
    description?: string;
    imageUrl?: string;
    exerciseCount?: number;
    finishedExerciseCount?: number;
    favoriteStatus?: boolean;
}

export interface MarkdownProps{
    text: string;
}

export interface CodingQuestionInterface {
    uid?: string;
    name?: string;
    description?: string;
    theme?: string;
    prompt?: string;
}
