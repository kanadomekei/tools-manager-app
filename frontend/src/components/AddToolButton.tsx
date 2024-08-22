import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const AddToolButton: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8">
      <Link href="/add-tool" passHref>
        <Button
          className="bg-[#3498DB] text-white hover:bg-[#2980B9] transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>ツールを追加
        </Button>
      </Link>
    </div>
  );
};

export default AddToolButton;