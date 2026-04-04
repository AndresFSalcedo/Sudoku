// Imports.
import React,
{ useState, useEffect, useRef } from 'react';
import type { IDropdownOption } from '@models/dropdown-models';

interface IDropdownProps {
    options: IDropdownOption[];
    selectedId: string;
    placeholder?: string;
    onChange: (id: string) => void;
}

const DropdownComponent: React.FC<IDropdownProps> = ({
    options,
    selectedId,
    placeholder = 'Select...',
    onChange,
}) => {

    const [isOpen, setIsOpen]   = useState(false);
    const containerRef          = useRef<HTMLDivElement>(null);

    // Close when clicking outside.
    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    const selectedLabel = options.find(o => o.id === selectedId)?.label ?? placeholder;

    const onSelect = (id: string) => {
        onChange(id);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative w-full">
            <button
                onClick={() => setIsOpen(o => !o)}
                className="w-full flex items-center justify-between text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 text-left">
                <span className={selectedId ? 'text-gray-900' : 'text-gray-400'}>
                    {selectedLabel}
                </span>
                <span className="text-gray-400 text-[10px] ml-1">▼</span>
            </button>
            {isOpen && (
                <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded shadow-md max-h-48 overflow-y-auto">
                    {options.map(o => (
                        <li
                            key={o.id}
                            onClick={() => onSelect(o.id)}
                            className={`px-2 py-1 text-sm cursor-pointer hover:bg-blue-50 ${o.id === selectedId ? 'text-blue-600 font-medium' : 'text-gray-900'}`}>
                            {o.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropdownComponent;
