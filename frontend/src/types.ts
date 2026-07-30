export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

export interface GenerationStep {
  id?: number;
  title: string;
  status?: 'pending' | 'running' | 'complete';
  detail: string;
}

export interface GenerationResult {
  prompt: string;
  projectName: string;
  steps: GenerationStep[];
  files: FileNode[];
}
