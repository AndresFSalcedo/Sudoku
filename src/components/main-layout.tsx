// Imports.
import type React   from "react";
import Control      from "@components/control-component";
import SudokuGrid   from "@components/sudoku-grid";
import { useSudokuStore } from "@store/sudoku-store";
import { CLEAR_CELL_KEY } from "@models/sudoku-box-models";
import { ARROW_KEYBOARD_KEYS } from "@utils/grid/sudoku-grid-constants";


const MainLayout: React.FC = () => {

    const inputMode = useSudokuStore(s => s.inputMode);
    // Store Actions.
    const setInputMode = useSudokuStore(s => s.setInputMode);
    const onSetBoxNote = useSudokuStore(s => s.setBoxNoteForSelectedBoxes);
    const onSetBoxValue = useSudokuStore(s => s.setBoxValueForSelectedBoxes);
    const onMoveSelection = useSudokuStore(s => s.moveSelection);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.altKey) {
            switch (e.key) {
            case '1':
                setInputMode('setup');
                return;
            case '2':
                setInputMode('solve');
                return;
            case '3':
                setInputMode('pencil');
                return;
            }
            return;
        } else if(e.ctrlKey) {
            return;
        }

        const key = e.key;
        const selected = useSudokuStore.getState().selectedBoxes;
        
        if (selected.size === 0) return;

        if(ARROW_KEYBOARD_KEYS.includes(key)) {
            const direction = key.replace('Arrow', '').toLowerCase() as 'up' | 'down' | 'left' | 'right';
            onMoveSelection(direction);
        } else {
            switch(inputMode) {
                case "solve":
                case "setup": {
                    // Clear box.
                    if(CLEAR_CELL_KEY.includes(key)) {
                        onSetBoxValue("");
                    }
                    
                    if(/^[1-9]$/.test(e.key)) {
                        onSetBoxValue(parseInt(e.key));
                    }
                    break;
                }
                case "pencil":
                    if(/^[1-9]$/.test(e.key)) {
                        onSetBoxNote(parseInt(e.key));
                    }
                    break;
            }
        }
    }

    return(
        <div id="main-layout"
            className="outline-none min-h-screen bg-gradient-to-br from-gray-100 to-white p-8"
            onKeyDown={handleKeyDown}
            tabIndex={0}>
            {/* Title */}
            <h1 className="text-4xl font-semibold text-black text-center mb-10 font-[Poppins]">
                Sudoku Solver
            </h1>

            {/* Main content layout */}
            <div className="flex justify-center gap-10">
                {/* Left: Control Panel */}
                <div className="w-[300px]">
                    <Control />
                </div>

                {/* Right: Grid */}
                <div>
                    <SudokuGrid />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;