import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ToolHeader({ toolDetails }) {
  return (
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
  );
}