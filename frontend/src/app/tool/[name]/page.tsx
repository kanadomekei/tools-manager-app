'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import ToolHeader from '@/components/ToolHeader';
import ToolDescription from '@/components/ToolDescription';
import InstallationGuide from '@/components/InstallationGuide';
import UninstallationGuide from '@/components/UninstallationGuide';
import ExternalLinks from '@/components/ExternalLinks';
import RelatedTools from '@/components/RelatedTools';

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
          <ToolHeader toolDetails={toolDetails} />
          <CardContent className="p-6 space-y-8">
            <ToolDescription toolDetails={toolDetails} />
            <InstallationGuide installScripts={toolDetails.installScripts} />
            <UninstallationGuide uninstallScripts={toolDetails.uninstallScripts} />
            <ExternalLinks officialSite={toolDetails.officialSite} referenceSites={toolDetails.referenceSites} />
            <RelatedTools relatedTools={toolDetails.relatedTools} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}