import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoTab from './BasicInfoTab';
import FeaturesTab from './FeaturesTab';
import ScriptsTab from './ScriptsTab';
import RelatedInfoTab from './RelatedInfoTab';

export default function EditToolForm({ toolDetails: initialToolDetails, onSubmit }) {
  const [toolDetails, setToolDetails] = useState(initialToolDetails);

  const handleChange = (name, value) => {
    setToolDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(toolDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="basic">基本情報</TabsTrigger>
          <TabsTrigger value="features">機能と説明</TabsTrigger>
          <TabsTrigger value="scripts">スクリプト</TabsTrigger>
          <TabsTrigger value="related">関連情報</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card>
            <BasicInfoTab toolDetails={toolDetails} onChange={handleChange} />
          </Card>
        </TabsContent>
        <TabsContent value="features">
          <Card>
            <FeaturesTab toolDetails={toolDetails} onChange={handleChange} />
          </Card>
        </TabsContent>
        <TabsContent value="scripts">
          <Card>
            <ScriptsTab toolDetails={toolDetails} onChange={handleChange} />
          </Card>
        </TabsContent>
        <TabsContent value="related">
          <Card>
            <RelatedInfoTab toolDetails={toolDetails} onChange={handleChange} />
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          更新
        </Button>
      </div>
    </form>
  );
}