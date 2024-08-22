'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';

export default function ToolDetail() {
  const params = useParams();
  const toolName = decodeURIComponent(params.name as string).replace(/-/g, ' ');

  const toolDetails = {
    name: toolName,
    version: "1.60.0",
    category: "テキストエディタ",
    status: "使用中",
    icon: "fas fa-code",
    description: "Microsoftが開発した無料のソースコードエディタです。デバッグ、タスク実行、バージョン管理などの機能を備えています。",
    mainFeatures: [
      "IntelliSenseによるコード補完",
      "デバッグ機能",
      "Git統合",
      "拡張機能によるカスタマイズ"
    ],
    installScripts: {
      ubuntu: `#!/bin/bash
sudo apt update
sudo apt install software-properties-common apt-transport-https wget -y
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code`,
      arch: `#!/bin/bash
sudo pacman -Syu
sudo pacman -S visual-studio-code-bin`
    },
    uninstallScripts: {
      ubuntu: `#!/bin/bash
sudo apt remove code
sudo apt autoremove`,
      arch: `#!/bin/bash
sudo pacman -Rs visual-studio-code-bin`
    },
    officialSite: "https://code.visualstudio.com/",
    referenceSites: [
      { name: "Visual Studio Code ドキュメント", url: "https://code.visualstudio.com/docs" },
      { name: "VS Code Can Do That?", url: "https://vscodecandothat.com/" },
    ],
    relatedTools: [
      { name: "Sublime Text", url: "/tool/sublime-text" },
      { name: "Atom", url: "/tool/atom" },
      { name: "WebStorm", url: "/tool/webstorm" },
    ],
    supportedOS: "Windows 10+, macOS 10.11+, Linux",
    lastUpdated: "2024-07-15"
  };

  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const copyToClipboard = (text: string, scriptType: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedScript(scriptType);
      setTimeout(() => setCopiedScript(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FA] to-[#E4E8F0] font-roboto text-[#333333]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" passHref>
            <Button variant="outline" className="hover:bg-white/20 transition-colors">
              <i className="fas fa-arrow-left mr-2"></i>戻る
            </Button>
          </Link>
          <Link href={`/tool/${encodeURIComponent(toolName.replace(/ /g, '-'))}/edit`} passHref>
            <Button className="bg-[#3498DB] text-white hover:bg-[#2980B9] transition-colors">
              <i className="fas fa-edit mr-2"></i>編集
            </Button>
          </Link>
        </div>
        <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white p-6">
            <div className="flex items-center space-x-4">
              <i className={`${toolDetails.icon} text-5xl`}></i>
              <div>
                <CardTitle className="text-3xl font-bold">{toolDetails.name}</CardTitle>
                <CardDescription className="text-xl text-white/80">バージョン {toolDetails.version}</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Badge variant="secondary" className="bg-white/20 text-white">{toolDetails.category}</Badge>
              <Badge variant={toolDetails.status === "使用中" ? "default" : "secondary"} className="bg-green-500 text-white">
                {toolDetails.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
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

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">インストール方法</h2>
              <div className="space-y-6">
                {Object.entries(toolDetails.installScripts).map(([os, script]) => (
                  <div key={os} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-[#34495E]">{os === 'ubuntu' ? 'Ubuntu' : 'Arch Linux'}</h3>
                      <Button
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                          copiedScript === `${os}-install`
                            ? 'bg-green-500 text-white focus:ring-green-400'
                            : 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-400'
                        }`}
                        onClick={() => copyToClipboard(script, `${os}-install`)}
                      >
                        {copiedScript === `${os}-install` ? (
                          <span className="flex items-center">
                            <i className="fas fa-check mr-1"></i>コピー済み
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <i className="fas fa-copy mr-1"></i>コピー
                          </span>
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm">
                      <code>{script}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">アンインストール方法</h2>
              <div className="space-y-6">
                {Object.entries(toolDetails.uninstallScripts).map(([os, script]) => (
                  <div key={os} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-[#34495E]">{os === 'ubuntu' ? 'Ubuntu' : 'Arch Linux'}</h3>
                      <Button
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                          copiedScript === `${os}-uninstall`
                            ? 'bg-green-500 text-white focus:ring-green-400'
                            : 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-400'
                        }`}
                        onClick={() => copyToClipboard(script, `${os}-uninstall`)}
                      >
                        {copiedScript === `${os}-uninstall` ? (
                          <span className="flex items-center">
                            <i className="fas fa-check mr-1"></i>コピー済み
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <i className="fas fa-copy mr-1"></i>コピー
                          </span>
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm">
                      <code>{script}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">公式サイト</h2>
              <a href={toolDetails.officialSite} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{toolDetails.officialSite}</a>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">参考サイト</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {toolDetails.referenceSites.map((site, index) => (
                  <li key={index}>
                    <a href={site.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{site.name}</a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">関連ツール</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {toolDetails.relatedTools.map((tool, index) => (
                  <li key={index}>
                    <Link href={tool.url} className="text-blue-600 hover:underline">
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}