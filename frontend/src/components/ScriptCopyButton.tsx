import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function ScriptCopyButton({ script, scriptType }) {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script).then(() => {
      setCopiedScript(scriptType);
      setTimeout(() => setCopiedScript(null), 2000);
    });
  };

  return (
    <Button
      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
        copiedScript === scriptType
          ? 'bg-green-500 text-white focus:ring-green-400'
          : 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-400'
      }`}
      onClick={copyToClipboard}
    >
      {copiedScript === scriptType ? (
        <span className="flex items-center">
          <i className="fas fa-check mr-1"></i>コピー済み
        </span>
      ) : (
        <span className="flex items-center">
          <i className="fas fa-copy mr-1"></i>コピー
        </span>
      )}
    </Button>
  );
}