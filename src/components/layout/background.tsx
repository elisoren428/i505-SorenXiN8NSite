export function Background() {
  return (
    <div
      className="fixed inset-0 -z-20 h-full w-full bg-[hsl(var(--background))]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#2b0f0a] via-[hsl(var(--background))] to-[hsl(var(--background))]"></div>
    </div>
  );
}
