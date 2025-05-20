// Imports.
import type { IInputMode } from "@models/sudoku-grid-models";

export const modes: IInputMode[] = ["setup", "solve", "pencil"];

export const getProgressColor = (count: number, problem: boolean): string => {
    if (problem || count > 9) return "bg-red-500";
    const percent = count / 9;
    if (percent === 0) return "bg-gray-300";
    if (percent < 0.33) return "bg-red-400";
    if (percent < 0.66) return "bg-amber-400";
    if (percent < 1) return "bg-yellow-400";
    return "bg-green-500";
};

export const getOverallProgress = (overallPercent: number, problem: boolean): string => {
    if(problem) return 'bg-red-400';
    if(overallPercent === 0 ) return 'bg-gray-300';
    else if(overallPercent < 0.33) return 'bg-red-400';
    else if(overallPercent < 0.66) return 'bg-amber-400';
    else if(overallPercent < 1) return 'bg-yellow-400';
    return 'bg-green-500';
}