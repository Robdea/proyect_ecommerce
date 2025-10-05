import { forwardRef, useImperativeHandle, useRef } from "react";

export interface ModalGenericRef {
  open: () => void;
  close: () => void;
}

interface ModalGenericProps {
  children?: React.ReactNode;
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

    return (
      <dialog 
      className="w-full h-screen bg-transparent flex justify-center items-center"
      ref={modalRef}>
        {children}
        <button onClick={closeModal}>Cerrar</button>
      </dialog>
    );
  }
);

export default ModalGeneric;
