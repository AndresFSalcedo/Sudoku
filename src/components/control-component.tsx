// Imports.
import Button                   from "@components/button-component";
import type React               from "react";
import ProgressComponent        from "./progress-component";
import InputModeComponent       from "./input-mode-component";
import BackgroundColorComponent from "./background-color-component";
import { useSudokuStore }       from "@store/sudoku-store";

const Control: React.FC = () => {

    const clearGrid = useSudokuStore(s => s.clearGridData);
    
    return(
        <div className="bg-white shadow rounded-md p-4 space-y-6 w-full max-w-[300px]">
            <div className="flex flex-col gap-4">
                <div className="space-y-6 w-full">
                    <InputModeComponent />
                </div>
                <div className="space-y-6 w-full">
                    <BackgroundColorComponent />
                </div>
                <div className="space-y-6 w-full">
                    <ProgressComponent />
                </div>
                <div className="space-y-6 w-full flex items-center justify-center">
                    <Button variant="danger" onClick={clearGrid}>Clear Grid</Button>
                </div>
            </div>
        </div>
    )
}

export default Control;
