"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextProps {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  openSheet: (content: ReactNode) => void;
  closeSheet: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState<ReactNode>(null);

  const openModal = (content: ReactNode) => {
    setIsOpenModal(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalContent(null);
  };
  const openSheet = (content: ReactNode) => {
    setIsSheetOpen(true);
    setSheetContent(content);
  };
  const closeSheet = () => {
    setIsSheetOpen(false);
    setSheetContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, openSheet, closeSheet }}
    >
      {children}
      <Dialog
        open={isOpenModal}
        onOpenChange={(open) => {
          if (!open) closeModal();
          else setIsOpenModal(true);
        }}
      >
        <DialogContent className="bg-white text-black rounded-lg shadow-lg">
          <DialogTitle className="sr-only">Modal</DialogTitle>
          <div className="mt-4">{modalContent}</div>
        </DialogContent>
      </Dialog>
      <Sheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          if (!open) closeSheet();
          else setIsSheetOpen(true);
        }}
      >
        <SheetContent>
          <SheetTitle className="sr-only">Sheet</SheetTitle>
          <div className="mt-4">{sheetContent}</div>
        </SheetContent>
      </Sheet>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within the ModalProvider");
  }
  return context;
};
