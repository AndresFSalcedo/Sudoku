// Imports.
import { useState } from 'react';

/**
 * Custom hook to manage boolean values.
 * @param defaultValue  The initial boolean value when using the hook.
 * @returns             An array containing the current boolean value and a function to toggle or set it.
 */
export default function useBooleanHook(defaultValue: boolean = false): [boolean, (value?: boolean) => void] {
    const [value, setValue] = useState(defaultValue);

    async function changeBoolean(funcValue?: boolean) {
        await setValue(currentValue =>
            (typeof funcValue === 'boolean') ? funcValue : !currentValue);
    }

    return [value, changeBoolean];
}
