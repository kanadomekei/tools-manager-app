'use client';

import ToolCard from './ToolCard';

const tools = [
  {
    name: 'Visual Studio Code',
    description: 'Microsoftのコードエディタ',
    imageSrc: '/vscode-icon.png',
    isInstalled: true,
  },
  {
    name: 'Git',
    description: 'バージョン管理システム',
    imageSrc: '/git-icon.png',
    isInstalled: false,
  },
  {
    name: 'Python',
    description: 'プログラミング言語',
    imageSrc: '/python-icon.png',
    isInstalled: false,
  },
];

export default function ToolGrid() {
  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.name} {...tool} />
        ))}
      </div>
    </div>
  );
}