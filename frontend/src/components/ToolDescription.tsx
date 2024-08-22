import React from 'react';

export default function ToolDescription({ toolDetails }) {
  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">概要</h2>
        <p className="text-gray-700 leading-relaxed">{toolDetails.description}</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">主な機能</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {toolDetails.mainFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>
    </>
  );
}