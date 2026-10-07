import { useMutation } from "@tanstack/react-query";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { Post } from "@/frontend/services/request";
import type { ContactMessageInput, ContactMessageResponseType } from "../types";

const SendContactMessage = (input: ContactMessageInput) => Post<ContactMessageResponseType>("/contact", input);

const useSendContactMessageMutation = () =>
  useMutation({
    mutationFn: SendContactMessage,
    onSuccess: () => ToastManager.Success("Message sent", "We'll get back to you by email."),
    onError: (error) => ToastManager.Error(error, "Couldn't send your message"),
  });

export const contactService = { SendContactMessage, useSendContactMessageMutation };
