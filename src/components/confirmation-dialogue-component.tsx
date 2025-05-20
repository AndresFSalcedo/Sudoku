// Imports.
import React from "react";
import Button from './button-component';
import { header2ClassName } from "@styles/constants";

interface ConfirmDialogProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    title,
    message,
    onConfirm,
    onCancel
}) => {
    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h2 className={header2ClassName}>{title}</h2>
                <p className="text-sm text-gray-700 mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <Button onClick={onCancel}> Cancel </Button>
                    <Button variant="danger" onClick={onConfirm}>Confirm</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
