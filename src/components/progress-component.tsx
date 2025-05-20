// Imports.
import React from 'react';
import { useSudokuStore } from '@store/sudoku-store';
import { getOverallProgress, getProgressColor } from '@utils/control/control-constants';
import { header2ClassName } from '@styles/constants';

const getBadge = (count: number, problem: boolean) => {

    if(count < 9 && !problem) return null;

    const classNameString = `w-5 h-5 ${problem || count > 9 ? 'bg-red-600' : 'bg-green-500'} text-white text-[11px] rounded-full flex items-center justify-center shadow`;

    return <div className={classNameString}>{problem || count > 9 ? '✗' : '✓'}</div>

};

const ProgressComponent: React.FC = () => {
    const digitCounts = useSudokuStore((s) => s.digitCounts);
    const totalFilled = Object.values(digitCounts).reduce((acc, {count}) => acc + count, 0);
    const overallPercent = totalFilled / 81;
    const percentLabel = `${Math.round(overallPercent * 100)}%`;
    const hasAnyProblem  = Object.values(digitCounts).some(d => d.problem);

    return (
        <>
            <h2 className={header2ClassName}>Progress</h2>
            <div className="grid grid-rows-9 gap-2 text-xs w-full">
                {Object.entries(digitCounts).map(([digit, {count, problem}]) => {
                    const progressColor = getProgressColor(count, problem);
                    const badge = getBadge(count, problem);

                    return (
                        <div key={digit} className="relative flex items-center gap-2 w-full">
                            <span className="text-sm font-semibold w-4 text-right">{digit}</span>
                            <div className="relative flex-1 h-4 bg-gray-200 rounded overflow-hidden">
                            <div
                                className={`h-full ${progressColor} transition-all duration-200`}
                                style={{ width: `${Math.min(count / 9, 1) * 100}%` }}
                            />
                            </div>
                            {badge}
                        </div>
                    );
                })}
                {/* Overall progress */}
                <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Overall</h3>
                    <div className="relative h-5 bg-gray-200 rounded overflow-hidden">
                    <div
                        className={`h-full ${getOverallProgress(overallPercent, hasAnyProblem )} transition-all duration-200 flex items-center justify-center text-[12px] text-white font-medium`}
                        style={{ width: `${overallPercent * 100}%` }}
                    >
                        {hasAnyProblem ? 'Error' : percentLabel}
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProgressComponent;
