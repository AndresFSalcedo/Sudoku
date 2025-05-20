// Imports.
import type React from "react";
import { AVAILABLE_BOX_COLORS } from "@utils/grid/sudoku-grid-constants";
import { useSudokuStore } from "@store/sudoku-store";
import Button from '@components/button-component';
import { header2ClassName } from "@styles/constants";

const BackgroundColorComponent: React.FC = () => {

    // State Actions.
    const setColor = useSudokuStore(s => s.setBackgroundColorForSelectedBoxes);
    const clearBackgroundColors = useSudokuStore(s => s.clearBackgroundColors);

    return (
        <>
            <h2 className={header2ClassName}>Highlight Color</h2>
            <div className="grid grid-cols-4 gap-2">
                {AVAILABLE_BOX_COLORS.map((color) => (
                    <button key={color}
                            onClick={() => setColor(color)}
                            className={`w-8 h-8 rounded ${color} border border-gray-400 hover:scale-110 transition-transform`}
                            title={color} />
                ))}
            </div>
            <Button fullWidth onClick={() => clearBackgroundColors()}>Clear Colors</Button>
        </>
    );
}

export default BackgroundColorComponent;
