// Imports.
import type React               from "react";
import { useSudokuStore }       from "@store/sudoku-store";
import { getBoxBorderStyle,
         getBoxInputClassName, 
         NUMPAD_ORDER} from "@utils/box/sudoku-box-helper";

interface ISudokuBoxProps {
    boxId: string;
}

const SudokuBox: React.FC<ISudokuBoxProps> = ({ boxId }) => {
    // Store variables.
    const box = useSudokuStore(s => s.gridData.find(record => record.boxId === boxId));
    const inputMode = useSudokuStore(s => s.inputMode);
    const isSelected = useSudokuStore(s => s.selectedBoxes.has(boxId));
    // Store Actions.
    const onBoxSelectionChanged = useSudokuStore(s => s.selectBox);

    if(!box) return null;
    
    const { value, row, column, isFixedValue, backgroundColor, notes } = box;

    /**
     * Event handler when the user clicks on the box.
     * @param e The react mouse event.
     * 
     */
    const boxSelectionEventHandler = (e: React.MouseEvent) => {
        if(inputMode === 'pencil' && value !== "") return;
        onBoxSelectionChanged(boxId, e.ctrlKey);
    }

    return (
        <div className={`${getBoxBorderStyle(row, column, isSelected)} ${backgroundColor}`}
            onClick={boxSelectionEventHandler}>
                <input id={`input-id-${boxId}`}
                            type="text"
                            inputMode="numeric"
                            value={value}
                            className={getBoxInputClassName(isFixedValue)}
                            readOnly
                            autoComplete="off"
                />
                {notes.length > 0 &&
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 text-[10px] p-[2px] text-gray-600 font-medium select-none">
                        { NUMPAD_ORDER.map(num => {
                            return (
                                <div key={num} className="flex items-center justify-center">
                                    {notes.includes(num) ? num : ""}
                                </div>
                            );
                        })}
                    </div>
                }
        </div>
    )
}

export default SudokuBox;