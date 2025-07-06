export interface Answers {
  q1: string; q2: string; q3: string; q4: string; q5: string; q6: string; q7: string;
}

export function buildPrompt({ q1, q2, q3, q4, q5, q6, q7 }: Answers) {
  return `Create a vivid, photorealistic scene that represents the user's deepest fantasy.\n\n– Core emotion: ${q1}.\n– Dream location or world: ${q2}.\n– Activity that makes them lose time: ${q3}.\n– Soundtrack / vibe: ${q4}.\n– Companions present: ${q5}.\n– Mood-defining colour palette: ${q6}.\n– Symbolic object of fulfilment: ${q7}.\n\nUse cinematic lighting and composition. It should feel joyful, life-affirming and inspirational.`;
}