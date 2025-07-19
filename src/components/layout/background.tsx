export function Background() {
  return (
    <div
      className="fixed inset-0 -z-20 h-full w-full bg-[#14171f]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-black/50 to-black"></div>
      
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.15)_0%,transparent_70%)] opacity-70 blur-3xl transform -translate-x-1/4 -translate-y-1/4"></div>

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1)_0%,transparent_70%)] opacity-60 blur-3xl transform translate-x-1/3 translate-y-1/3"></div>

    </div>
  );
}
