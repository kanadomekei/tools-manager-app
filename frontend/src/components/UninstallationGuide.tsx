import React from 'react';
import ScriptCopyButton from './ScriptCopyButton';

export default function UninstallationGuide({ uninstallScripts }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">アンインストール方法</h2>
      <div className="space-y-6">
        {Object.entries(uninstallScripts).map(([os, script]) => (
          <div key={os} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#34495E]">{os === 'ubuntu' ? 'Ubuntu' : 'Arch Linux'}</h3>
              <ScriptCopyButton script={script} scriptType={`${os}-uninstall`} />
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code>{script}</code>
            </pre>
          </div>
        ))}
      </div>
    </section>
  );
}