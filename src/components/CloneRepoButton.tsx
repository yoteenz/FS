import { useState } from 'react';

interface CloneRepoButtonProps {
  repositoryUrl?: string;
  className?: string;
}

export default function CloneRepoButton({ 
  repositoryUrl = "https://github.com/yoteenz/FS-CSLP.git",
  className = ""
}: CloneRepoButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const cloneCommand = `git clone ${repositoryUrl}`;
  const repoName = repositoryUrl.split('/').pop()?.replace('.git', '') || 'project';

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleCloneClick = () => {
    setShowModal(true);
  };

  const handleCopyCommand = () => {
    copyToClipboard(cloneCommand);
  };

  const handleCopyUrl = () => {
    copyToClipboard(repositoryUrl);
  };

  return (
    <>
      {/* Clone Repo Button */}
      <button
        onClick={handleCloneClick}
        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${className}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        Clone Repo
      </button>

      {/* Clone Repository Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Clone Repository</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Repository Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Repository Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Repository:</span>
                    <span className="text-gray-900">{repoName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">URL:</span>
                    <span className="text-blue-600 font-mono text-xs break-all">{repositoryUrl}</span>
                  </div>
                </div>
              </div>

              {/* Clone Command */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Clone Command</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
                  <code className="break-all">{cloneCommand}</code>
                  <button
                    onClick={handleCopyCommand}
                    className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors"
                  >
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Setup Instructions */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Setup Instructions</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="font-medium">Clone the repository</p>
                      <p className="text-gray-600">Run the clone command in your terminal</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="font-medium">Navigate to project directory</p>
                      <p className="text-gray-600">cd {repoName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="font-medium">Install dependencies</p>
                      <p className="text-gray-600">npm install</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="font-medium">Start development server</p>
                      <p className="text-gray-600">npm run dev</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCopyCommand}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                  Copy Clone Command
                </button>
                <button
                  onClick={handleCopyUrl}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                  </svg>
                  Copy Repository URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
