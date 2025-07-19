export function Background() {
  return (
    <div
      className="fixed inset-0 -z-20 h-full w-full bg-[hsl(var(--background))]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_25%,rgba(255,140,0,0.35),rgba(255,255,255,0))]"></div>
    </div>
  );
}
