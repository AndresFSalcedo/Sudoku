// Imports.
import type React               from 'react';
import { useSudokuStore }       from '@store/sudoku-store';
import { getBoxBorderStyle,
         getBoxInputClassName, 
         NUMPAD_ORDER} from '@utils/box/sudoku-box-helper';

interface ISudokuBoxProps {
    boxId: string;
}

const SudokuBox: React.FC<ISudokuBoxProps> = ({ boxId }) => {
    // Store variables.
    const box = useSudokuStore(s => s.gridData.find(record => record.boxId === boxId));
    const inputMode = useSudokuStore(s => s.inputMode);
    const isSelected = useSudokuStore(s => s.selectedBoxes.has(boxId));
    const singleSelectedBox = useSudokuStore(s => {
        // Only want this feature when there is only one box selected.
        if(s.selectedBoxes.size !== 1) return undefined;
        // Get the only box id on the set.
        const [selectedBoxId] = s.selectedBoxes;
        // Find the value of the selected box.
        return s.gridData.find(record => record.boxId === selectedBoxId);

    });
    // Store Actions.
    const onBoxSelectionChanged = useSudokuStore(s => s.selectBox);

    if(!box) return null;
    
    const { value, row, column, isFixedValue, backgroundColor, notes } = box;

    const sameValue = typeof singleSelectedBox === 'object'
        && typeof singleSelectedBox.value === 'number'
        && typeof value === 'number'
        && singleSelectedBox.value === value;
    
    const sameRow = typeof singleSelectedBox === 'object' && singleSelectedBox.row === row;
    const sameColumn = typeof singleSelectedBox === 'object' && singleSelectedBox.column === column;

    /**
     * Event handler when the user clicks on the box.
     * @param e The react mouse event.
     * 
     */
    const boxSelectionEventHandler = (e: React.MouseEvent) => {
        if(inputMode === 'pencil' && value !== '') return;
        onBoxSelectionChanged(boxId, e.ctrlKey);
    }

    return (
        <div className={`${backgroundColor} ${getBoxBorderStyle(row, column, isSelected)}`}
            onClick={boxSelectionEventHandler}>
                <input id={`input-id-${boxId}`}
                            type="text"
                            inputMode="numeric"
                            value={value}
                            className={getBoxInputClassName(backgroundColor, isFixedValue, sameRow, sameColumn, sameValue)}
                            readOnly
                            autoComplete="off"
                />
                {notes.length > 0 &&
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 text-[10px] p-[2px] text-gray-600 font-medium select-none">
                        { NUMPAD_ORDER.map(num => {
                            return (
                                <div key={num} className="flex items-center justify-center">
                                    {notes.includes(num) ? num : ''}
                                </div>
                            );
                        })}
                    </div>
                }
        </div>
    )
}

export default SudokuBox;