import type { GenerationResult, GenerationStep } from '@/types';
import { useState, useEffect } from 'react'

let LLMres = `

<boltArtifact id="todo-app" title="Todo App with React and Vite">
<boltAction type="file" filePath="package.json">
{
  "name": "todo-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.2.0"
  }
}
</boltAction>

<boltAction type="file" filePath="vite.config.js">
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
</boltAction>

<boltAction type="file" filePath="index.html">
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
</boltAction>

<boltAction type="file" filePath="src/main.jsx">
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
</boltAction>

<boltAction type="file" filePath="src/App.jsx">
import { useState, useEffect, useCallback } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import Filter from './components/Filter'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = useCallback((text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const editTodo = useCallback((id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    )
  }, [])

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 Todo App</h1>
          <p className="subtitle">Stay organized, get things done</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <div className="stats">
          <span>{activeCount} active</span>
          <span>{completedCount} completed</span>
        </div>

        <Filter filter={filter} onFilterChange={setFilter} />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {todos.length > 0 && (
          <button
            className="clear-btn"
            onClick={() => setTodos((prev) => prev.filter((t) => t.completed))}
          >
            Clear completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  )
}

export default App
</boltAction>

<boltAction type="file" filePath="src/App.css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.app {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

.container {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  width: 100%;
  max-width: 580px;
  margin-top: 30px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 4px;
}

.subtitle {
  color: #a0aec0;
  font-size: 0.95rem;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: #718096;
}

.stats span {
  background: #edf2f7;
  padding: 4px 12px;
  border-radius: 20px;
}

.clear-btn {
  display: block;
  margin: 20px auto 0;
  padding: 8px 20px;
  background: #fc8181;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.clear-btn:hover {
  background: #f56565;
}

@media (max-width: 640px) {
  .container {
    padding: 24px;
  }

  .header h1 {
    font-size: 1.6rem;
  }
}
</boltAction>

<boltAction type="file" filePath="src/index.css">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</boltAction>

<boltAction type="file" filePath="src/components/TodoForm.jsx">
import { useState } from 'react'

function TodoForm({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <button type="submit" className="add-btn" disabled={!text.trim()}>
        Add
      </button>
    </form>
  )
}

export default TodoForm
</boltAction>

<boltAction type="file" filePath="src/components/TodoList.jsx">
import { useState } from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null)

  const handleEdit = (id, newText) => {
    if (newText.trim()) {
      onEdit(id, newText.trim())
      setEditingId(null)
    }
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        {todos.length === 0 && <p>No todos yet. Add one above! 🎯</p>}
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={handleEdit}
          isEditing={editingId === todo.id}
          onStartEdit={() => setEditingId(todo.id)}
          onCancelEdit={() => setEditingId(null)}
        />
      ))}
    </ul>
  )
}

export default TodoList
</boltAction>

<boltAction type="file" filePath="src/components/TodoItem.jsx">
import { useState } from 'react'

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  onStartEdit,
  onCancelEdit,
}) {
  const [editText, setEditText] = useState(todo.text)

  const handleEditSubmit = (e) => {
    e.preventDefault()
    onEdit(todo.id, editText)
  }

  return (
    <li className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button type="submit" className="save-btn" disabled={!editText.trim()}>
            Save
          </button>
          <button type="button" className="cancel-btn" onClick={onCancelEdit}>
            ✕
          </button>
        </form>
      ) : (
        <>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className="checkmark"></span>
            <span className="todo-text" onDoubleClick={onStartEdit}>
              {todo.text}
            </span>
          </label>
          <div className="todo-actions">
            <button className="edit-btn" onClick={onStartEdit} title="Edit">
              ✏️
            </button>
            <button className="delete-btn" onClick={() => onDelete(todo.id)} title="Delete">
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem
</boltAction>

<boltAction type="file" filePath="src/components/Filter.jsx">
function Filter({ filter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ]

  return (
    <div className="filter">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={\`filter-btn \${filter === key ? 'active' : ''}\`}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default Filter
</boltAction>

<boltAction type="shell">
npm install
</boltAction>

<boltAction type="shell">
npx vite --host 0.0.0.0 --port 3000
</boltAction>
</boltArtifact>

      {isEditing ? (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button type="submit" className="save-btn" disabled={!editText.trim()}>
            Save
          </button>
          <button type="button" className="cancel-btn" onClick={onCancelEdit}>
            ✕
          </button>
        </form>
      ) : (
        <>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className="checkmark"></span>
            <span className="todo-text" onDoubleClick={onStartEdit}>
              {todo.text}
            </span>
          </label>
          <div className="todo-actions">
            <button className="edit-btn" onClick={onStartEdit} title="Edit">
              ✏️
            </button>
            <button className="delete-btn" onClick={() => onDelete(todo.id)} title="Delete">
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem
</boltAction>

<boltAction type="file" filePath="src/components/Filter.jsx">
function Filter({ filter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ]

  return (
    <div className="filter">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default Filter
</boltAction>

<boltAction type="shell">
npm install
</boltAction>

<boltAction type="shell">
npx vite --host 0.0.0.0 --port 3000
</boltAction>
</boltArtifact>
`
// interface projSteps {
//   id? : string ,
//    status?: 'pending' | 'running' | 'complete';
//   title: string,
//   detail: string
// }


