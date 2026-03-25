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
    <div className="relative bg-gray-700 text-white rounded-lg p-4 font-mono text-sm">
      
      <button
        onClick={handleCopy}
        className="absolute top-2 right-0 bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      
      <pre className="whitespace-pre-wrap break-all mr-5">
        {text}
      </pre>
    </div>
  );
};

export default CopyBox;