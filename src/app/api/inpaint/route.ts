import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

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

    // Convert blobs to array buffers
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const maskBuffer = Buffer.from(await mask.arrayBuffer());

    // Create form data for Stability AI
    const formDataToSend = new FormData();
    formDataToSend.append('image', new Blob([imageBuffer]), 'image.png');
    formDataToSend.append('mask', new Blob([maskBuffer]), 'mask.png');
    formDataToSend.append('prompt', prompt);
    formDataToSend.append('output_format', 'webp');

    const response = await axios.postForm(
      'https://api.stability.ai/v2beta/stable-image/edit/inpaint',
      formDataToSend,
      {
        validateStatus: undefined,
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'image/*'
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`API returned status ${response.status}: ${Buffer.from(response.data).toString()}`);
    }

    // Convert the image buffer to base64
    const base64Image = Buffer.from(response.data).toString('base64');
    const dataUrl = `data:image/webp;base64,${base64Image}`;

    return NextResponse.json({ imageUrl: dataUrl });
  } catch (error: any) {
    console.error('Inpainting error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
