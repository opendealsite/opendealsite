/**
 * Appends query parameters to a URL.
 * 
 * @param origLink The original deal URL
 * @param appendage The query string to append (e.g., "tag=my-tag-20")
 * @returns The URL with appended parameters
 */
export const getAppenderLink = (origLink: string, appendage: string): string => {
  if (!origLink) return '';
  if (!appendage) return origLink;

  try {
    const url = new URL(origLink);
    const appendageParams = new URLSearchParams(appendage);

    appendageParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    return url.toString();
  } catch (error) {
    // Fallback if URL is invalid (unlikely for deal links but safe)
    const separator = origLink.includes('?') ? '&' : '?';
    return `${origLink}${separator}${appendage}`;
  }
};
