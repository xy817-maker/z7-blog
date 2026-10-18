export function QuoteBanner({ text }: { text: string }) {
  return (
    <div className="relative mx-auto mb-12 max-w-4xl select-none text-center">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--muted)]/50" />
        <p className="font-display text-lg font-medium italic tracking-wide text-[var(--muted)] sm:text-xl">
          &ldquo;{text}&rdquo;
        </p>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--muted)]/50" />
      </div>
    </div>
  );
}
