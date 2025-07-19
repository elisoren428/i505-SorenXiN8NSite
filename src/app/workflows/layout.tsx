export default function WorkflowsLayout({
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
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_15%,rgba(168,85,247,0.3),rgba(255,255,255,0))]"></div>
      </div>
      {children}
    </div>
  );
}
