// Imports.
import type React           from 'react';
import Button               from '@components/button-component';
import ConfirmDialog        from '@components/confirmation-dialogue-component';
import useBooleanHook       from '@hooks/useBooleanHook';
import { useSudokuStore }   from '@store/sudoku-store';

const ClearGridComponent: React.FC = () => {

    const clearGrid = useSudokuStore(s => s.clearGridData);
    const gridData  = useSudokuStore(s => s.gridData);

    const [showConfirm, setShowConfirm] = useBooleanHook();

    const hasContent = gridData.some(box => box.value !== '');

    const onClearGrid = () => {
        if (hasContent) {
            setShowConfirm(true);
        } else {
            clearGrid();
        }
    };

    return (
        <>
            <Button variant="danger" onClick={onClearGrid}>Clear Grid</Button>
            {showConfirm && (
                <ConfirmDialog
                    title="Clear Grid?"
                    message="This will remove all values and pencil marks from the board. Are you sure?"
                    onConfirm={() => { clearGrid(); setShowConfirm(false); }}
                    onCancel={() => setShowConfirm(false)} />
            )}
        </>
    );
}

export default ClearGridComponent;
