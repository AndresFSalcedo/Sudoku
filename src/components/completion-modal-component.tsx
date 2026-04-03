// Imports.
import type React         from 'react';
import Button             from '@components/button-component';
import { useSudokuStore } from '@store/sudoku-store';

const formatDuration = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes      = Math.floor(totalSeconds / 60);
    const seconds      = totalSeconds % 60;
    return minutes > 0
        ? `${minutes}m ${seconds.toString().padStart(2, '0')}s`
        : `${seconds}s`;
};

const CompletionModalComponent: React.FC = () => {

    const isComplete      = useSudokuStore(s => s.isComplete);
    const startedAt       = useSudokuStore(s => s.startedAt);
    const selectedPuzzleId = useSudokuStore(s => s.selectedPuzzleId);
    const dismiss         = useSudokuStore(s => s.dismissCompletion);
    const clearGrid       = useSudokuStore(s => s.clearGridData);

    if (!isComplete) return null;

    const duration = startedAt ? formatDuration(Date.now() - startedAt) : null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center gap-4 text-center">
                <div className="text-5xl">🎉</div>
                <h2 className="text-2xl font-bold text-gray-800">Puzzle Complete!</h2>
                {duration && (
                    <p className="text-gray-500 text-sm">
                        You solved <span className="font-semibold text-gray-700">No. {selectedPuzzleId}</span> in{' '}
                        <span className="font-bold text-green-600 text-lg">{duration}</span>
                    </p>
                )}
                {/* Leaderboard placeholder — will be populated once backend is ready */}
                <div className="w-full bg-gray-50 rounded-lg p-4 text-sm text-gray-400 italic">
                    Leaderboard coming soon
                </div>
                <div className="flex gap-3 w-full">
                    <Button fullWidth onClick={dismiss}>Keep Board</Button>
                    <Button fullWidth variant="primary" onClick={clearGrid}>New Puzzle</Button>
                </div>
            </div>
        </div>
    );
}

export default CompletionModalComponent;
