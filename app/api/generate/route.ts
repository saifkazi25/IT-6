import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildPrompt, Answers } from '../../../lib/buildPrompt';

export const runtime = 'edge';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const answers: Answers = {
      q1: formData.get('q1') as string,
      q2: formData.get('q2') as string,
      q3: formData.get('q3') as string,
      q4: formData.get('q4') as string,
      q5: formData.get('q5') as string,
      q6: formData.get('q6') as string,
      q7: formData.get('q7') as string,
    };
    const selfie = formData.get('selfie') as File;

    const selfieBytes = await selfie.arrayBuffer();
    const upload = await openai.files.create({
      file: new Blob([selfieBytes]),
      purpose: 'vision'
    });

    const prompt = buildPrompt(answers);
    const generation = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      n: 1,
      reference_image_ids: [upload.id],
      response_format: 'url',
    } as any);

    return NextResponse.json({ url: generation.data[0].url });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}