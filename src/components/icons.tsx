const paths = {
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  external: <path d="M8 6h10v10M18 6L6 18" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
