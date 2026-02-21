interface FeatureCardProps {
  title: string;
  description: string;
  iconId: "preview" | "inspect" | "export";
}

function FeatureIcon({ id }: { id: FeatureCardProps["iconId"] }) {
  const cls = "text-rive-accent";
  switch (id) {
    case "preview":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={cls}>
          <path d="M5 4.99a.5.5 0 01.77-.42l14.5 8.01a.5.5 0 010 .86l-14.5 8.01a.5.5 0 01-.77-.42V4.99z" fill="currentColor" opacity="0.2" />
          <path d="M6 4.5l13 7.5-13 7.5V4.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "inspect":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={cls}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.2" fill="currentColor" />
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "export":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={cls}>
          <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.2" fill="currentColor" />
          <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 3H8l-2 4h12l-2-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 11v6m0 0l-2.5-2.5M12 17l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function FeatureCard({ title, description, iconId }: FeatureCardProps) {
  return (
    <div className="group relative rounded-2xl border border-rive-border bg-rive-surface p-6 transition-all duration-300 hover:border-rive-border-hover hover:bg-rive-surface-hover">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-rive-accent-glow to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-rive-border bg-rive-bg">
          <FeatureIcon id={iconId} />
        </div>
        <h3 className="mb-2 text-base font-semibold text-rive-text">{title}</h3>
        <p className="text-sm leading-relaxed text-rive-text-secondary">{description}</p>
      </div>
    </div>
  );
}
