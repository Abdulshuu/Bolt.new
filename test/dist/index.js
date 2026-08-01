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
`;
export var StepType;
(function (StepType) {
    StepType[StepType["CreateFile"] = 0] = "CreateFile";
    StepType[StepType["CreateFolder"] = 1] = "CreateFolder";
    StepType[StepType["EditFile"] = 2] = "EditFile";
    StepType[StepType["DeleteFile"] = 3] = "DeleteFile";
    StepType[StepType["RunScript"] = 4] = "RunScript";
})(StepType || (StepType = {}));
// ---------- Step 1: Extract steps from raw LLM response ----------
export function parseXml(response) {
    // Extract the XML content between <boltArtifact> tags
    const xmlMatch = response.match(/<boltArtifact[^>]*>([\s\S]*?)<\/boltArtifact>/);
    if (!xmlMatch) {
        return [];
    }
    const xmlContent = xmlMatch[1];
    const steps = [];
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
            }
            else if (type === 'shell') {
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
// function getTitleAndCode(steps: Step[]): mainNode[] | undefined {
//     if (typeof steps != 'undefined') {
//         let projSteps: Array<mainNode> = []
//         //mapping over step that we get from the function of applying bunch of regex on response of llm which essentially contain object having properties like { id , title , code , filePath , status? }
//         //we get only the title and the code and save it in a seperate array which only contains objects containing keys code and title which will be used to pass into anohter object which will create a structure that is required by our frontend 
//         steps.map((obj) => {
//             let { title, code } = obj
//             if (typeof title != 'undefined' && typeof code != 'undefined') {
//                 let mainTitle: string = title.split(' ').slice(1).join(' ')
//                 projSteps.push({ path: mainTitle, content: code })
//             }
//         }
//         )
//         // console.log(projSteps)
//         return projSteps
//     }
// }
let steps = parseXml(LLMres);
console.log(steps);
// let mainTitleAndCode: mainNode[] | undefined = typeof steps !== 'undefined' ? getTitleAndCode(steps) : undefined;
// ---------- Step 2: Turn the flat file steps into a nested tree ----------
// function buildFileTree(files: { path: string; content: string }[]): FileNode[] {
//     const root: FileNode[] = [];
//     for (const file of files) {
//         const parts = file.path.split('/');
//         let currentLevel = root;
//         parts.forEach((part, index) => {
//             const isLastPart = index === parts.length - 1;
//             let existingNode = currentLevel.find((node) => node.name === part);
//             if (!existingNode) {
//                 existingNode = isLastPart
//                     ? { name: part, type: 'file', content: file.content }
//                     : { name: part, type: 'folder', children: [] };
//                 currentLevel.push(existingNode);
//             }
//             if (!isLastPart && existingNode.children) {
//                 currentLevel = existingNode.children;
//             }
//         });
//     }
//     return root;
// }
// let result: any = [];
// result = mainTitleAndCode ? buildFileTree(mainTitleAndCode) : undefined
// console.log(result)
// ---------- Step 3: Glue them together ----------
// export function responseToFileTree(response: string): FileNode[] {
//     const steps = parseXml(response);
//     const fileSteps = steps
//         .filter((step): step is Step & { path: string; code: string } =>
//             step.type === StepType.CreateFile && !!step.path && !!step.code
//         )
//         .map((step) => ({ path: step.path, content: step.code }));
//     return buildFileTree(fileSteps);
// }
// [
//   {
//         name: 'folder name ' 
//         type: type of folder: 'folder | file '
//         children: [
//       {
//         name: 'folder name ' 
//         type: type of folder: 'folder | file '
//       },
//       {
//         name : 'folder name ' 
//         type : type of folder : 'folder | file '
//       }
//         ]
//   }
//   {
//     name : 'filename  '
//     type : 'file'
//     children : []
//   }
// ]
//   {
//       name: 'src',
//       type: 'folder',
//       children: [
//         {
//           name: 'components',
//           type: 'folder',
//           children: [
//             {
//               name: 'Hero.tsx',
//               type: 'file',
//               content: `export default function Hero() {
//     return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
//       <div className="text-center px-6">
//         <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
//           ${prompt.slice(0, 40) || 'Welcome'}
//         </h1>
//         <p className="mt-6 text-lg text-slate-300 max-w-xl mx-auto">
//           A beautifully crafted landing page generated from your prompt.
//         </p>
//         <button className="mt-8 px-8 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition">
//           Get Started
//         </button>
//       </div>
//     </section>
//   );
// }
// `,
//             },
//             {
//               name: 'Navbar.tsx',
//               type: 'file',
//               content: `export default function Navbar() {
//   return (
//     <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
//       <span className="font-bold text-xl text-slate-900">${name}</span>
//       <div className="flex gap-6 text-sm text-slate-600">
//         <a href="#" className="hover:text-slate-900">Home</a>
//         <a href="#" className="hover:text-slate-900">About</a>
//         <a href="#" className="hover:text-slate-900">Contact</a>
//       </div>
//     </nav>
//   );
// }
// `,
//             },
//           ],
//         },
//         {
//           name: 'App.tsx',
//           type: 'file',
//           content: `import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// export default function App() {
//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <Hero />
//     </div>
//   );
// }
// `,
//         },
//         {
//           name: 'main.tsx',
//           type: 'file',
//           content: `import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import './index.css';
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
// `,
//         },
//         {
//           name: 'index.css',
//           type: 'file',
//           content: `@tailwind base;
// @tailwind components;
// @tailwind utilities;
// `,
//         },
//       ],
//     },
//     {
//       name: 'index.html',
//       type: 'file',
//       content: `<!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>${name}</title>
//   </head>
//   <body>
//     <div id="root"></div>
//     <script type="module" src="/src/main.tsx"></script>
//   </body>
// </html>
// `,
//     },
//     {
//       name: 'package.json',
//       type: 'file',
//       content: `{
//   "name": "${name}",
//   "private": true,
//   "version": "0.0.0",
//   "type": "module",
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build"
//   },
//   "dependencies": {
//     "react": "^18.3.1",
//     "react-dom": "^18.3.1"
//   }
// }
// `,
//     },
//     {
//       name: 'vite.config.ts',
//       type: 'file',
//       content: `import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// export default defineConfig({
//   plugins: [react()],
// });
// `,
//     },
// function parseXml(response: string): Step[] | undefined {
//   // Extract the XML content between <boltArtifact> tags
//   const xmlMatch = response.match(/<boltArtifact[^>]*>([\s\S]*?)<\/boltArtifact>/);
//   if (!xmlMatch) {
//     return [];
//   }
//   const xmlContent = xmlMatch[1];
//   const steps: Step[] = [];
//   let stepId = 1;
//   // Extract artifact title
//   const titleMatch = response.match(/title="([^"]*)"/);
//   const artifactTitle = titleMatch ? titleMatch[1] : 'Project Files';
//   // Add initial artifact step
//   steps.push({
//     id: stepId++,
//     title: artifactTitle,
//     description: '',
//     type: StepType.CreateFolder,
//     status: 'pending'
//   });
//   // Regular expression to find boltAction elements
//   const actionRegex = /<boltAction\s+type="([^"]*)"(?:\s+filePath="([^"]*)")?>([\s\S]*?)<\/boltAction>/g;
//   if (typeof xmlContent !== 'undefined') {
//     let match;
//     while ((match = actionRegex.exec(xmlContent)) !== null) {
//       const [, type, filePath, content] = match;
//       if (type === 'file') {
//         // File creation step
//         steps.push({
//           id: stepId++,
//           title: `Create ${filePath || 'file'}`,
//           description: '',
//           type: StepType.CreateFile,
//           status: 'pending',
//           code: content?.trim(),
//           path: filePath
//         });
//       } else if (type === 'shell') {
//         // Shell command step
//         steps.push({
//           id: stepId++,
//           title: 'Run command',
//           description: '',
//           type: StepType.RunScript,
//           status: 'pending',
//           code: content?.trim()
//         });
//       }
//     }
//     return steps;
//   }
// }
// let steps = parseXml(LLMres)
// if (typeof steps != 'undefined') {
//   steps.map((obj) => {
//     if (typeof obj['title'] != 'undefined') {
//       const { title, description, id, status } = obj
//       setProjSteps((prev) => [...prev, { title, detail: '', id, status }]);
//     }
//   })
// }
// {
//       name: 'src',
//       type: 'folder',
//       children: [
//         {
//           name: 'components',
//           type: 'folder',
//           children: [
//             {
//               name: 'Hero.tsx',
//               type: 'file',
//               content: `export default function Hero() {
//     return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
//       <div className="text-center px-6">
//         <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
//           \${prompt.slice(0, 40) || 'Welcome'}
//         </h1>
//         <p className="mt-6 text-lg text-slate-300 max-w-xl mx-auto">
//           A beautifully crafted landing page generated from your prompt.
//         </p>
//         <button className="mt-8 px-8 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition">
//           Get Started
//         </button>
//       </div>
//     </section>
//   );
// }
// `,
//             },
//             {
//               name: 'Navbar.tsx',
//               type: 'file',
//               content: `export default function Navbar() {
//   return (
//     <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
//       <span className="font-bold text-xl text-slate-900">${name}</span>
//       <div className="flex gap-6 text-sm text-slate-600">
//         <a href="#" className="hover:text-slate-900">Home</a>
//         <a href="#" className="hover:text-slate-900">About</a>
//         <a href="#" className="hover:text-slate-900">Contact</a>
//       </div>
//     </nav>
//   );
// }
// `,
//             },
//           ],
//         },
//         {
//           name: 'App.tsx',
//           type: 'file',
//           content: `import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// export default function App() {
//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <Hero />
//     </div>
//   );
// }
// `,
//         },
//         {
//           name: 'main.tsx',
//           type: 'file',
//           content: `import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import './index.css';
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
// `,
//         },
//         {
//           name: 'index.css',
//           type: 'file',
//           content: `@tailwind base;
// @tailwind components;
// @tailwind utilities;
// `,
//         },
//       ],
//     },
//     {
//       name: 'index.html',
//       type: 'file',
//       content: `<!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>\${name}</title>
//   </head>
//   <body>
//     <div id="root"></div>
//     <script type="module" src="/src/main.tsx"></script>
//   </body>
// </html>
// `,
//     },
//     {
//       name: 'package.json',
//       type: 'file',
//       content: `{
//   "name": "${name}",
//   "private": true,
//   "version": "0.0.0",
//   "type": "module",
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build"
//   },
//   "dependencies": {
//     "react": "^18.3.1",
//     "react-dom": "^18.3.1"
//   }
// }
// `,
//     },
//     {
//       name: 'vite.config.ts',
//       type: 'file',
//       content: `import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// export default defineConfig({
//   plugins: [react()],
// });
// `,
//     },
//# sourceMappingURL=index.js.map