// Imports.
import type { IInputMode } from '@models/sudoku-grid-models';

export interface IMode {
    inputType: IInputMode;
    shortCut: string;
}

export const modes: IMode[] = [
    { inputType: 'setup', shortCut: 'Alt + 1'},
    { inputType: 'solve', shortCut: 'Alt + 2'},
    { inputType: 'pencil', shortCut: 'Alt + 3'}
];

export const getProgressColor = (count: number, problem: boolean): string => {
    if (problem || count > 9) return 'bg-red-500';
    const percent = count / 9;
    if (percent === 0) return 'bg-gray-300';
    if (percent < 0.33) return 'bg-red-400';
    if (percent < 0.66) return 'bg-amber-400';
    if (percent < 1) return 'bg-yellow-400';
    return 'bg-green-500';
};

export const getOverallProgress = (overallPercent: number, problem: boolean): string => {
    if(problem) return 'bg-red-400';
    if(overallPercent === 0 ) return 'bg-gray-300';
    else if(overallPercent < 0.33) return 'bg-red-400';
    else if(overallPercent < 0.66) return 'bg-amber-400';
    else if(overallPercent < 1) return 'bg-yellow-400';
    return 'bg-green-500';
}