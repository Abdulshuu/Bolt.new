export declare enum StepType {
    CreateFile = 0,
    CreateFolder = 1,
    EditFile = 2,
    DeleteFile = 3,
    RunScript = 4
}
export interface Step {
    id: number;
    title: string | undefined;
    description: string;
    type: StepType;
    status: 'pending' | 'in-progress' | 'completed';
    code?: string | undefined;
    path?: string | undefined;
}
export interface Project {
    prompt: string;
    steps: Step[];
}
export interface FileItem {
    name: string;
    type: 'file' | 'folder';
    children?: FileItem[];
    content?: string;
    path: string;
}
export interface FileViewerProps {
    file: FileItem | null;
    onClose: () => void;
}
export declare function parseXml(response: string): Step[] | undefined;
//# sourceMappingURL=index.d.ts.map