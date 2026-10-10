import type { Metadata } from "next";
import InvitationSender from "../../components/InvitationSender";

export const metadata: Metadata = {
  title: "Kirim Undangan — Adam & Salma",
  description: "Buat tautan undangan personal dan pesan WhatsApp untuk setiap tamu.",
  robots: { index: false, follow: false },
};

export default function SendInvitationPage() {
  return <InvitationSender />;
}
