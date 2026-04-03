// Imports.
import React, { useState }  from 'react';
import { useSudokuStore }   from '@store/sudoku-store';
import ConfirmDialog        from '@components/confirmation-dialogue-component';
import type { IInputMode }  from '@models/sudoku-grid-models';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const MODES: { label: string; mode: IInputMode }[] = [
    { label: 'Setup',  mode: 'setup'  },
    { label: 'Solve',  mode: 'solve'  },
    { label: 'Pencil', mode: 'pencil' },
];

const NumpadComponent: React.FC = () => {

    const inputMode     = useSudokuStore(s => s.inputMode);
    const selectedBoxes = useSudokuStore(s => s.selectedBoxes);
    const setBoxValue   = useSudokuStore(s => s.setBoxValueForSelectedBoxes);
    const setBoxNote    = useSudokuStore(s => s.setBoxNoteForSelectedBoxes);
    const setInputMode  = useSudokuStore(s => s.setInputMode);

    const [showConfirm, setShowConfirm] = useState(false);

    const hasSelection = selectedBoxes.size > 0;
    const isPencil     = inputMode === 'pencil';

    const onNumber = (num: number) => {
        if (isPencil) {
            setBoxNote(num);
        } else {
            setBoxValue(num);
        }
    };

    const onModePress = (mode: IInputMode) => {
        if (mode === 'setup') {
            setShowConfirm(true);
        } else {
            setInputMode(mode);
        }
    };

    const buttonBase  = 'flex items-center justify-center rounded-lg font-bold transition active:scale-95 select-none disabled:opacity-40';
    const numberColor = isPencil
        ? 'bg-violet-100 text-violet-700 hover:bg-violet-200'
        : 'bg-blue-100 text-blue-700 hover:bg-blue-200';

    return (
        <div className="w-full bg-white shadow rounded-md p-3 flex flex-col gap-2">
            {/* Mode buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100">
                {MODES.map(({ label, mode }) => {
                    const isActive = inputMode === mode;
                    return (
                        <button
                            key={mode}
                            onClick={() => onModePress(mode)}
                            disabled={isActive}
                            className={`${buttonBase} text-sm py-2 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            {label}
                        </button>
                    );
                })}
            </div>
            
            {/* Numbers */}
            <div className="grid grid-cols-9 gap-2">
                {NUMBERS.map(num => (
                    <button
                        key={num}
                        onClick={() => onNumber(num)}
                        disabled={!hasSelection}
                        className={`${buttonBase} ${numberColor} text-xl py-3`}>
                        {num}
                    </button>
                ))}
            </div>

            {/* Backspace */}
            <button
                onClick={() => setBoxValue('')}
                disabled={!hasSelection || isPencil}
                className={`${buttonBase} w-full py-2 text-xl bg-gray-100 text-gray-600 hover:bg-gray-200`}>
                ⌫
            </button>

            {showConfirm && (
                <ConfirmDialog
                    title="Switch to Setup Mode?"
                    message="This will clear all current values and pencil marks. Are you sure you want to reset the board?"
                    onConfirm={() => { setInputMode('setup'); setShowConfirm(false); }}
                    onCancel={() => setShowConfirm(false)} />
            )}
        </div>
    );
}

export default NumpadComponent;
