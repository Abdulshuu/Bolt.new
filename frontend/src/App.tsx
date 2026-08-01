import { useState, useEffect } from 'react';
import LandingPage from '@/pages/LandingPage';
import BuilderPage from '@/pages/BuilderPage';
import { useCreateGeneration } from '@/lib/generator';
import type { GenerationResult } from '@/types';

type View = { name: 'landing' } | { name: 'builder'; result: GenerationResult };

export default function App() {
  const [view, setView] = useState<View>({ name: 'landing' });
  const [prompt, setPrompt] = useState<string | null>(null);
  // const [result, setResult] = useState<GenerationResult>({ prompt: '', projectName: '', steps: [{ id: 0, title: '', status: 'pending', detail: '' }], files: [{ name: '', type: 'file' }] })



  // useEffect(() => {






  // }, [prompt])

  // const handleGenerate = (prompt: string) => {
  //   setPrompt(prompt)
  //   // const result = useCreateGeneration(prompt);
  //   setView({ name: 'builder', result });

  // };
  const result = useCreateGeneration(prompt)

  // console.log(result)


  if (prompt !== null && result) {
    // console.log("on App.tsx ", result)
    return <BuilderPage result={result} onBack={() => setPrompt(null)} />;
  }


  return <LandingPage onGenerate={setPrompt} />;
}
