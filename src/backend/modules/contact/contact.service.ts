import { ContactMessageModel } from "@/backend/db/schema/contact-message.schema";
import type { CreateContactMessageInput } from "@/backend/modules/contact/contact.validators";

const Create = async (input: CreateContactMessageInput) => {
  const doc = await ContactMessageModel.create(input);
  return { id: String(doc._id), createdAt: doc.createdAt.toISOString() };
};

export const contactService = { Create };
