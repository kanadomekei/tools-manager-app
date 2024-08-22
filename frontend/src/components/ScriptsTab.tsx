import React from 'react';
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ScriptsTab({ toolDetails, onChange }) {
  const handleScriptChange = (type: 'install' | 'uninstall', index: number, field: 'os' | 'script', value: string) => {
    const newScripts = [...toolDetails[`${type}Scripts`]];
    newScripts[index] = { ...newScripts[index], [field]: value };
    onChange(`${type}Scripts`, newScripts);
  };

  const addScript = (type: 'install' | 'uninstall') => {
    onChange(`${type}Scripts`, [...toolDetails[`${type}Scripts`], { os: '', script: '' }]);
  };

  const removeScript = (type: 'install' | 'uninstall', index: number) => {
    const newScripts = toolDetails[`${type}Scripts`].filter((_, i) => i !== index);
    onChange(`${type}Scripts`, newScripts);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>インストール/アンインストールスクリプト</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {['install', 'uninstall'].map((type) => (
          <div key={type}>
            <h3 className="text-lg font-semibold mb-2">{type === 'install' ? 'インストール' : 'アンインストール'}スクリプト</h3>
            {toolDetails[`${type}Scripts`].map((script, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <Input
                  type="text"
                  value={script.os}
                  onChange={(e) => handleScriptChange(type as 'install' | 'uninstall', index, 'os', e.target.value)}
                  placeholder="OS"
                  className="mb-2"
                />
                <Textarea
                  value={script.script}
                  onChange={(e) => handleScriptChange(type as 'install' | 'uninstall', index, 'script', e.target.value)}
                  placeholder="スクリプト"
                  className="mb-2"
                />
                <Button type="button" onClick={() => removeScript(type as 'install' | 'uninstall', index)} variant="destructive" size="sm">
                  <i className="fas fa-trash mr-2"></i>削除
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => addScript(type as 'install' | 'uninstall')} variant="outline" className="mt-2">
              <i className="fas fa-plus mr-2"></i>スクリプトを追加
            </Button>
          </div>
        ))}
      </CardContent>
    </>
  );
}