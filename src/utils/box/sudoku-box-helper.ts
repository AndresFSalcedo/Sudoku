// Imports.
export const NUMPAD_ORDER = [7, 8, 9, 4, 5, 6, 1, 2, 3];

export const getBoxBorderStyle = (row: number, column: number, isSelected: boolean): string => {
    // Detect 3x3 grid boundaries for styling
    const isBoldBottom = row % 3 === 0 && row !== 9;
    const isBoldRight = column % 3 === 0 && column !== 9;
    
    const borderClasses = [(isSelected ? "border-2 border-blue-600" : "border border-gray-300"),
      (isBoldBottom && !isSelected ? "border-b-2 border-b-black" : ""),
      (isBoldRight && !isSelected ? "border-r-2 border-r-black" : ""),
      `relative flex items-center justify-center text-lg`
    ].join(" ");
    return borderClasses;
}

export const getBoxInputClassName = (
  isFixedValue: boolean,
  //hideInput: boolean
): string => {

  return [
    "w-full h-full text-center text-4xl bg-transparent outline-none caret-transparent absolute inset-0",
    (isFixedValue ? "text-black" : "text-gray-500 font-bold")
  ]
    .filter(Boolean)
    .join(" ");
};
