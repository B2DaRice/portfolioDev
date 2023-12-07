"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'

export type DropdownItemType = {
  label: string,
  value: any,
  render?: () => JSX.Element
}

export function Dropdown ({ 
  placeholder = '', 
  items = [],
  variant = 'default'
}: {
  placeholder: string,
  items: DropdownItemType[],
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}) {
  return ( items.length &&
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={variant}>
          { placeholder}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        { items.map((item, index) => (
          <DropdownMenuItem key={`menuItem-${index}`}>
            { item.render ? item.render() : null }
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
