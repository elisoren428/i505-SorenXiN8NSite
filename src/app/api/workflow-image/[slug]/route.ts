import { generateWorkflowImage } from '@/ai/flows/generate-workflow-image';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 604800; // 7 days

const fallbackImages = [
    'https://cdn.pixabay.com/photo/2021/07/14/14/00/potato-chips-6466146_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/04/19/14/42/boeing-777-300-3333276_1280.png',
    'https://cdn.pixabay.com/photo/2014/11/25/16/32/drop-545377_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/12/10/00/56/international-4684747_960_720.jpg',
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg',
    'https://images.pexels.com/photos/6153743/pexels-photo-6153743.jpeg'
];

async function getErrorFallbackImageResponse(): Promise<NextResponse> {
    const fallbackUrl = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    try {
        const fallbackResponse = await fetch(fallbackUrl);
        if (!fallbackResponse.ok) {
           // If the random image fails, use a super-safe placeholder
           const ultimateFallbackUrl = `https://placehold.co/300x160/222222/FF8C00.png?text=Error`;
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
                'Cache-Control': 'public, max-age=3600, must-revalidate', // Cache error image for 1 hour
            },
        });
    } catch (fetchError) {
        // If even placeholder service is down, return a minimal response
        return new NextResponse('Error generating image.', { status: 500 });
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

    const imageDataUri = await generateWorkflowImage({
      name,
      category,
      complexity,
    });

    if (imageDataUri.startsWith('https://placehold.co')) {
       // The AI generation failed and returned a placeholder, so we use our better fallbacks.
       return getErrorFallbackImageResponse();
    }

    const base64Data = imageDataUri.split(',')[1];
    if (!base64Data) {
        console.error('Invalid image data URI received from generation flow.');
        return getErrorFallbackImageResponse();
    }
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, immutable', // Cache for 7 days
      },
    });

  } catch (error) {
    console.error('Failed to generate workflow image for slug:', params.slug, error);
    return getErrorFallbackImageResponse();
  }
}
