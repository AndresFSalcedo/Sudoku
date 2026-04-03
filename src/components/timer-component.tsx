// Imports.
import React, { useState, useEffect } from 'react';
import { useSudokuStore }             from '@store/sudoku-store';

const formatDuration = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes      = Math.floor(totalSeconds / 60);
    const seconds      = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const TimerComponent: React.FC = () => {

    const startedAt  = useSudokuStore(s => s.startedAt);
    const isComplete = useSudokuStore(s => s.isComplete);
    const inputMode  = useSudokuStore(s => s.inputMode);

    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if (!startedAt || isComplete || inputMode === 'setup') return;

        setElapsed(Date.now() - startedAt);

        const interval = setInterval(() => {
            setElapsed(Date.now() - startedAt);
        }, 1000);

        return () => clearInterval(interval);
    }, [startedAt, isComplete, inputMode]);

    if (!startedAt || inputMode === 'setup') return null;

    return (
        <div className="flex items-center justify-center gap-1 text-gray-600">
            <span className="text-sm">⏱</span>
            <span className="font-mono font-semibold text-sm tabular-nums">
                {formatDuration(elapsed)}
            </span>
        </div>
    );
}

export default TimerComponent;
