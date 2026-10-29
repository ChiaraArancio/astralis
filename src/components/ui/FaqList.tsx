import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface FaqItemData {
  question: string;
  answer: ReactNode;
}

export function FaqList({ items, className }: { items: FaqItemData[]; className?: string }) {
  return (
    <div className={cn('divide-y divide-primary/10 border-y border-primary/10', className)}>
      {items.map((item, index) => (
        <details key={`${item.question}-${index}`} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left transition-colors hover:text-secondary [&::-webkit-details-marker]:hidden">
            <span className="text-[0.95rem] font-medium leading-relaxed text-primary">
              {item.question}
            </span>
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-outline-variant text-secondary transition-transform group-open:rotate-45">
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </summary>
          <div className="max-w-3xl pb-6 pr-8 text-body text-on-surface-variant">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
