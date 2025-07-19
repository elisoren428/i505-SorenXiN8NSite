export function Background() {
  return (
    <div
      className="fixed inset-0 -z-20 h-full w-full bg-[#14171f]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-black/50 to-black"></div>
      
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.25)_0%,transparent_60%)] opacity-80 blur-3xl transform -translate-x-[40%] -translate-y-1/2"></div>

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1)_0%,transparent_70%)] opacity-60 blur-3xl transform translate-x-1/3 translate-y-1/3"></div>

    </div>
  );
}
