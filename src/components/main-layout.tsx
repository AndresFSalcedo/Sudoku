// Imports.
import type React               from 'react';
import Control                  from '@components/control-component';
import SudokuGrid               from '@components/sudoku-grid';
import { useSudokuStore }       from '@store/sudoku-store';
import { CLEAR_CELL_KEY }       from '@models/sudoku-box-models';
import { ARROW_KEYBOARD_KEYS }  from '@utils/grid/sudoku-grid-constants';
import useBooleanHook           from '@hooks/useBooleanHook';
import ConfirmDialog            from './confirmation-dialogue-component';
import PuzzleSelectorComponent  from './puzzle-selector-component';
import BackgroundColorComponent from './background-color-component';
import ProgressComponent        from './progress-component';
import ClearGridComponent           from './clear-grid-component';
import CompletionModalComponent     from './completion-modal-component';
import TimerComponent               from './timer-component';
import NumpadComponent          from './numpad-component';


const MainLayout: React.FC = () => {

    const inputMode  = useSudokuStore(s => s.inputMode);
    const isPaused   = useSudokuStore(s => s.isPaused);
    // Store Actions.
    const setInputMode = useSudokuStore(s => s.setInputMode);
    const onSetBoxNote = useSudokuStore(s => s.setBoxNoteForSelectedBoxes);
    const onSetBoxValue = useSudokuStore(s => s.setBoxValueForSelectedBoxes);
    const onMoveSelection = useSudokuStore(s => s.moveSelection);

    // State.
    const [showConfirm, setShowConfirm] = useBooleanHook();
    const [showExtras, setShowExtras]   = useBooleanHook();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.altKey) {
            switch (e.key) {
            case '1':
                //setInputMode('setup'); Now ask for confirmation.
                setShowConfirm();
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
                case 'solve':
                case 'setup': {
                    // Clear box.
                    if(CLEAR_CELL_KEY.includes(key)) {
                        onSetBoxValue('');
                    }
                    
                    if(/^[1-9]$/.test(e.key)) {
                        onSetBoxValue(parseInt(e.key));
                    }
                    break;
                }
                case 'pencil':
                    if(/^[1-9]$/.test(e.key)) {
                        onSetBoxNote(parseInt(e.key));
                    }
                    break;
            }
        }
    }

    const confirmResetToSetup = () => {
        // Set back to setup mode.
        setInputMode('setup');
        setShowConfirm();
    }

    return(
        <div id="main-layout"
            className="outline-none min-h-screen bg-gradient-to-br from-gray-100 to-white p-2 sm:p-8"
            onKeyDown={handleKeyDown}
            tabIndex={0}>
            {/* Title */}
            <h1 className="text-xl sm:text-4xl font-semibold text-black text-center mb-2 sm:mb-10 font-[Poppins]">
                Sudoku Solver
            </h1>

            {/* Main content layout */}
            <div className="flex flex-col items-center lg:flex-row lg:items-start justify-center gap-6 lg:gap-10">

                {/* DESKTOP: full left control panel */}
                <div className="hidden lg:block w-[300px]">
                    <Control />
                </div>

                <div className="flex flex-col items-center gap-2 lg:gap-6 w-full lg:w-auto">

                    {/* MOBILE ONLY: essentials above the grid */}
                    <div className="lg:hidden w-full bg-white shadow rounded-md p-2">
                        <PuzzleSelectorComponent />
                    </div>

                    {/* Grid + timer */}
                    <div className="flex flex-col items-end gap-1">
                        <TimerComponent />
                        <div className="relative">
                            <div className={isPaused ? 'blur-sm pointer-events-none select-none' : ''}>
                                <SudokuGrid />
                            </div>
                            {isPaused && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-white font-bold text-2xl tracking-widest drop-shadow-lg">PAUSED</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MOBILE ONLY: numpad */}
                    <div className="lg:hidden w-full">
                        <NumpadComponent />
                    </div>

                    {/* MOBILE ONLY: extras toggle + panel */}
                    <div className="lg:hidden w-full flex flex-col gap-2">
                        <button
                            onClick={() => setShowExtras()}
                            className="w-full bg-white shadow rounded-md px-4 py-3 flex items-center justify-between text-sm font-semibold text-gray-700">
                            <span>Settings</span>
                            <span className={`transition-transform duration-200 ${showExtras ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {showExtras && (
                            <div className="w-full bg-white shadow rounded-md p-4">
                                <div className="flex flex-col gap-6">
                                    <BackgroundColorComponent />
                                    <ProgressComponent />
                                    <div className="flex items-center justify-center">
                                        <ClearGridComponent />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <CompletionModalComponent />
            { showConfirm &&
                <ConfirmDialog title="Switch to Setup Mode?"
                                message="This will clear all current values and pencil marks. Are you sure you want to reset the board?"
                                onConfirm={confirmResetToSetup} 
                                onCancel={() => { setShowConfirm(false); }} />
            }
        </div>
    );
}

export default MainLayout;