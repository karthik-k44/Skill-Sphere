import { useEffect, useState } from "react";
import { ReadStorage, RemoveStorage, WriteStorage } from "@/frontend/lib/storage";
import type { ProfileFormValues } from "../types";

type StoredDraft = { values: ProfileFormValues; savedAt: string };

const AUTOSAVE_DELAY_MS = 800;

/**
 * Keeps unsaved edits in this browser so a refresh or closed tab doesn't lose them.
 * Device-local on purpose: the server copy only changes when the user presses Save.
 */
export const useProfileDraft = (userId: string, values: ProfileFormValues, isDirty: boolean) => {
  const key = `skillsphere:profile-draft:${userId}`;
  const [pendingDraft, setPendingDraft] = useState(() => ReadStorage<StoredDraft>(key));

  useEffect(() => {
    if (!isDirty) return;
    const timer = window.setTimeout(
      () => WriteStorage(key, { values, savedAt: new Date().toISOString() } satisfies StoredDraft),
      AUTOSAVE_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [key, values, isDirty]);

  return {
    /** A draft left over from a previous visit, until restored or dismissed. */
    pendingDraft,
    dismissDraft: () => setPendingDraft(null),
    clearDraft: () => {
      RemoveStorage(key);
      setPendingDraft(null);
    },
  };
};
