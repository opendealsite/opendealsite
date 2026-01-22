/**
 * Wraps an original link into a template (e.g., redirector or affiliate wrapper).
 * 
 * @param origLink The original deal URL
 * @param linkTemplate The template string containing "URL_PLACE_HOLDER"
 * @returns The wrapped URL
 */
export const getWrapperLink = (origLink: string, linkTemplate: string): string => {
  if (!origLink || !linkTemplate) {
    return origLink;
  }

  // Replace all occurrences of the placeholder with the encoded original link
  return linkTemplate.replace(/URL_PLACE_HOLDER/g, encodeURIComponent(origLink));
};
