// Imports.
import { create }                   from 'zustand';
import type { ISudokuBox }          from '@models/sudoku-box-models';
import type { ISudokuPuzzle }      from '@models/sudoku-puzzle-models';
import { INITIAL_SUDOKU_GRID,
         INITIAL_DIGIT_COUNTS }     from '@utils/grid/sudoku-grid-constants';
import type { IInputMode,
              IDigitCount,
              IBackgroundColor }    from '@models/sudoku-grid-models';

interface ISudokuState {
    // Variables.
    inputMode: IInputMode;
    gridData: ISudokuBox[];
    selectedBoxes: Set<string>;
    lastSelectedBox: string | undefined;
    digitCounts: Record<number, IDigitCount>;
    selectedPuzzleId: string;
    isComplete: boolean;
    startedAt: number | null;
    // Actions.
    clearGridData: () => void;
    dismissCompletion: () => void;
    computeCompletionMap: () => void;
    clearBackgroundColors: () => void;
    setInputMode: ( mode: IInputMode) => void;
    setBoxNoteForSelectedBoxes: (value: number) => void;
    selectBox: (boxId: string, ctrlKey: boolean) => void;
    setBoxValueForSelectedBoxes: (value: number | '') => void;
    moveSelection: (direction: 'up' | 'down' | 'left' | 'right') => void;
    setBackgroundColorForSelectedBoxes: (color: IBackgroundColor) => void;
    loadPuzzle: (puzzle: ISudokuPuzzle) => void;
}

