/**
 * Formats date into DD/MM/AAAA institutional format
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '-';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
}

/**
 * Returns current date formatted as DD/MM/AAAA
 */
export function getCurrentDateFormatted(): string {
  return formatDate(new Date().toISOString());
}
