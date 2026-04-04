// Imports.
import React, { useState, useEffect } from 'react';
import { useSudokuStore }             from '@store/sudoku-store';
import { formatTimer }                from '@utils/time-helper';

const TimerComponent: React.FC = () => {

    const startedAt   = useSudokuStore(s => s.startedAt);
    const completedAt = useSudokuStore(s => s.completedAt);
    const isPaused    = useSudokuStore(s => s.isPaused);
    const inputMode   = useSudokuStore(s => s.inputMode);
    const togglePause = useSudokuStore(s => s.togglePause);

    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if (!startedAt || completedAt || isPaused || inputMode === 'setup') return;
        const interval = setInterval(() => setElapsed(Date.now() - startedAt), 1000);
        return () => clearInterval(interval);
    }, [startedAt, completedAt, isPaused, inputMode]);

    if (!startedAt || inputMode === 'setup') return null;

    return (
        <div className="flex items-center gap-1 bg-black/50 text-white rounded-full px-3 py-1">
            <span className="font-mono font-semibold text-sm tabular-nums">
                {formatTimer(elapsed)}
            </span>
            <button
                onClick={togglePause}
                className="text-white/80 hover:text-white text-xs leading-none pl-1">
                {isPaused ? '▶' : '⏸'}
            </button>
        </div>
    );
}

export default TimerComponent;
