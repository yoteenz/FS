
import { useState, useEffect } from 'react';

interface FileItem {
  name: string;
  path: string;
  content?: string;
  isDirectory: boolean;
  children?: FileItem[];
}

export default function DownloadCenterPage() {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  // Canonical backup file structure (read-only display)
  const canonicalFiles: FileItem = {
    name: 'CANONICAL-20250123-1000',
    path: 'backup/CANONICAL-20250123-1000',
    isDirectory: true,
    children: [
      {
        name: 'package.json',
        path: 'backup/CANONICAL-20250123-1000/package.json',
        isDirectory: false,
        content: `{
  "name": "build-a-wig-studio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.28.0",
    "@supabase/supabase-js": "^2.39.3"
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.13.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.11.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.14",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.10.0",
    "vite": "^5.4.10"
  }
}`
      },
      {
        name: 'index.html',
        path: 'backup/CANONICAL-20250123-1000/index.html',
        isDirectory: false,
        content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Build-A-Wig - Custom Hair Studio</title>
    <meta name="description" content="Create your perfect custom wig with our professional Build-A-Wig service. Choose size, length, texture, and color.">
    
    <!-- Remix Icon -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/your-kit-id.js" crossorigin="anonymous"></script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
      },
      {
        name: 'src',
        path: 'backup/CANONICAL-20250123-1000/src',
        isDirectory: true,
        children: [
          {
            name: 'App.tsx',
            path: 'backup/CANONICAL-20250123-1000/src/App.tsx',
            isDirectory: false,
            content: `import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { AppRoutes } from './router'
import LoadingScreen from './components/base/LoadingScreen'

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <Suspense fallback={<LoadingScreen />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App`
          },
          {
            name: 'main.tsx',
            path: 'backup/CANONICAL-20250123-1000/src/main.tsx',
            isDirectory: false,
            content: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`
          },
          {
            name: 'components',
            path: 'backup/CANONICAL-20250123-1000/src/components',
            isDirectory: true,
            children: [
              {
                name: 'ThumbBox.tsx',
                path: 'backup/CANONICAL-20250123-1000/src/components/ThumbBox.tsx',
                isDirectory: false,
                content: `interface ThumbBoxProps {
  image: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export default function ThumbBox({ image, title, isSelected, onClick, className = "" }: ThumbBoxProps) {
  return (
    <div 
      className={\`relative cursor-pointer transition-all duration-200 \${className}\`}
      onClick={onClick}
    >
      <div className={\`relative rounded-lg overflow-hidden \${
        isSelected 
          ? 'border-[3px] border-white shadow-[0_0_0_1.3px_rgba(0,0,0,0.8)]' 
          : 'border-[3px] border-transparent'
      }\`}>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-center text-sm mt-2 text-white font-medium">
        {title}
      </p>
    </div>
  );
}`
              },
              {
                name: 'base',
                path: 'backup/CANONICAL-20250123-1000/src/components/base',
                isDirectory: true,
                children: [
                  {
                    name: 'LoadingScreen.tsx',
                    path: 'backup/CANONICAL-20250123-1000/src/components/base/LoadingScreen.tsx',
                    isDirectory: false,
                    content: `export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}`
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const downloadFile = (file: FileItem) => {
    if (!file.content) return;
    
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAllAsZip = () => {
    // Create a simple text file with all content for demo
    let allContent = "BUILD-A-WIG STUDIO - CANONICAL BACKUP\\n";
    allContent += "=====================================\\n\\n";
    
    const addFileContent = (file: FileItem, indent = 0) => {
      const spaces = '  '.repeat(indent);
      if (file.isDirectory) {
        allContent += `${spaces}📁 ${file.name}/\\n`;
        if (file.children) {
          file.children.forEach(child => addFileContent(child, indent + 1));
        }
      } else {
        allContent += `${spaces}📄 ${file.name}\\n`;
        if (file.content) {
          allContent += `${spaces}---\\n`;
          allContent += file.content.split('\\n').map(line => `${spaces}${line}`).join('\\n');
          allContent += `\\n${spaces}---\\n\\n`;
        }
      }
    };
    
    addFileContent(canonicalFiles);
    
    const blob = new Blob([allContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'build-a-wig-canonical-backup.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderFileTree = (file: FileItem, level = 0) => {
    const isExpanded = expandedFolders.has(file.path);
    
    return (
      <div key={file.path} className="select-none">
        <div 
          className={`flex items-center py-1 px-2 hover:bg-gray-800 cursor-pointer rounded ${
            selectedFile?.path === file.path ? 'bg-blue-900' : ''
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            if (file.isDirectory) {
              toggleFolder(file.path);
            } else {
              setSelectedFile(file);
            }
          }}
        >
          {file.isDirectory ? (
            <>
              <i className={`ri-${isExpanded ? 'folder-open' : 'folder'}-line text-yellow-400 mr-2`}></i>
              <span className="text-white">{file.name}</span>
              <i className={`ri-arrow-${isExpanded ? 'down' : 'right'}-s-line text-gray-400 ml-auto`}></i>
            </>
          ) : (
            <>
              <i className="ri-file-text-line text-blue-400 mr-2"></i>
              <span className="text-white">{file.name}</span>
              {file.content && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadFile(file);
                  }}
                  className="ml-auto text-green-400 hover:text-green-300 p-1"
                  title="Download file"
                >
                  <i className="ri-download-line"></i>
                </button>
              )}
            </>
          )}
        </div>
        
        {file.isDirectory && isExpanded && file.children && (
          <div>
            {file.children.map(child => renderFileTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Download Center</h1>
            <p className="text-gray-400">Canonical Backup - Build-A-Wig Studio</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={downloadAllAsZip}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <i className="ri-download-cloud-line"></i>
              Download All
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* File Tree */}
        <div className="w-1/3 bg-gray-900 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3 text-white">Project Files</h3>
            {renderFileTree(canonicalFiles)}
          </div>
        </div>

        {/* File Content */}
        <div className="flex-1 bg-gray-800 overflow-hidden">
          {selectedFile && selectedFile.content ? (
            <div className="h-full flex flex-col">
              <div className="bg-gray-700 p-3 border-b border-gray-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="ri-file-text-line text-blue-400"></i>
                  <span className="font-medium text-white">{selectedFile.name}</span>
                </div>
                <button
                  onClick={() => downloadFile(selectedFile)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                >
                  <i className="ri-download-line"></i>
                  Download
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                <pre className="p-4 text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  {selectedFile.content}
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <i className="ri-file-text-line text-6xl mb-4"></i>
                <p className="text-xl mb-2">Select a file to view its content</p>
                <p>Click on any file in the tree to preview and download</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-900 border-t border-gray-700 p-3">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <span>📦 Canonical Backup: CANONICAL-20250123-1000</span>
            <span>📅 Created: 2025-01-23 10:00:00 UTC</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-shield-check-line text-green-400"></i>
            <span>Read-only access</span>
          </div>
        </div>
      </div>
    </div>
  );
}
