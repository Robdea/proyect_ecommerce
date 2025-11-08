import { forwardRef, useImperativeHandle, useRef } from "react";

export interface ModalGenericRef {
  open: () => void;
  close: () => void;
}

interface ModalGenericProps {
  children?: React.ReactNode;
  className?: string;
}

const ModalGeneric = forwardRef<ModalGenericRef, ModalGenericProps>(
  ({ children }, ref) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    function openModal() {
      modalRef.current?.showModal();
    }

    function closeModal() {
      modalRef.current?.close();
    }

    useImperativeHandle(ref, () => ({
      open: openModal,
      close: closeModal,
    }));

  
    const handleBackdropClick = () => {
      const dialog = modalRef.current;
      if (dialog) {
        closeModal();
      }
    };

    return (
      <dialog 
      className={`w-full h-screen bg-transparent`}
      ref={modalRef}>
        <div 
        onClick={handleBackdropClick}
        className="w-full h-full justify-center items-center flex">
            {children}
        </div>
      </dialog>
    );
  }
);

export default ModalGeneric;
