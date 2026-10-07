import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu";
import { useTheme } from "@/frontend/hooks/use-theme";
import { ThemeTypeEnum } from "@/frontend/types";

const OPTIONS = [
  { value: ThemeTypeEnum.LIGHT, label: "Light", icon: Sun },
  { value: ThemeTypeEnum.DARK, label: "Dark", icon: Moon },
  { value: ThemeTypeEnum.SYSTEM, label: "System", icon: Laptop },
];

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change theme">
          {resolvedTheme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
            <Icon /> {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
