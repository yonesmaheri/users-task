import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "@/components/modules/provider";

const geistSans = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>
        <Provider>{children}</Provider>
        <Toaster position="bottom-center"/>
      </body>
    </html>
  );
}
