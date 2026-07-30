interface RobotIconProps {
  mood: "happy" | "sad" | "neutral";
  className?: string;
}

export function RobotIcon({ mood, className = "" }: RobotIconProps) {
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
      {/* Antenna */}
      <line x1="24" y1="12" x2="24" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <circle cx="24" cy="4" r="3" fill="var(--accent-primary)" stroke="currentColor" strokeWidth="2.5" />
      
      {/* Head (Square, Brutalist) */}
      <rect x="8" y="12" width="32" height="28" rx="2" fill="var(--surface-primary)" stroke="currentColor" strokeWidth="2.5" />
      
      {/* Ears */}
      <rect x="4" y="22" width="4" height="8" fill="var(--surface-secondary)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" />
      <rect x="40" y="22" width="4" height="8" fill="var(--surface-secondary)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" />
      
      {/* Eyes */}
      {mood === 'happy' && (
        <>
          <path d="M14 23 Q17 19 20 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" fill="none"/>
          <path d="M28 23 Q31 19 34 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" fill="none"/>
        </>
      )}
      {mood === 'sad' && (
        <>
          <rect x="15" y="21" width="4" height="4" fill="currentColor"/>
          <rect x="29" y="21" width="4" height="4" fill="currentColor"/>
          {/* Angry/Sad eyebrows */}
          <path d="M13 18 L20 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
          <path d="M35 18 L28 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
        </>
      )}
      {mood === 'neutral' && (
        <>
          <rect x="15" y="21" width="4" height="4" fill="currentColor"/>
          <rect x="29" y="21" width="4" height="4" fill="currentColor"/>
        </>
      )}

      {/* Mouth */}
      {mood === 'happy' && (
        <path d="M16 30 Q24 36 32 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" fill="none"/>
      )}
      {mood === 'sad' && (
        <path d="M18 33 Q24 29 30 33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" fill="none"/>
      )}
      {mood === 'neutral' && (
        <line x1="18" y1="32" x2="30" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
      )}
    </svg>
  );
}
