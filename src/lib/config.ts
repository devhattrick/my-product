export const defaultLineUrl = "https://line.me/R/ti/p/@yourlineid";

export const appConfig = {
  useMocks: import.meta.env.VITE_USE_MOCKS !== "false",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api",
  lineUrl: import.meta.env.VITE_LINE_OA_URL ?? defaultLineUrl,
};
