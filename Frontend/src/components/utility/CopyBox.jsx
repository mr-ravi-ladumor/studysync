import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CopyBox = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-wrap relative bg-gray-700 border-1 border-gray-500 text-white rounded-lg p-4 font-mono text-sm">
      
      <button
        onClick={handleCopy}
        className="absolute top-2 right-0 border-1 border-gray-500 bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs"
      >
          {copied ? 
        <div className="flex items-center">
          <Check size={14} />
          <span className="ml-1">Copied</span>
        </div>
        : 
        <div className="flex flex-row">
          <Copy size={14} />
          <span className="ml-1">Copy</span>
        </div>}
      </button>

      
      <pre className="whitespace-pre-wrap  break-all">
        {text}
      </pre>
    </div>
  );
};

export default CopyBox;