export interface FileNode {
  name: string,
  type: 'file' | 'folder',
  children?: FileNode[],
  content?: string //code 
}

export interface mainNode {
  path: string,
  content: string
}
export enum StepType {
  CreateFile,
  CreateFolder,
  EditFile,
  DeleteFile,
  RunScript
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


// const STEP_TEMPLATES : Array<projSteps> = [
//   // { title: 'Analyzing prompt', detail: 'Understanding requirements and planning architecture' },
//   // { title: 'Scaffolding project', detail: 'Creating directory structure and config files' },
//   // { title: 'Installing dependencies', detail: 'Adding React, Tailwind CSS, and Lucide icons' },
//   // { title: 'Building components', detail: 'Generating UI components based on your prompt' },
//   // { title: 'Wiring up styles', detail: 'Applying design system and responsive layout' },
//   // { title: 'Finalizing project', detail: 'Polishing details and preparing preview' },
// ];


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


// -------------------------FUNCTIONS------------------------------------


function deriveProjectName(prompt: string): string {
  const cleaned = prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 3)
    .join('-');
  return cleaned || 'my-project';
}









// removes boltArtifact from llm response and categorize it into a tree structure like this : 
//  id: number;
  // title: string | undefined;
  // description: string;
  // type: StepType;
  // status: 'pending' | 'in-progress' | 'completed';
  // code?: string | undefined;
  // path?: string | undefined;
  // 
function parseXml(response: string): Step[] | undefined {
  // Extract the XML content between <boltArtifact> tags
  const xmlMatch = response.match(/<boltArtifact[^>]*>([\s\S]*?)<\/boltArtifact>/);

  if (!xmlMatch) {
      return [];
  }

  const xmlContent = xmlMatch[1];
  const steps: Step[] = [];
  let stepId = 1;

  // Extract artifact title
  const titleMatch = response.match(/title="([^"]*)"/);
  const artifactTitle = titleMatch ? titleMatch[1] : 'Project Files';

  // Add initial artifact step
  steps.push({
      id: stepId++,
      title: artifactTitle,
      description: '',
      type: StepType.CreateFolder,
      status: 'pending'
  });

  // Regular expression to find boltAction elements
  const actionRegex = /<boltAction\s+type="([^"]*)"(?:\s+filePath="([^"]*)")?>([\s\S]*?)<\/boltAction>/g;

  if (typeof xmlContent !== 'undefined') {
      let match;
      while ((match = actionRegex.exec(xmlContent)) !== null) {
          const [, type, filePath, content] = match;

          if (type === 'file') {
              // File creation step
              steps.push({
                  id: stepId++,
                  title: `Create ${filePath || 'file'}`,
                  description: '',
                  type: StepType.CreateFile,
                  status: 'pending',
                  code: content?.trim(),
                  path: filePath
              });
          } else if (type === 'shell') {
              // Shell command step
              steps.push({
                  id: stepId++,
                  title: 'Run command',
                  description: '',
                  type: StepType.RunScript,
                  status: 'pending',
                  code: content?.trim()
              });
          }
      }

      return steps;
  }
}










