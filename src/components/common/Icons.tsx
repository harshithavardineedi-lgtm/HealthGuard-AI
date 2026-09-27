import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const MedicineIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M10.5 20.5l-7-7a5 5 0 017.07-7.07l7 7a5 5 0 01-7.07 7.07z" />
    <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
    <circle cx="15.5" cy="8.5" r="1.5" fill="var(--accent-secondary)" stroke="none" />
  </svg>
);

export const WaterIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M12 2.5s-6 7.5-6 12a6 6 0 0012 0c0-4.5-6-12-6-12z" />
    <path d="M12 11.5a3 3 0 00-3 3" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="15" r="1.5" fill="var(--accent-primary)" stroke="none" />
  </svg>
);

export const SOSIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M12 2.5L2.5 7.5v6c0 5.5 4 10 9.5 11.5 5.5-1.5 9.5-6 9.5-11.5v-6L12 2.5z" />
    <path d="M12 8v5" stroke="var(--status-danger)" strokeWidth="2" />
    <circle cx="12" cy="16" r="1.25" fill="var(--status-danger)" stroke="none" />
  </svg>
);

export const LocationIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
    <circle cx="12" cy="10" r="3" fill="var(--accent-secondary)" stroke="none" />
  </svg>
);

export const VoiceIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 10a7 7 0 0014 0" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <circle cx="18" cy="6" r="1.5" fill="var(--accent-secondary)" stroke="none" />
  </svg>
);

export const CaregiverIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 11l1.5 1.5L23 10" stroke="var(--accent-primary)" strokeWidth="2" />
    <circle cx="20.5" cy="6.5" r="1.25" fill="var(--accent-secondary)" stroke="none" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="12" cy="15" r="1.5" fill="var(--accent-secondary)" stroke="none" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 000-7.78z" />
    <circle cx="12" cy="12" r="1.5" fill="var(--status-danger)" stroke="none" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
    <circle cx="18" cy="5" r="2" fill="var(--accent-secondary)" stroke="none" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="12" r="3" fill="var(--accent-primary)" stroke="none" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    <circle cx="18" cy="6" r="1.5" fill="var(--accent-secondary)" stroke="none" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polyline points="20 6 9 17 4 12" />
    <circle cx="20" cy="6" r="1.5" fill="var(--status-safe)" stroke="none" />
  </svg>
);

// Status Icons with shape distinction for accessibility (Rule 3.3)
export const SafeStatusIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
    <circle cx="12" cy="12" r="10" fill="var(--status-safe)" />
    <path d="M8 12l3 3 5-5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const WarnStatusIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
    <path d="M12 2L2 22h20L12 2z" fill="var(--status-warn)" />
    <path d="M12 9v5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <circle cx="12" cy="17" r="1.2" fill="#FFFFFF" />
  </svg>
);

export const DangerStatusIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
    <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z" fill="var(--status-danger)" />
    <path d="M15 9l-6 6M9 9l6 6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </svg>
);

// Sun/Moon theme morphing toggle icon
export const SunMoonIcon: React.FC<IconProps & { isDark?: boolean }> = ({ size = 24, isDark = false, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isDark ? 'rotate-180' : 'rotate-0'} ${className}`} {...props}>
    {isDark ? (
      <>
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="var(--accent-primary)" />
        <circle cx="17" cy="7" r="1" fill="var(--accent-secondary)" stroke="none" />
      </>
    ) : (
      <>
        <circle cx="12" cy="12" r="5" fill="var(--accent-secondary)" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="var(--ink-primary)" strokeWidth="1.5" />
      </>
    )}
  </svg>
);
