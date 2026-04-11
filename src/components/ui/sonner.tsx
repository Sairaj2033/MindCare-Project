import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      expand={true}
      visibleToasts={4}
      gap={14}
      closeButton={true}
      duration={6000}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card/90 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border-[0.5px] group-[.toaster]:border-border/50 group-[.toaster]:shadow-2xl group-[.toaster]:shadow-black/5 group-[.toaster]:rounded-xl group-[.toaster]:p-5",
          title: "group-[.toast]:font-semibold group-[.toast]:text-base",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-sm group-[.toast]:mt-1",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:font-medium group-[.toast]:rounded-md",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md",
          success: "group-[.toaster]:!border-green-500/30 group-[.toaster]:!bg-green-500/5",
          error: "group-[.toaster]:!border-destructive/30 group-[.toaster]:!bg-destructive/5",
          info: "group-[.toaster]:!border-blue-500/30 group-[.toaster]:!bg-blue-500/5",
          warning: "group-[.toaster]:!border-amber-500/30 group-[.toaster]:!bg-amber-500/5",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
