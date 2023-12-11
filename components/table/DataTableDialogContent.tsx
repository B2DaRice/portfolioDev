"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export interface DataTableDialogContentProps {
  title?: string;
  subtitle?: string;
  body?: React.ReactNode;
  submitLabel?: string;
  submitFn?: () => void;
}

export function DataTableDialogContent({ 
  title = '', 
  subtitle = '',
  body = <></>,
  submitLabel = '',
  submitFn = () => {}
}: DataTableDialogContentProps) {
  const route = useRouter();
  const [propertyName, setPropertyName] = useState('');

  const handleInputChange = (e: any) => {
    setPropertyName(e.target.value);
  };

  const handleBtnClick = () => {
    console.log(propertyName);
    route.push(`/host/add-property?name=${propertyName}`)
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      {body}

      <DialogFooter>
        <Button type="submit" onClick={submitFn}>{submitLabel}</Button>
      </DialogFooter>
    </div>
  );

}


