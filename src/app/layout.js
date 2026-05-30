import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import { title } from "framer-motion/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: '--font-great-vibes',
  subsets: ['latin'],
  weight: '400',
})

export const metadata = {
  metadataBase: new URL("https://arya-invitation.vercel.app/"),

  title: "Arya & Riska Wedding Invitation",

  description:
    "Undangan pernikahan Arya & Riska. Dengan penuh kebahagiaan kami mengundang Anda untuk hadir di hari istimewa kami.",

  openGraph: {
    title: "Arya & Riska Wedding Invitation",

    description:
      "Undangan pernikahan Arya & Riska. Dengan penuh kebahagiaan kami mengundang Anda untuk hadir di hari istimewa kami.",

    url: "https://arya-invitation.vercel.app/thumbnail.jpeg",

    siteName: "Wedding Invitation",

    images: [
      {
        url: "https://arya-invitation.vercel.app/thumbnail.jpeg",
        width: 1200,
        height: 630,
        alt: "Arya & Riska Wedding",
      },
    ],

    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arya & Riska Wedding Invitation",
    description:
      "Undangan pernikahan Arya & Riska.",
    images: [
      "https://arya-invitation.vercel.app/thumbnail.jpeg",
    ],
  },
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
