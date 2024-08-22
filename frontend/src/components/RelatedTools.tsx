import React from 'react';
import Link from 'next/link';

export default function RelatedTools({ relatedTools }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">関連ツール</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {relatedTools.map((tool, index) => (
          <li key={index}>
            <Link href={tool.url} className="text-blue-600 hover:underline">
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}