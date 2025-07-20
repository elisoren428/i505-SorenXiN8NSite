export default function FreeApisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="fixed inset-0 -z-10 h-full w-full bg-[hsl(var(--background))]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_85%,rgba(255,255,255,0)_40%,rgba(59,130,246,0.3))]"></div>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
      </div>
      {children}
    </div>
  );
}
