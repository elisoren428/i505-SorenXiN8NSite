export function Background() {
  return (
    <div
      className="fixed inset-0 -z-20 h-full w-full bg-[hsl(var(--background))]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,140,0,0.15),rgba(255,255,255,0))]"></div>
    </div>
  );
}
