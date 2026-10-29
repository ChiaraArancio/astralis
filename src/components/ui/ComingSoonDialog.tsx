import { useState, type ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { Dialog } from './Dialog';
import { NewsletterForm } from '../NewsletterForm';

export function ComingSoonDialog({
  trigger,
  title = 'Bientôt disponible',
  eyebrow = 'Astralis — à venir',
  description,
  children,
}: {
  trigger: (open: () => void) => ReactNode;
  title?: string;
  eyebrow?: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {trigger(() => setOpen(true))}
      <Dialog open={open} onClose={() => setOpen(false)} title={title} eyebrow={eyebrow}>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-lg border border-gold/70 bg-surface-container-low p-4">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
            <p className="text-body text-on-surface-variant">
              {description ??
                "Cette fonctionnalité n’est pas encore ouverte. Aucun paiement n’est possible pour le moment et aucun contenu payant n’est simulé."}
            </p>
          </div>
          {children}
          <div>
            <p className="mb-2 text-[0.8rem] font-medium text-primary">
              Recevoir une annonce à l’ouverture
            </p>
            <NewsletterForm />
          </div>
        </div>
      </Dialog>
    </>
  );
}
