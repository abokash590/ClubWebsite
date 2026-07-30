interface ClubIconProps {
  className?: string;
}

export function ClubIcon({ className = "" }: ClubIconProps) {
  return (
    <svg 
      className={className}
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "var(--text-primary)" }}
    >
      {/* Monitor Frame */}
      <rect x="4" y="6" width="40" height="28" rx="2" fill="var(--surface-primary)" stroke="currentColor" strokeWidth="2.5" />
      
      {/* Monitor Screen */}
      <rect x="8" y="10" width="32" height="20" fill="var(--surface-inverse)" stroke="currentColor" strokeWidth="2" />
      
      {/* Code Prompt >_ */}
      <path d="M12 14 L16 18 L12 22" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
      <line x1="18" y1="22" x2="24" y2="22" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="square" />
      
      {/* Monitor Stand */}
      <path d="M20 34 L16 42 L32 42 L28 34" fill="var(--surface-secondary)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" />
      
      {/* Desk Base */}
      <line x1="6" y1="42" x2="42" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  );
}
