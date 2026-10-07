import { toast } from "sonner";

const MessageOf = (error: unknown) => (error instanceof Error ? error.message : "Something went wrong");

/** Single entry point for toasts so wording and durations stay consistent. */
export const ToastManager = {
  Success: (message: string, description?: string) => toast.success(message, { description }),
  Info: (message: string, description?: string) => toast.info(message, { description }),
  Error: (error: unknown, fallbackTitle = "That didn't work") =>
    toast.error(fallbackTitle, { description: MessageOf(error) }),
};