// Store.
export const useSudokuStore = create<ISudokuState>((set, get) => ({
    // Variables.
    gridData: INITIAL_SUDOKU_GRID,
    selectedBoxes: new Set(),
    lastSelectedBox: undefined,
    inputMode: 'setup',
    digitCounts: INITIAL_DIGIT_COUNTS,
    selectedPuzzleId: '',
    isComplete: false,
    startedAt: null,

    // Actions.
    clearGridData: () => set(() => ({
        gridData: INITIAL_SUDOKU_GRID,
        selectedBoxes: new Set(),
        lastSelectedBox: undefined,
        inputMode: 'setup',
        digitCounts: INITIAL_DIGIT_COUNTS,
        selectedPuzzleId: '',
        isComplete: false,
        startedAt: null,
    })),

    dismissCompletion: () => set({ isComplete: false }),

    clearBackgroundColors: () => set((state) => ({ gridData: state.gridData.map((box) => ({...box, backgroundColor: 'bg-white'}))})),

    setInputMode: (newMode) => {
        set(state => {
            const updates: Partial<ISudokuState> = {
                inputMode: newMode
            };
            // Change from 'setup' to another: lock clues and start the timer.
            if(state.inputMode === 'setup' && (newMode === 'solve' || newMode === 'pencil')) {
                updates.gridData = state.gridData.map(box => box.value !== '' ? { ...box, isFixedValue: true} : box);
                updates.startedAt = Date.now();
            }
            // Change from another to 'setup': clear values/notes and reset timer.
            if((state.inputMode === 'solve' || state.inputMode === 'pencil') && newMode === 'setup') {
                updates.gridData = state.gridData.map(box => box.isFixedValue ? { ...box, isFixedValue: false} : {...box, value: '', notes: []});
                updates.startedAt = null;
                updates.isComplete = false;
            }
            return updates;
        })
    },

    selectBox: (boxId, ctrlKey) => set((state) => {
        let newLast;
        const updated = new Set(state.selectedBoxes);
        if (ctrlKey) {
            if(updated.has(boxId)) {
                updated.delete(boxId);
            } else {
                newLast = boxId;
                updated.add(boxId);
            }
        } else {
            updated.clear();
            newLast = boxId;
            updated.add(boxId);
        }
      return { selectedBoxes: updated, lastSelectedBox: newLast };
    }),

    moveSelection: (direction) => {
        const state = get();
        if(!state.lastSelectedBox) return;

        const [row, col] = state.lastSelectedBox.split('-').map(Number);
        let newRow = row;
        let newCol = col;

        switch(direction) {
            case 'up':
                newRow = (row === 1 ? 9 : row - 1);
                break;
            case 'down':
                newRow = (row === 9 ? 1 : row + 1);
                break;
            case 'left':
                newCol = (col === 1 ? 9 : col - 1);
                break;
            case 'right':
                newCol = (col === 9 ? 1 : col + 1);
                break
        }
        const newBoxId = `${newRow}-${newCol}`;
        set({ selectedBoxes: new Set([newBoxId]), lastSelectedBox: newBoxId });
    },

    setBoxValueForSelectedBoxes: (value) => {
        const selection = get().selectedBoxes;
        if (selection.size === 0) return;

        set((state) => {

            const updatedGrid = state.gridData.map((box) => {
                // If the box is selected and editable
                if (state.selectedBoxes.has(box.boxId) && !box.isFixedValue) {
                    return {
                        ...box,
                        value,
                        notes: [] // Clear notes.
                    };
                }

                return box;
            });

            // If a value was set, find affected boxes and remove notes
            if (value !== '') {
                // Get all affected (newly updated) boxes
                const updatedBoxes = state.gridData.filter(
                    (box) => state.selectedBoxes.has(box.boxId) && !box.isFixedValue
                );

                for (const sourceBox of updatedBoxes) {
                    const { row, column, boxGroup } = sourceBox;

                    for (let i = 0; i < updatedGrid.length; i++) {
                        const b = updatedGrid[i];

                        // Skip self or already filled boxes
                        if (state.selectedBoxes.has(b.boxId) || b.value !== '') continue;

                        const isInSameScope = b.row === row || b.column === column || b.boxGroup === boxGroup;

                        if (isInSameScope && b.notes.includes(value)) {
                            updatedGrid[i] = { ...b, notes: b.notes.filter((n) => n !== value)};
                        }
                    }
                }
            }

            return { gridData: updatedGrid };
        });
        get().computeCompletionMap();
    },

    computeCompletionMap: () => {
        const state = get();
        const counts: Record<number, IDigitCount> = {
            1: { count: 0, problem: false },
            2: { count: 0, problem: false },
            3: { count: 0, problem: false },
            4: { count: 0, problem: false },
            5: { count: 0, problem: false },
            6: { count: 0, problem: false },
            7: { count: 0, problem: false },
            8: { count: 0, problem: false },
            9: { count: 0, problem: false }
        };
        // Track digit appearances in rows, columns, and boxes
        const seen = {
            rows: new Map<number, Map<number, number>>(),
            columns: new Map<number, Map<number, number>>(),
            boxes: new Map<number, Map<number, number>>(),
        };

        for (const box of state.gridData) {
            const { row, column, boxGroup, value } = box;
            if (typeof value !== 'number') continue;

            counts[value].count ++;

            const track = (map: Map<number, Map<number, number>>, key: number, boxValue: number) => {
                if (!map.has(boxValue)) map.set(boxValue, new Map());
                const subMap = map.get(boxValue)!;
                subMap.set(key, (subMap.get(key) || 0) + 1);
            };
            track(seen.rows, row, value);
            track(seen.columns, column, value);
            track(seen.boxes, boxGroup, value);
        }
        // Check for conflicts
        for (let digit = 1; digit <= 9; digit++) {
            const rowConflicts = [...(seen.rows.get(digit)?.values() || [])].some(v => v > 1);
            const colConflicts = [...(seen.columns.get(digit)?.values() || [])].some(v => v > 1);
            const boxConflicts = [...(seen.boxes.get(digit)?.values() || [])].some(v => v > 1);
            if (rowConflicts || colConflicts || boxConflicts) {
                counts[digit].problem = true;
            }
        }
        const alreadyComplete = get().isComplete;
        const isComplete = !alreadyComplete
            && get().inputMode !== 'setup'
            && Object.values(counts).every(d => d.count === 9 && !d.problem);

        set({ digitCounts: counts, ...(isComplete ? { isComplete: true } : {}) });
    },

    setBoxNoteForSelectedBoxes: (newNote) => {
        set(state => ({
            gridData: state.gridData.map(box => {
                if (!state.selectedBoxes.has(box.boxId) || box.value !== '' || box.isFixedValue) {
                    return box;
                }
                const hasNote = box.notes.includes(newNote);
                const newBox = { ...box, notes: (hasNote ? box.notes.filter(n => n !== newNote) : [...box.notes, newNote].sort())}
                return  newBox;
            })
        }))
    },

    loadPuzzle: (puzzle) => {
        const freshGrid = INITIAL_SUDOKU_GRID.map(box => {
            const clue = puzzle.clues.find(c => c.boxId === box.boxId);
            return clue ? { ...box, value: clue.value, isFixedValue: true } : { ...box };
        });
        set({
            gridData: freshGrid,
            selectedBoxes: new Set(),
            lastSelectedBox: undefined,
            inputMode: 'solve',
            digitCounts: INITIAL_DIGIT_COUNTS,
            selectedPuzzleId: puzzle.id,
            isComplete: false,
            startedAt: Date.now(),
        });
        get().computeCompletionMap();
    },

    setBackgroundColorForSelectedBoxes: (color) => {
        const selection = get().selectedBoxes;
        if (selection.size === 0) return;

        set((state) => {
            return {
                gridData: state.gridData.map(box => state.selectedBoxes.has(box.boxId) ? {...box, backgroundColor: color} : box)
            };
        })
    }

}));

