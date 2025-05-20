// Imports.
import type { IBackgroundColor } from "./sudoku-grid-models";

export const CLEAR_CELL_KEY: string[] = ['Backspace', 'Delete']

export interface ISudokuBox {
    boxId: string;
    row: number;
    column: number;
    value: number | "";
    notes: number[]; // pencil marls with values 1 to 9.
    backgroundColor: IBackgroundColor;
    isFixedValue: boolean;
    boxGroup: number;
}
