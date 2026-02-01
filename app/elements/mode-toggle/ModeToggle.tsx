"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (contentRef.current && triggerRef.current && !contentRef.current.contains(target) && !triggerRef.current.contains(target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <Button ref={triggerRef} variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content ref={contentRef} align="end" sideOffset={8} className="z-50 w-40 rounded-md border bg-popover p-1 text-popover-foreground shadow-md ml-12">
          <DropdownMenu.Item onSelect={() => setTheme("light")} className="cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-accent focus:bg-accent">
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => setTheme("dark")} className="cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-accent focus:bg-accent">
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => setTheme("system")} className="cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-accent focus:bg-accent">
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
