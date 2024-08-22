import React from 'react';
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function FeaturesTab({ toolDetails, onChange }) {
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...toolDetails.mainFeatures];
    newFeatures[index] = value;
    onChange('mainFeatures', newFeatures);
  };

  const addFeature = () => {
    onChange('mainFeatures', [...toolDetails.mainFeatures, '']);
  };

  const removeFeature = (index: number) => {
    const newFeatures = toolDetails.mainFeatures.filter((_, i) => i !== index);
    onChange('mainFeatures', newFeatures);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>機能と説明</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">説明</label>
          <Textarea
            id="description"
            name="description"
            value={toolDetails.description}
            onChange={(e) => onChange('description', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">主な機能</label>
          {toolDetails.mainFeatures.map((feature, index) => (
            <div key={index} className="flex mb-2">
              <Input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-grow mr-2"
              />
              <Button type="button" onClick={() => removeFeature(index)} variant="destructive" size="sm">
                <i className="fas fa-trash mr-2"></i>削除
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addFeature} variant="outline" className="mt-2">
            <i className="fas fa-plus mr-2"></i>機能を追加
          </Button>
        </div>
      </CardContent>
    </>
  );
}