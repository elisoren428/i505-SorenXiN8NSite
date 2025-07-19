import { generateWorkflowImage } from '@/ai/flows/generate-workflow-image';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 604800; // 7 days

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name') || 'Untitled Workflow';
  const category = searchParams.get('category') || 'Other';
  const complexity = searchParams.get('complexity') || 'Unknown';

  try {
    const imageDataUri = await generateWorkflowImage({
      name,
      category,
      complexity,
    });

    if (imageDataUri.startsWith('https://placehold.co')) {
       const placeholderResponse = await fetch(imageDataUri);
       return new NextResponse(placeholderResponse.body, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400, must-revalidate', // Cache fallback for 1 day
        },
      });
    }

    const base64Data = imageDataUri.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, immutable', // Cache for 7 days
      },
    });

  } catch (error) {
    console.error('Failed to generate workflow image:', error);
    // In case of error, redirect to a static placeholder
    // This prevents broken images in the UI
    const fallbackUrl = `https://placehold.co/300x160/222222/FF8C00.png?text=Error`;
    const fallbackResponse = await fetch(fallbackUrl);
    
    return new NextResponse(fallbackResponse.body, {
       headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=3600, must-revalidate', // Cache error image for 1 hour
        },
    });
  }
}
