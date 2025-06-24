import React, { useEffect, useRef } from "react";

const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Внимание",
  message = "Наистина ли искаш да излезеш?",
  confirmText = "Изход",
  cancelText = "Назад",
}) => {
  const cancelRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      cancelRef.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onCancel();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="modal-title" className="text-xl font-semibold mb-2">
          {title}
        </h3>
        <p id="modal-description" className="mb-6 text-gray-600">
          {message}
        </p>

        <div className="flex justify-end space-x-3">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
