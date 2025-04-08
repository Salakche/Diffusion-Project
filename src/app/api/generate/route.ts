import { NextResponse } from 'next/server';
import axios from 'axios';

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const STABILITY_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1-0/text-to-image';

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();

    if (!STABILITY_API_KEY) {
      return NextResponse.json(
        { error: 'Stability API key not configured' },
        { status: 500 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const response = await axios.post(
      STABILITY_API_URL,
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${STABILITY_API_KEY}`,
        },
      }
    );

    const image = response.data.artifacts[0];
    const imageUrl = `data:image/png;base64,${image.base64}`;

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
