import{r as u,j as e}from"./index-C3z9qcoZ.js";function j(){const[r,b]=u.useState(null),[d,g]=u.useState(new Set(["root"])),m={name:"CANONICAL-20250123-1000",path:"backup/CANONICAL-20250123-1000",isDirectory:!0,children:[{name:"package.json",path:"backup/CANONICAL-20250123-1000/package.json",isDirectory:!1,content:`{
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
}`},{name:"index.html",path:"backup/CANONICAL-20250123-1000/index.html",isDirectory:!1,content:`<!doctype html>
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
    <script src="https://kit.fontawesome.com/your-kit-id.js" crossorigin="anonymous"><\/script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"><\/script>
  </body>
</html>`},{name:"src",path:"backup/CANONICAL-20250123-1000/src",isDirectory:!0,children:[{name:"App.tsx",path:"backup/CANONICAL-20250123-1000/src/App.tsx",isDirectory:!1,content:`import { BrowserRouter } from 'react-router-dom'
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

export default App`},{name:"main.tsx",path:"backup/CANONICAL-20250123-1000/src/main.tsx",isDirectory:!1,content:`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`},{name:"components",path:"backup/CANONICAL-20250123-1000/src/components",isDirectory:!0,children:[{name:"ThumbBox.tsx",path:"backup/CANONICAL-20250123-1000/src/components/ThumbBox.tsx",isDirectory:!1,content:`interface ThumbBoxProps {
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
}`},{name:"base",path:"backup/CANONICAL-20250123-1000/src/components/base",isDirectory:!0,children:[{name:"LoadingScreen.tsx",path:"backup/CANONICAL-20250123-1000/src/components/base/LoadingScreen.tsx",isDirectory:!1,content:`export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}`}]}]}]}]},N=t=>{const s=new Set(d);s.has(t)?s.delete(t):s.add(t),g(s)},p=t=>{if(!t.content)return;const s=new Blob([t.content],{type:"text/plain"}),i=URL.createObjectURL(s),n=document.createElement("a");n.href=i,n.download=t.name,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},f=()=>{let t="BUILD-A-WIG STUDIO - CANONICAL BACKUP\\n";t+="=====================================\\n\\n";const s=(a,h=0)=>{const c="  ".repeat(h);a.isDirectory?(t+=`${c}📁 ${a.name}/\\n`,a.children&&a.children.forEach(l=>s(l,h+1))):(t+=`${c}📄 ${a.name}\\n`,a.content&&(t+=`${c}---\\n`,t+=a.content.split("\\n").map(l=>`${c}${l}`).join("\\n"),t+=`\\n${c}---\\n\\n`))};s(m);const i=new Blob([t],{type:"text/plain"}),n=URL.createObjectURL(i),o=document.createElement("a");o.href=n,o.download="build-a-wig-canonical-backup.txt",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(n)},x=(t,s=0)=>{const i=d.has(t.path);return e.jsxs("div",{className:"select-none",children:[e.jsx("div",{className:`flex items-center py-1 px-2 hover:bg-gray-800 cursor-pointer rounded ${(r==null?void 0:r.path)===t.path?"bg-blue-900":""}`,style:{paddingLeft:`${s*20+8}px`},onClick:()=>{t.isDirectory?N(t.path):b(t)},children:t.isDirectory?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:`ri-${i?"folder-open":"folder"}-line text-yellow-400 mr-2`}),e.jsx("span",{className:"text-white",children:t.name}),e.jsx("i",{className:`ri-arrow-${i?"down":"right"}-s-line text-gray-400 ml-auto`})]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"ri-file-text-line text-blue-400 mr-2"}),e.jsx("span",{className:"text-white",children:t.name}),t.content&&e.jsx("button",{onClick:n=>{n.stopPropagation(),p(t)},className:"ml-auto text-green-400 hover:text-green-300 p-1",title:"Download file",children:e.jsx("i",{className:"ri-download-line"})})]})}),t.isDirectory&&i&&t.children&&e.jsx("div",{children:t.children.map(n=>x(n,s+1))})]},t.path)};return e.jsxs("div",{className:"min-h-screen bg-black text-white",children:[e.jsx("div",{className:"bg-gray-900 border-b border-gray-700 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-white mb-1",children:"Download Center"}),e.jsx("p",{className:"text-gray-400",children:"Canonical Backup - Build-A-Wig Studio"})]}),e.jsx("div",{className:"flex gap-3",children:e.jsxs("button",{onClick:f,className:"bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",children:[e.jsx("i",{className:"ri-download-cloud-line"}),"Download All"]})})]})}),e.jsxs("div",{className:"flex h-[calc(100vh-80px)]",children:[e.jsx("div",{className:"w-1/3 bg-gray-900 border-r border-gray-700 overflow-y-auto",children:e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-3 text-white",children:"Project Files"}),x(m)]})}),e.jsx("div",{className:"flex-1 bg-gray-800 overflow-hidden",children:r&&r.content?e.jsxs("div",{className:"h-full flex flex-col",children:[e.jsxs("div",{className:"bg-gray-700 p-3 border-b border-gray-600 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("i",{className:"ri-file-text-line text-blue-400"}),e.jsx("span",{className:"font-medium text-white",children:r.name})]}),e.jsxs("button",{onClick:()=>p(r),className:"bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors",children:[e.jsx("i",{className:"ri-download-line"}),"Download"]})]}),e.jsx("div",{className:"flex-1 overflow-auto",children:e.jsx("pre",{className:"p-4 text-sm text-gray-300 font-mono whitespace-pre-wrap",children:r.content})})]}):e.jsx("div",{className:"h-full flex items-center justify-center",children:e.jsxs("div",{className:"text-center text-gray-400",children:[e.jsx("i",{className:"ri-file-text-line text-6xl mb-4"}),e.jsx("p",{className:"text-xl mb-2",children:"Select a file to view its content"}),e.jsx("p",{children:"Click on any file in the tree to preview and download"})]})})})]}),e.jsx("div",{className:"bg-gray-900 border-t border-gray-700 p-3",children:e.jsxs("div",{className:"flex items-center justify-between text-sm text-gray-400",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{children:"📦 Canonical Backup: CANONICAL-20250123-1000"}),e.jsx("span",{children:"📅 Created: 2025-01-23 10:00:00 UTC"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("i",{className:"ri-shield-check-line text-green-400"}),e.jsx("span",{children:"Read-only access"})]})]})})]})}export{j as default};
