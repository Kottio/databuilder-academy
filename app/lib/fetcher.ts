export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object
    throw error;
  }

  return response.json();
}
