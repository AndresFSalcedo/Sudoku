// Imports.
import React,
{ useState, useEffect, useMemo }         from 'react';
import Button                   from '@components/button-component';
import ConfirmDialog            from '@components/confirmation-dialogue-component';
import DropdownComponent        from '@components/dropdown-component';
import { useSudokuStore }       from '@store/sudoku-store';
import { header2ClassName }     from '@styles/constants';
import type { ISudokuPuzzle }   from '@models/sudoku-puzzle-models';

const PuzzleSelectorComponent: React.FC = () => {

    const [puzzles, setPuzzles] = useState<ISudokuPuzzle[]>([]);
    const puzzleOptions = useMemo(() => puzzles.map(p => ({ id: p.id, label: p.name })), [puzzles]); 

    useEffect(() => {
        import('@data/sudoku-puzzles.json').then(m => setPuzzles(m.default as ISudokuPuzzle[]));
    }, []);

    // Store.
    const loadPuzzle       = useSudokuStore(s => s.loadPuzzle);
    const gridData         = useSudokuStore(s => s.gridData);
    const selectedId       = useSudokuStore(s => s.selectedPuzzleId);
    const setSelectedId    = (id: string) => useSudokuStore.setState({ selectedPuzzleId: id });

    const [showConfirm, setShowConfirm] = useState(false);

    const hasProgress = gridData.some(box => !box.isFixedValue && (box.value !== '' || box.notes.length > 0));

    const onLoad = () => {
        if (hasProgress) {
            setShowConfirm(true);
        } else {
            applyLoad();
        }
    };

    const applyLoad = () => {
        const puzzle = puzzles.find(p => p.id === selectedId);
        if (puzzle) {
            loadPuzzle(puzzle);
        }
        setShowConfirm(false);
    };

    return (
        <>
            <h2 className={header2ClassName}>Puzzle</h2>
            <div className="flex gap-2">
                <div className="flex-1">
                    <DropdownComponent
                        options={puzzleOptions}
                        selectedId={selectedId}
                        placeholder="Select a puzzle..."
                        onChange={setSelectedId} />
                </div>
                <Button variant="primary" disabled={!selectedId} onClick={onLoad}>Load</Button>
            </div>
            {showConfirm && (
                <ConfirmDialog
                    title="Load New Puzzle?"
                    message="You have unsaved progress. Loading a new puzzle will clear the current board. Are you sure?"
                    onConfirm={applyLoad}
                    onCancel={() => setShowConfirm(false)} />
            )}
        </>
    );
}

export default PuzzleSelectorComponent;
