import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { LanyardKeepAlive } from "@/components/chat/LanyardKeepAlive";
import { discordID } from "@/util/constants";

const interTight = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yiliya.studio"),
  title: { default: "Elijah Panique", template: "%s · Elijah Panique" },
  description: "Aspiring Design Engineer/Full-stack Developer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="bg-background text-foreground text-body min-h-full flex flex-col">
        <LanyardKeepAlive discordID={discordID} />
        <main className="mx-auto flex w-full max-w-content flex-col gap-12 px-6 pt-16 pb-24 md:px-0 md:pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
