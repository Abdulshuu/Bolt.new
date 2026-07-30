import { useState } from 'react';
import { ChevronRight, Folder, FolderOpen, FileCode, FileText, FileJson, FileType } from 'lucide-react';
import type { FileNode } from '@/types';

interface FileExplorerProps {
  files: FileNode[];
  selectedFile: FileNode | null;
  onSelectFile: (file: FileNode) => void;
}

function getFileIcon(name: string) {
  if (name.endsWith('.tsx') || name.endsWith('.ts')) return <FileCode className="w-4 h-4 text-blue-400" />;
  if (name.endsWith('.json')) return <FileJson className="w-4 h-4 text-yellow-400" />;
  if (name.endsWith('.css')) return <FileType className="w-4 h-4 text-pink-400" />;
  if (name.endsWith('.html')) return <FileText className="w-4 h-4 text-orange-400" />;
  return <FileText className="w-4 h-4 text-slate-400" />;
}

function findFilePath(files: FileNode[], target: FileNode, path: string[] = []): string[] | null {
  for (const node of files) {
    const current = [...path, node.name];
    if (node === target) return current;
    if (node.children) {
      const found = findFilePath(node.children, target, current);
      if (found) return found;
    }
  }
  return null;
}

function isFileInNode(node: FileNode, target: FileNode): boolean {
  if (node === target) return true;
  if (node.children) return node.children.some((c) => isFileInNode(c, target));
  return false;
}

function TreeNode({
  node,
  depth,
  selectedFile,
  onSelectFile,
  autoExpand,
}: {
  node: FileNode;
  depth: number;
  selectedFile: FileNode | null;
  onSelectFile: (file: FileNode) => void;
  autoExpand: boolean;
}) {
  const [open, setOpen] = useState(autoExpand);

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 w-full py-1 px-2 hover:bg-slate-800/60 rounded text-sm text-slate-300 transition-colors group"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <ChevronRight
            className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          />
          {open ? (
            <FolderOpen className="w-4 h-4 text-blue-400" />
          ) : (
            <Folder className="w-4 h-4 text-blue-400" />
          )}
          <span className="truncate">{node.name}</span>
        </button>
        {open && node.children && (
          <div className="overflow-hidden">
            {node.children.map((child) => (
              <TreeNode
                key={child.name}
                node={child}
                depth={depth + 1}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
                autoExpand={false}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isSelected = selectedFile === node;

  return (
    <button
      onClick={() => onSelectFile(node)}
      className={`flex items-center gap-1.5 w-full py-1 px-2 rounded text-sm transition-colors ${
        isSelected
          ? 'bg-blue-500/20 text-blue-300'
          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
      }`}
      style={{ paddingLeft: `${depth * 12 + 24}px` }}
    >
      {getFileIcon(node.name)}
      <span className="truncate">{node.name}</span>
    </button>
  );
}

export default function FileExplorer({ files, selectedFile, onSelectFile }: FileExplorerProps) {
  const topLevelAutoExpand = selectedFile
    ? files.filter((f) => f.type === 'folder' && isFileInNode(f, selectedFile)).map((f) => f.name)
    : [];

  return (
    <div className="py-2">
      {files.map((node) => (
        <TreeNode
          key={node.name}
          node={node}
          depth={0}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
          autoExpand={topLevelAutoExpand.includes(node.name)}
        />
      ))}
    </div>
  );
}

export { findFilePath };
