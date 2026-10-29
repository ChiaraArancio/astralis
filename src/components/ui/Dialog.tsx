import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

export function Dialog({
  open,
  onClose,
  title,
  eyebrow,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      className={cn(
        'max-h-[88vh] w-[min(92vw,38rem)] overflow-y-auto rounded-2xl border border-gold/70 bg-surface p-0 text-on-surface shadow-ethereal-lg backdrop:bg-primary/45 backdrop:backdrop-blur-[2px]',
        className,
      )}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          aria-label="Fermer la fenêtre"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        {eyebrow ? <p className="eyebrow mb-2 pr-8 text-secondary">{eyebrow}</p> : null}
        <h2 id="dialog-title" className="pr-8 text-h3 text-primary">
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </div>
    </dialog>
  );
}
