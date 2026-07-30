import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  FolderTree,
  Terminal,
  CheckCircle2,
  Loader2,
  Sparkles,
} from 'lucide-react';
import type { FileNode, GenerationResult, GenerationStep } from '@/types';
import FileExplorer from '@/components/FileExplorer';
import FileViewer from '@/components/FileViewer';
import StepsPanel from '@/components/StepsPanel';

interface BuilderPageProps {
  result: GenerationResult;
  onBack: () => void;
}

interface steps {
  id: number,
  title: string,
  detail: string,
  status: 'pending' | 'in-progress' | 'completed';
}

function updateFileContent(files: FileNode[], target: FileNode, value: string): FileNode[] {


  return files.map((node) => {
    if (node === target) return { ...node, content: value };
    if (node.children) return { ...node, children: updateFileContent(node.children, target, value) };
    return node;
  });
}

export default function BuilderPage({ result, onBack }: BuilderPageProps) {

  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [steps, setSteps] = useState<GenerationStep[]>(result.steps);
  const [files, setFiles] = useState<FileNode[]>(result.files);
  const stepIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {






    let currentStep = 0;
    stepIntervalRef.current = setInterval(() => {
      setSteps((prev) => {
        const next = [...prev];
        if (currentStep < next.length) {
          next[currentStep] = { ...next[currentStep], status: 'running' };
        }
        if (currentStep > 0 && currentStep <= next.length) {
          next[currentStep - 1] = { ...next[currentStep - 1], status: 'complete' };
        }
        return next;
      });

      currentStep++;

      if (currentStep > result.steps.length) {
        if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      }
    }, 1100);

    return () => {
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
    };

  }, [result.steps.length]);


  useEffect(() => {
    console.log(result)
    setSteps(result.steps)
  }, [result])

  const allComplete = steps.every((s) => s.status === 'complete');

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            New
          </button>
          <div className="h-5 w-px bg-slate-700" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-200">{result.projectName}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          {allComplete ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Build complete</span>
            </>
          ) : (
            <>
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
              <span>Building...</span>
            </>
          )}
        </div>
      </header>

      {/* Prompt summary bar */}
      <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/50 flex-shrink-0">
        <p className="text-xs text-slate-500">
          <span className="text-slate-400">Prompt:</span> {result.prompt}
        </p>
      </div>

      {/* Main content — left 50% (files + steps stacked), right 50% (editor) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left half: Files on top, Build Steps below */}
        <div className="w-1/2 flex flex-col overflow-hidden border-r border-slate-800">
          {/* Files (top) */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/30">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <FolderTree className="w-3.5 h-3.5" />
              Files
            </div>
            <div className="flex-1 overflow-y-auto">
              <FileExplorer
                files={files}
                selectedFile={selectedFile}
                onSelectFile={setSelectedFile}
              />
            </div>
          </div>

          {/* Build Steps (bottom) */}
          <div className="h-[45%] flex flex-col overflow-hidden border-t border-slate-800 bg-slate-900/30">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              Build Steps
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <StepsPanel steps={steps} />
            </div>
          </div>
        </div>

        {/* Right half: Monaco editor */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          {selectedFile ? (
            <FileViewer
              file={selectedFile}
              files={files}
              onClose={() => setSelectedFile(null)}
              onContentChange={(file, value) => {
                setFiles((prev) => updateFileContent(prev, file, value));
                setSelectedFile((prev) => (prev ? { ...prev, content: value } : prev));
              }}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 bg-[#0d1117]">
              <FolderTree className="w-12 h-12 mb-3 opacity-40" />
              <p className="text-sm">Select a file to view its contents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
