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

/** Build a shareable link; URLSearchParams writes ordinary spaces as '+'. */
export function createGuestLink(siteUrl: string, guestName: string): string {
  const name = getRecipientName(new URLSearchParams({ to: guestName }));
  if (!name) throw new Error("Isi nama penerima terlebih dahulu.");
  const address = siteUrl.trim();
  let url: URL;
  try {
    if (!address || /\s/u.test(address)) throw new Error();
    url = new URL(address.includes("://") ? address : `https://${address}`);
  } catch {
    throw new Error("Masukkan alamat website undangan yang valid.");
  }
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) {
    throw new Error("Gunakan alamat website http atau https tanpa informasi login.");
  }
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  const local = !host.includes(".") || host.endsWith(".localhost") || host.endsWith(".local") ||
    /^(127\.|10\.|192\.168\.|169\.254\.|0\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host) || host.startsWith("[");
  if (local) {
    throw new Error("Alamat ini masih lokal. Ganti dengan domain website yang sudah online agar tamu dapat membukanya.");
  }
  // Accept a pasted generator URL or an existing guest link without keeping its recipient.
  url.pathname = url.pathname.replace(/\/kirim\/?$/, "/");
  url.search = "";
  url.hash = "";
  url.searchParams.set("to", name);
  return url.toString();
}

export function createWhatsAppMessage(name: string, couple: string, invitationUrl: string): string {
  return [
    `Kepada Yth.\n${name}`,
    `Dengan penuh cinta, kami mengundang Anda untuk hadir di hari bahagia kami.\n${couple}`,
    `Undangan lengkap & konfirmasi kehadiran:\n${invitationUrl}`,
    "Kehadiran dan doa restu Anda sangat berarti bagi kami.",
    `Terima kasih,\n${couple}`,
  ].join("\n\n");
}

export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
