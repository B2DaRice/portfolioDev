"use client"

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

export type PageActionButtonType = {
  label: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface DataTablePageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: PageActionButtonType[]
}

export function DataTablePageHeader({ title, subtitle = '', actions = [] } : DataTablePageHeaderProps) {

  return (
    <div className="flex items-center justify-between space-y-2 my-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-primary">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className='flex flex-row gap-2'>
        {actions.map(({ 
          label, 
          variant = 'outline', 
          icon = null, 
          onClick = () => {} 
        }, index) => (
          <DialogTrigger key={`pageAction${index}`} asChild>
            <Button variant={variant} size='sm' onClick={onClick}>
              <div className='flex flex-row gap-3 text-muted-foreground items-center'>
                {label}
                {icon}
              </div>
            </Button>
          </DialogTrigger>
        ))}
      </div>
    </div>
  );
}