// Imports.
import Button                   from "@components/button-component";
import type React               from "react";
import ConfirmDialog            from "@components/confirmation-dialogue-component";
import useBooleanHook           from "@hooks/useBooleanHook";
import { modes }                from "@utils/control/control-constants";
import { useSudokuStore }       from "@store/sudoku-store";
import type { IInputMode }      from "@models/sudoku-grid-models";
import { header2ClassName }     from "@styles/constants";
import { capitalizeAndTrim }    from "@utils/control/control-helper";

const InputModeComponent: React.FC = () => {

    //Store Variables
    const inputMode = useSudokuStore(s => s.inputMode);

    // Store Actions.
    const setInputMode = useSudokuStore(s => s.setInputMode);

    // State.
    const [showConfirm, setShowConfirm] = useBooleanHook();

    // Event Handlers.
    const onInpurModeChange = (newMode: IInputMode) => {
        if(newMode === "setup") {
            setShowConfirm();
        } else {
            setInputMode(newMode);
        }
    }

    const confirmResetToSetup = () => {
        // Asume that the new mode is 'setup'.
        setInputMode('setup');
        setShowConfirm();
    }

    return(
        <>
            <h2 className={header2ClassName}>Input Mode</h2>
            <div className="flex gap-2">
                {modes.map(mode => (
                    <Button key={mode}
                            variant={inputMode === mode ? "primary":"default"}
                            disabled={inputMode === mode}
                            onClick={() => onInpurModeChange(mode)} >
                        {capitalizeAndTrim(mode)}
                    </Button>
                ))}
            </div>
            { showConfirm && (
                <ConfirmDialog title="Switch to Setup Mode?"
                                message="This will clear all current values and pencil marks. Are you sure you want to reset the board?"
                                onConfirm={confirmResetToSetup} 
                                onCancel={() => { setShowConfirm(false); }} />
            )}
        </>
    );
}

export default InputModeComponent;
