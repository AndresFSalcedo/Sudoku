import type { IBackgroundColor } from '@models/sudoku-grid-models';

// Imports.
export const NUMPAD_ORDER = [7, 8, 9, 4, 5, 6, 1, 2, 3];

/**
 * Gets the border style for a grid box.
 * @param row                 The row number. 
 * @param column              The column number.
 * @param isSelected          Whether the box is selected.
 * @param isSecondarySelected Whether the box should be hightlighted as holds the same value as a seleected box.
 * @returns                   The border style class.
 */
export const getBoxBorderStyle = (row: number, column: number, isSelected: boolean): string => {
    // Detect 3x3 grid boundaries for styling
    const isBoldBottom = row % 3 === 0 && row !== 9;
    const isBoldRight = column % 3 === 0 && column !== 9;
    
    const borderClasses = [(isSelected ? 'border-3 border-blue-700' : 'border border-gray-300'),
      (isBoldBottom && !(isSelected) ? 'border-b-2 border-b-black' : ''),
      (isBoldRight && !(isSelected) ? 'border-r-2 border-r-black' : ''),
      'relative flex items-center justify-center text-lg'
    ].join(' ');
    return borderClasses;
}

export const getBoxInputClassName = (
  backgroundColor: IBackgroundColor,
  isFixedValue: boolean,
  sameRow: boolean,
  sameColumn: boolean,
  isSecondarySelected: boolean
): string => {

  return [
    'w-full h-full text-center text-4xl outline-none caret-transparent absolute inset-0',
    (isFixedValue ? 'text-black' : 'text-blue-400'),
    ((sameRow || sameColumn || isSecondarySelected) && backgroundColor === 'bg-white' ? 'bg-blue-100' : '')
  ]
    .filter(Boolean)
    .join(' ');
};
