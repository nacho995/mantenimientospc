import type React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: 'primary' | 'secondary' | 'outline';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly children: ReactNode;
}

const VARIANT_STYLES: Record<string, string> = {
  primary: 'btn btn--primary',
  secondary: 'btn btn--secondary',
  outline: 'btn btn--outline',
};

const SIZE_STYLES: Record<string, string> = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps): React.JSX.Element {
  const variantClass = VARIANT_STYLES[variant] ?? VARIANT_STYLES['primary'];
  const sizeClass = SIZE_STYLES[size] ?? SIZE_STYLES['md'];

  return (
    <button className={`${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
