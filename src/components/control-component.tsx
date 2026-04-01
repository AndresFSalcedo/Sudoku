// Imports.
import type React               from 'react';
import ProgressComponent        from './progress-component';
import InputModeComponent       from './input-mode-component';
import PuzzleSelectorComponent  from './puzzle-selector-component';
import BackgroundColorComponent from './background-color-component';
import ClearGridComponent       from './clear-grid-component';

const Control: React.FC = () => {
    return(
        <div className="bg-white shadow rounded-md p-4 w-full lg:max-w-[300px]">
            <div className="flex flex-col gap-6">
                <PuzzleSelectorComponent />
                <InputModeComponent />
                <BackgroundColorComponent />
                <ProgressComponent />
                <div className="flex items-center justify-center">
                    <ClearGridComponent />
                </div>
            </div>
        </div>
    )
}

export default Control;
