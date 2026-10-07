// localStorage can be missing or throw (private mode, blocked site data); never let that break the page.

export const ReadStorage = <T>(key: string): T | null => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

export const WriteStorage = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Best effort only.
  }
};

export const RemoveStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Best effort only.
  }
};
