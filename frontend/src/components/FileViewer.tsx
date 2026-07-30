import { FileText, X } from 'lucide-react';
import Editor from '@monaco-editor/react';
import type { FileNode } from '@/types';
import { findFilePath } from './FileExplorer';

interface FileViewerProps {
  file: FileNode;
  files: FileNode[];
  onClose: () => void;
  onContentChange: (file: FileNode, value: string) => void;
}

export default function FileViewer({ file, files, onClose, onContentChange }: FileViewerProps) {
  const path = findFilePath(files, file);
  const breadcrumb = path ? path.join(' / ') : file.name;
  const monacoPath = path ? path.join('/') : file.name;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span className="text-sm text-slate-400 truncate">{breadcrumb}</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-hidden bg-[#0d1117]">
        <Editor
          theme="vs-dark"
          path={monacoPath}
          defaultValue={file.content ?? ''}
          onChange={(value) => onContentChange(file, value ?? '')}
          loading={
            <div className="flex items-center justify-center h-full text-slate-500 text-sm">
              Loading editor...
            </div>
          }
          options={{
            fontSize: 13,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            padding: { top: 12, bottom: 12 },
            renderLineHighlight: 'all',
            lineNumbers: 'on',
            roundedSelection: true,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}
