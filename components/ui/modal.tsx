"use client"

import { Dialog } from "./dialog"

interface IModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}


export const Modal: React.FC<IModalProps> = ({ 
    title, description, isOpen, onClose, children 
}) => {

    const onChange = (open: boolean) => {
        if(!open) onClose()
    }

    return (
        <Dialog>
            
        </Dialog>
    )
}