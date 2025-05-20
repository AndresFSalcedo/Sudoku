// Imports.
import type { ISudokuBox } from "@models/sudoku-box-models";
import type { IDigitCount,
              IBackgroundColor } from "@models/sudoku-grid-models";

export const INITIAL_SUDOKU_GRID: ISudokuBox[] = Array.from({ length: 9 }, (_, rowIndex) =>
  Array.from({ length: 9 }, (_, colIndex) => {
    const row = rowIndex + 1;
    const column = colIndex + 1;
    const boxGroup = (Math.floor((row - 1) / 3) * 3) + Math.floor((column - 1) / 3) + 1;

    const box: ISudokuBox = {
      row,
      column,
      boxGroup,
      value: "",
      notes: [],
      isFixedValue: false,
      boxId: `${row}-${column}`,
      backgroundColor: "bg-white",
    }
    return box;
  })
).flat();

export const INITIAL_DIGIT_COUNTS: Record<number, IDigitCount> = {
  1: {count: 0, problem: false},
  2: {count: 0, problem: false},
  3: {count: 0, problem: false},
  4: {count: 0, problem: false},
  5: {count: 0, problem: false},
  6: {count: 0, problem: false},
  7: {count: 0, problem: false},
  8: {count: 0, problem: false},
  9: {count: 0, problem: false}
}

export const ARROW_KEYBOARD_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export const AVAILABLE_BOX_COLORS: IBackgroundColor[] = ["bg-amber-200", "bg-lime-200", "bg-rose-200", "bg-sky-200", "bg-slate-300", "bg-cyan-200", "bg-violet-200", "bg-white"]; 
