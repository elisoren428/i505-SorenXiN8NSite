
import { getWorkflows } from '@/lib/github';
import { WorkflowsClient } from '@/components/workflows-client';

export const revalidate = 3600; // Revalidate the page every hour

export default async function WorkflowsPage() {
  const workflows = await getWorkflows();

  return (
    <div className="space-y-8">
      <div className="text-center rounded-lg overflow-hidden relative h-64 flex items-center justify-center">
        {/* Video Background */}
        <video 
          src="https://streamable.com/video/mp4/5dsmo8.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        >
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Text Content */}
        <div className="relative z-10 text-white">
          <h1 
            className="font-sans text-5xl font-bold tracking-tight sm:text-7xl"
            style={{
              color: '#804A65', // A base color from your screenshot's theme
              textShadow: '0 0 2px #F67717, 0 0 2px #F67717, 0 0 2px #F67717, 0 0 2px #F67717, 0 0 2px #F67717, 0 0 3px #F67717, 0 0 4px #F67717, 0 0 5px #F67717, 0 0 6px #F67717, 0 0 8px #F67717',
            }}
            >
            Workflow Directory
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Explore our collection of n8n workflows. Search, filter, and find the perfect automation.
          </p>
        </div>
      </div>
      <WorkflowsClient allWorkflows={workflows} />
    </div>
  );
}
