'use client';

interface QuickActionCardProps {
  icon: string;
  label: string;
  description?: string;
  onClick: () => void;
  color?: 'sage' | 'warm' | 'sand';
}

const colors = {
  sage: 'bg-sage-50 border-sage-200 hover:bg-sage-100 text-sage-700',
  warm: 'bg-warm-50 border-warm-200 hover:bg-warm-100 text-warm-700',
  sand: 'bg-sand-50 border-sand-200 hover:bg-sand-100 text-sand-700',
};

export function QuickActionCard({
  icon,
  label,
  description,
  onClick,
  color = 'sage',
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border transition-colors text-center tap-target w-full ${colors[color]}`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-semibold leading-tight">{label}</span>
      {description && (
        <span className="text-[10px] opacity-70 leading-tight">{description}</span>
      )}
    </button>
  );
}
