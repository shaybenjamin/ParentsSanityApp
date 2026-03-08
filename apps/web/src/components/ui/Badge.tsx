import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'sage' | 'warm' | 'sand' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-600',
  sage: 'bg-sage-100 text-sage-700',
  warm: 'bg-warm-100 text-warm-700',
  sand: 'bg-sand-100 text-sand-700',
  outline: 'border border-gray-200 text-gray-600 bg-transparent',
};

export function Badge({ children, variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
