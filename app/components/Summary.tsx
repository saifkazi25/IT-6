'use client';
import { Answers } from '../../lib/buildPrompt';

export default function Summary({ answers }: { answers: Answers }) {
  return (
    <div className="bg-gray-100 p-4 rounded-2xl mb-6">
      <h2 className="font-semibold mb-2">Your answers</h2>
      <ul className="space-y-1 text-sm">
        {Object.entries(answers).map(([k, v]) => (
          <li key={k}><span className="font-medium">{k}: </span>{v}</li>
        ))}
      </ul>
    </div>
  );
}