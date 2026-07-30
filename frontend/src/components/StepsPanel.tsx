import { Check, Loader2 } from 'lucide-react';
import type { GenerationStep } from '@/types';

interface StepsPanelProps {
  steps: GenerationStep[];
}

function StepIcon({ status }: { status: GenerationStep['status'] }) {
  if (status === 'complete') {
    return <Check className="w-4 h-4 text-emerald-400" />;
  }
  if (status === 'running') {
    return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
  }
  return <div className="w-2 h-2 rounded-full border border-slate-600" />;
}

export default function StepsPanel({ steps }: StepsPanelProps) {

  console.log(steps)
  return (
    <div className="flex flex-col">
      {steps.map((step, idx) => (
        <div key={step.id} className="relative flex gap-3 pb-6 last:pb-0">
          {idx < steps.length - 1 && (
            <div
              className={`absolute left-[7px] top-5 bottom-0 w-px ${step.status === 'complete' ? 'bg-emerald-500/50' : 'bg-slate-700'
                }`}
            />
          )}
          <div className="flex-shrink-0 mt-0.5">
            <StepIcon status={step.status} />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium ${step.status === 'pending' ? 'text-slate-500' : 'text-slate-200'
                }`}
            >
              {step.title}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{step.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
