import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn-3d-secondary flex h-10 w-10 items-center justify-center rounded-xl p-0 focus-ring cursor-pointer"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <div
        className="relative h-5 w-5 transition-transform duration-500"
        style={{
          transform: theme === "dark" ? "rotateY(0deg)" : "rotateY(180deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Moon size={18} className="text-primary transition-colors duration-300" />
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Sun size={18} className="text-coral transition-colors duration-300" />
        </span>
      </div>
    </button>
  );
}
