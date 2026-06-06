const HEALTHCHECK_TIMEOUT = 3000;

export async function checkDatabaseAvailability(): Promise<boolean> {
  const url =
    import.meta.env.NEXT_PUBLIC_DB_HEALTHCHECK_URL ||
    import.meta.env.VITE_DB_HEALTHCHECK_URL;

  if (!url) {
    return false;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    HEALTHCHECK_TIMEOUT,
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
