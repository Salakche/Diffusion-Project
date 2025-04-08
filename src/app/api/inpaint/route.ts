import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as Blob;
    const mask = formData.get('mask') as Blob;
    const prompt = formData.get('prompt') as string;

    if (!image || !mask || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const formDataToSend = new FormData();
    formDataToSend.append('image', image);
    formDataToSend.append('mask', mask);
    formDataToSend.append('prompt', prompt);

    const response = await fetch(
      'https://api.stability.ai/v2beta/stable-image/edit/inpaint',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formDataToSend,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Failed to generate image' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ imageUrl: result.image });
  } catch (error: any) {
    console.error('Inpainting error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
