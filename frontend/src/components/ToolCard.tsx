'use client';

import Image from 'next/image';

interface ToolCardProps {
  name: string;
  description: string;
  imageSrc: string;
  isInstalled: boolean;
}

export default function ToolCard({ name, description, imageSrc, isInstalled }: ToolCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <Image src={imageSrc} alt={name} width={64} height={64} className="mb-2" />
      <h2 className="text-lg font-semibold mb-1">{name}</h2>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <button
        className={`px-4 py-2 rounded-full ${
          isInstalled ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white'
        }`}
      >
        {isInstalled ? '開発を開始' : 'インストール'}
      </button>
    </div>
  );
}