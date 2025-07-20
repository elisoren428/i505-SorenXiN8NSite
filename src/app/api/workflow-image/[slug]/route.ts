
import { generateWorkflowImage } from '@/ai/flows/generate-workflow-image';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 604800; // 7 days

// A curated list of high-quality, relevant fallback images
const fallbackImages = [
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg', // Abstract AI/Tech
    'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg', // Abstract network
    'https://images.pexels.com/photos/6153743/pexels-photo-6153743.jpeg', // Abstract data flow
    'https://cdn.pixabay.com/photo/2019/12/10/00/56/international-4684747_960_720.jpg', // Global connections
    'https://cdn.pixabay.com/photo/2014/11/25/16/32/drop-545377_1280.jpg', // Abstract liquid/data
];

/**
 * Fetches a random fallback image and returns it as a NextResponse.
 * This is designed to be a reliable final resort.
 */
async function getErrorFallbackImageResponse(): Promise<NextResponse> {
    const fallbackUrl = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    try {
        const fallbackResponse = await fetch(fallbackUrl, { next: { revalidate: 3600 }}); // Cache the external image for an hour
        
        if (!fallbackResponse.ok) {
           // If the random image fails, use a super-safe, generic placeholder as the ultimate fallback.
           const ultimateFallbackUrl = `https://placehold.co/300x160/222222/FF8C00.png?text=SorenXI`;
           const ultimateFallbackResponse = await fetch(ultimateFallbackUrl);
            return new NextResponse(ultimateFallbackResponse.body, {
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'public, max-age=3600, must-revalidate',
                },
            });
        }
        
        const contentType = fallbackResponse.headers.get('content-type') || 'image/jpeg';
        
        return new NextResponse(fallbackResponse.body, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600, must-revalidate', // Cache fallback image for 1 hour
            },
        });
    } catch (fetchError) {
        // If even the placeholder service is down, return a minimal text response. This should be extremely rare.
        console.error("Ultimate fallback fetch failed:", fetchError);
        return new NextResponse('Error generating image. Please try again later.', { status: 500 });
    }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name') || 'Untitled Workflow';
    const category = searchParams.get('category') || 'Other';
    const complexity = searchParams.get('complexity') || 'Unknown';

    // Attempt to generate the AI image
    const imageDataUri = await generateWorkflowImage({
      name,
      category,
      complexity,
    });

    // The generation flow now returns a placeholder URL on its own internal failure.
    // If we get that, we trigger our more robust fallback system.
    if (imageDataUri.startsWith('https://placehold.co')) {
       return getErrorFallbackImageResponse();
    }

    // Decode the successful base64 response
    const base64Data = imageDataUri.split(',')[1];
    if (!base64Data) {
        console.error('Invalid image data URI received from generation flow, initiating fallback.');
        return getErrorFallbackImageResponse();
    }
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    // Return the successfully generated image
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, immutable', // Cache generated image for 7 days
      },
    });

  } catch (error) {
    // Catch any other unexpected errors during the process
    console.error('Failed to generate workflow image for slug:', params.slug, error);
    return getErrorFallbackImageResponse();
  }
}
