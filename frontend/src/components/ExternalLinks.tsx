import React from 'react';

export default function ExternalLinks({ officialSite, referenceSites }) {
  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">公式サイト</h2>
        <a href={officialSite} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{officialSite}</a>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">参考サイト</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {referenceSites.map((site, index) => (
            <li key={index}>
              <a href={site.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{site.name}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}