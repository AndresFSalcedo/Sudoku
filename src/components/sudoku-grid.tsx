// Imports.
import type React         from "react";
import SudokuBox          from "@components/sudoku-box-component";
import { useSudokuStore } from "@store/sudoku-store";

const SudokuGrid: React.FC = () => {
    
    // Store State.
    const grid = useSudokuStore(s => s.gridData);

    return (
        <div className="grid grid-cols-9 grid-rows-9 w-[600px] h-[600px] bg-white border-4 border-gray-800 shadow-lg outline-none focus:ring-1 ring-blue-300">
            {grid.map((box) => {
                return (
                    <SudokuBox key={box.boxId} boxId={box.boxId} />
                );
            })}
        </div>
    );
}

export default SudokuGrid;
