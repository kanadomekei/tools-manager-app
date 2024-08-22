import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

interface AuthFormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  fields: { id: string; label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }[];
  submitText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export default function AuthForm({ title, onSubmit, fields, submitText, footerText, footerLinkText, footerLinkHref }: AuthFormProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
              <Input
                type={field.type}
                id={field.id}
                value={field.value}
                onChange={field.onChange}
                required
                className="mt-1"
              />
            </div>
          ))}
          <Button type="submit" className="w-full bg-[#3498DB] hover:bg-[#2980B9]">
            {submitText}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-gray-600">
          {footerText}
          <Link href={footerLinkHref} className="text-[#3498DB] hover:underline">
            {footerLinkText}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}