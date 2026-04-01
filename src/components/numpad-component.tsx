// Imports.
import type React           from 'react';
import { useSudokuStore }   from '@store/sudoku-store';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NumpadComponent: React.FC = () => {

    const inputMode      = useSudokuStore(s => s.inputMode);
    const selectedBoxes  = useSudokuStore(s => s.selectedBoxes);
    const setBoxValue    = useSudokuStore(s => s.setBoxValueForSelectedBoxes);
    const setBoxNote     = useSudokuStore(s => s.setBoxNoteForSelectedBoxes);

    const hasSelection = selectedBoxes.size > 0;

    const onNumber = (num: number) => {
        if (inputMode === 'pencil') {
            setBoxNote(num);
        } else {
            setBoxValue(num);
        }
    };

    const isPencil    = inputMode === 'pencil';
    const buttonBase  = 'flex items-center justify-center rounded-lg text-xl font-bold transition active:scale-95 select-none';
    const buttonColor = isPencil
        ? 'bg-violet-100 text-violet-700 hover:bg-violet-200 disabled:opacity-40'
        : 'bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-40';

    return (
        <div className="w-full bg-white shadow rounded-md p-3 flex flex-col gap-2">
            <div className="grid grid-cols-9 gap-2">
                {NUMBERS.map(num => (
                    <button
                        key={num}
                        onClick={() => onNumber(num)}
                        disabled={!hasSelection}
                        className={`${buttonBase} ${buttonColor} py-4`}>
                        {num}
                    </button>
                ))}
            </div>
            {!isPencil && (
                <button
                    onClick={() => setBoxValue('')}
                    disabled={!hasSelection}
                    className={`${buttonBase} w-full py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40`}>
                    ⌫
                </button>
            )}
        </div>
    );
}

export default NumpadComponent;
