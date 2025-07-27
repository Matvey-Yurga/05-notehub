
import ReactDOM from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';
interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}
export default function Modal({ onClose, children }: ModalProps) {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
         document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = "";
        };
    }
        , [onClose]);  
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) {
            onClose();
        }   
    }

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      role="dialog"
          aria-modal="true"
          onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
      </div>
      </div>,
      document.body
  );
}