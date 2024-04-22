import { create } from "zustand"

interface IuseStoreModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}


export const useStoreModal = create<IuseStoreModalStore>(( set ) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))