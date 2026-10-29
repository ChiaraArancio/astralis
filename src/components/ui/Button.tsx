import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'lavender' | 'outline-light';
export type ButtonSize = 'sm' | 'md' | 'lg';

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  full = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
} = {}): string {
  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary-container text-surface hover:bg-secondary shadow-[0_8px_20px_-10px_rgba(48,39,32,0.45)] disabled:bg-outline-variant disabled:text-outline',
    secondary:
      'border border-secondary/35 bg-transparent text-primary hover:bg-gold/25 hover:border-secondary/60 disabled:border-outline-variant disabled:text-outline',
    ghost: 'bg-transparent text-primary hover:bg-surface-container disabled:text-outline',
    lavender:
      'bg-lavender text-primary hover:bg-tertiary-fixed-dim shadow-[0_8px_20px_-10px_rgba(48,39,32,0.3)] disabled:bg-outline-variant',
    'outline-light':
      'border border-surface/30 bg-transparent text-surface hover:bg-surface/10 disabled:border-surface/20 disabled:text-surface/40',
  };
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3.5 py-2 text-[0.72rem] tracking-[0.04em]',
    md: 'px-5 py-3 text-[0.78rem] tracking-[0.035em]',
    lg: 'px-6 py-3.5 text-[0.82rem] tracking-[0.03em]',
  };
  return cn(
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg font-semibold uppercase leading-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    full && 'w-full',
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, full, className })} {...props}>
      {children}
    </button>
  );
}
