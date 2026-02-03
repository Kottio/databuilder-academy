export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const error: any = new Error(
      `HTTP ${response.status}: ${response.statusText}`,
    );
    error.status = response.status;
    error.info = await response.json().catch(() => null);
    throw error;
  }

  return response.json();
}
