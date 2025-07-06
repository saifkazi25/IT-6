'use client';
import { useState } from 'react';
import Question from './components/Question';
import Summary from './components/Summary';
import { buildPrompt, Answers } from '../lib/buildPrompt';

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '',
  });
  const [selfie, setSelfie] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const qs = [
    { key: 'q1', label: 'When do you feel most alive?' },
    { key: 'q2', label: 'Where would you wake up tomorrow if you could?' },
    { key: 'q3', label: 'What activity makes you lose track of time?' },
    { key: 'q4', label: 'Pick a song or vibe that defines joy for you.' },
    { key: 'q5', label: 'Who must join you on this perfect day?' },
    { key: 'q6', label: 'Choose a colour palette that feels like bliss.' },
    { key: 'q7', label: 'Name one object that symbolises fulfilment.' },
  ];

  async function handleGenerate() {
    if (!selfie) { alert('Please upload a selfie!'); return; }
    const body = new FormData();
    Object.entries(answers).forEach(([k, v]) => body.append(k, v));
    body.append('selfie', selfie);

    const res = await fetch('/api/generate', { method: 'POST', body });
    const json = await res.json();
    setImageUrl(json.url);
    setStep(step + 1);
  }

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Tsykunomi Fantasy Quiz</h1>

      {step < 7 && (
        <>
          <Question
            label={qs[step].label}
            value={(answers as any)[qs[step].key]}
            onChange={(v) => setAnswers({ ...answers, [qs[step].key]: v })}
          />
          <button
            className="mt-4 w-full bg-black text-white rounded-2xl py-3"
            onClick={() => setStep(step + 1)}
            disabled={!(answers as any)[qs[step].key]}
          >Next</button>
        </>
      )}

      {step === 7 && (
        <>
          <Summary answers={answers} />
          <input type="file" accept="image/*" onChange={e => setSelfie(e.target.files?.[0] || null)} />
          <button
            className="mt-4 w-full bg-green-600 text-white rounded-2xl py-3"
            onClick={handleGenerate}
            disabled={!selfie}
          >Generate my fantasy!</button>
        </>
      )}

      {step === 8 && imageUrl && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Here you are living your dream ✨</h2>
          <img src={imageUrl} alt="Fantasy" className="rounded-2xl shadow-xl mx-auto" />
          <p className="mt-4 text-sm opacity-70">(Link valid ~1 hour — save it!)</p>
        </div>
      )}
    </main>
  );
}

