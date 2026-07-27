import type { FplBootstrapData } from "../types";

export const baseLink = "/fpl-api";

const withTimestamp = (path: string) => `${path}?_=${Date.now()}`;

export const fetchBootstrapStatic = async (
  signal?: AbortSignal,
): Promise<FplBootstrapData> => {
  const response = await fetch(
    withTimestamp(`${baseLink}/api/bootstrap-static/`),
    {
      signal,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
