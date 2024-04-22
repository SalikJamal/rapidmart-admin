"use client"

import { Modal } from "@/components/ui/modal"


export default function SetupPage() {
    return (
        <div className="p-4">
            <Modal
                title="Title"
                description="Test Description" 
                isOpen={true}
                onClose={() => {}}
            >
                Children
            </Modal>
        </div>
    )
}