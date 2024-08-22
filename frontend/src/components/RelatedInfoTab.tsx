import React from 'react';
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RelatedInfoTab({ toolDetails, onChange }) {
  const handleSiteChange = (index: number, field: 'name' | 'url', value: string) => {
    const newSites = [...toolDetails.referenceSites];
    newSites[index] = { ...newSites[index], [field]: value };
    onChange('referenceSites', newSites);
  };

  const addSite = () => {
    onChange('referenceSites', [...toolDetails.referenceSites, { name: '', url: '' }]);
  };

  const removeSite = (index: number) => {
    const newSites = toolDetails.referenceSites.filter((_, i) => i !== index);
    onChange('referenceSites', newSites);
  };

  const handleToolChange = (index: number, value: string) => {
    const newTools = [...toolDetails.relatedTools];
    newTools[index] = { name: value };
    onChange('relatedTools', newTools);
  };

  const addTool = () => {
    onChange('relatedTools', [...toolDetails.relatedTools, { name: '' }]);
  };

  const removeTool = (index: number) => {
    const newTools = toolDetails.relatedTools.filter((_, i) => i !== index);
    onChange('relatedTools', newTools);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>関連情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="officialSite" className="block text-sm font-medium text-gray-700 mb-1">公式サイト</label>
          <Input
            type="url"
            id="officialSite"
            name="officialSite"
            value={toolDetails.officialSite}
            onChange={(e) => onChange('officialSite', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">参考サイト</label>
          {toolDetails.referenceSites.map((site, index) => (
            <div key={index} className="flex mb-2">
              <Input
                type="text"
                value={site.name}
                onChange={(e) => handleSiteChange(index, 'name', e.target.value)}
                placeholder="サイト名"
                className="flex-grow mr-2"
              />
              <Input
                type="url"
                value={site.url}
                onChange={(e) => handleSiteChange(index, 'url', e.target.value)}
                placeholder="URL"
                className="flex-grow mr-2"
              />
              <Button type="button" onClick={() => removeSite(index)} variant="destructive" size="sm">
                <i className="fas fa-trash mr-2"></i>削除
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addSite} variant="outline" className="mt-2">
            <i className="fas fa-plus mr-2"></i>サイトを追加
          </Button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">関連ツール</label>
          {toolDetails.relatedTools.map((tool, index) => (
            <div key={index} className="flex mb-2">
              <Input
                type="text"
                value={tool.name}
                onChange={(e) => handleToolChange(index, e.target.value)}
                placeholder="ツール名"
                className="flex-grow mr-2"
              />
              <Button type="button" onClick={() => removeTool(index)} variant="destructive" size="sm">
                <i className="fas fa-trash mr-2"></i>削除
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addTool} variant="outline" className="mt-2">
            <i className="fas fa-plus mr-2"></i>ツールを追加
          </Button>
        </div>
      </CardContent>
    </>
  );
}