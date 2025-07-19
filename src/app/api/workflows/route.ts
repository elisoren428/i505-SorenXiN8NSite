import { getWorkflows } from '@/lib/github';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const workflows = await getWorkflows();
    return NextResponse.json(workflows);
  } catch (error) {
    console.error('API Error fetching workflows:', error);
    return NextResponse.json({ message: 'Failed to fetch workflows' }, { status: 500 });
  }
}