import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Pull Request Memorial",
    template: "%s · Pull Request Memorial",
  },
  description:
    "A gothic dashboard for closed pull requests: grief scores, suspected murders, and haunted files.",
  applicationName: "Pull Request Memorial",
  openGraph: {
    title: "Pull Request Memorial",
    description:
      "Grief scores, suspected murders, and haunted files for closed pull requests.",
    siteName: "Pull Request Memorial",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b10",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body data-theme="gothic">
        {children}
      </body>
    </html>
  );
}