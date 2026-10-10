export const MAX_RECIPIENT_NAME_LENGTH = 100;

/** URLSearchParams decodes the name once; render the result as text, never HTML. */
export function getRecipientName(searchParams: Pick<URLSearchParams, "get">): string {
  return (searchParams.get("to") ?? "")
    .normalize("NFC")
    .replace(/[\p{Cc}\p{Cf}]/gu, " ")
    .replace(/\s+/gu, " ")
    .trim()
    .slice(0, MAX_RECIPIENT_NAME_LENGTH)
    .replace(/[\uD800-\uDBFF]$/u, "")
    .trim();
}