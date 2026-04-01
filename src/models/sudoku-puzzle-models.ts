export type IPuzzleDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface IPuzzleClue {
    boxId: string;
    value: number;
}

export interface ISudokuPuzzle {
    id: string;
    name: string;
    difficulty: IPuzzleDifficulty;
    clues: IPuzzleClue[];
}