// function to get the title and the code from the steps and return an array of objects containing the path and the content
function getTitleAndCode(steps: Step[]): mainNode[] | undefined {
  if (typeof steps != 'undefined') {
      let projSteps: Array<mainNode> = []

      //mapping over step that we get from the function of applying bunch of regex on response of llm which essentially contain object having properties like { id , title , code , filePath , status? }
      //we get only the title and the code and save it in a seperate array which only contains objects containing keys code and title which will be used to pass into anohter object which will create a structure that is required by our frontend 
      steps.map((obj) => {

          let { title, code } = obj
          if (typeof title != 'undefined' && typeof code != 'undefined') {
              let mainTitle: string = title.split(' ').slice(1).join(' ')
              projSteps.push({ path: mainTitle, content: code })

          }
      }
      )
      // console.log(projSteps)
      return projSteps
  }

}











// function to build the file tree from the array of objects containing the path and the content
// the file tree is a tree structure like this :
//  name: string,
//  type: 'file' | 'folder',
//  children?: FileNode[],
//  content?: string //code 
// 
function buildFileTree(files: { path: string; content: string }[]): FileNode[] {
  const root: FileNode[] = [];

  for (const file of files) {
      const parts = file.path.split('/');
      let currentLevel = root;

      parts.forEach((part, index) => {
          const isLastPart = index === parts.length - 1;

          let existingNode = currentLevel.find((node) => node.name === part);

          if (!existingNode) {
              existingNode = isLastPart
                  ? { name: part, type: 'file', content: file.content }
                  : { name: part, type: 'folder', children: [] };
              currentLevel.push(existingNode);
          }

          if (!isLastPart && existingNode.children) {
              currentLevel = existingNode.children;
          }
      });
  }

  return root;
}


function buildFiles(prompt: string): FileNode[] {


  const name = deriveProjectName(prompt);



let steps = parseXml(LLMres)
// console.log(steps)
let mainTitleAndCode: mainNode[] | undefined = typeof steps !== 'undefined' ? getTitleAndCode(steps) : undefined;


let result: any = [];
result = mainTitleAndCode ? buildFileTree(mainTitleAndCode) : undefined
// console.log(result)




  return result
}

export function useCreateGeneration(prompt: string | null): GenerationResult | undefined {

  const [ProjSteps, setProjSteps] = useState<GenerationStep[]>([])
  // console.log('render — ProjSteps:', ProjSteps)

  useEffect(() => {

    // console.log("reached here :)", prompt)

    if (prompt === null) return;

let steps = parseXml(LLMres)
if (typeof steps != 'undefined') {
  steps.map((obj: any) => {
    if (typeof obj['title'] != 'undefined') {
      const { title, description, id, status } = obj
      setProjSteps((prev) => [...prev, { title, detail: '', id, status }]);
    }
  })
}


  }, [prompt])

  // console.log(ProjSteps)

  const steps: GenerationStep[] = ProjSteps.map((t, i) => ({
    id: i,
    title: t.title,
    detail: t.detail,
    status: 'pending',
  }));
  if (prompt != null) {
    return {
      prompt,
      projectName: deriveProjectName(prompt),
      steps,
      files: buildFiles(prompt),
    };
  }
}
