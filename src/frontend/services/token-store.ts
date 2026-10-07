// The access token lives only in memory: never in localStorage, so injected scripts can't read it
// after the fact. A page reload recovers it through the httpOnly refresh cookie (see session-state.ts).

let accessToken: string | null = null;

export const GetAccessToken = () => accessToken;

export const SetAccessToken = (token: string) => {
  accessToken = token;
};

export const ClearAccessToken = () => {
  accessToken = null;
};
