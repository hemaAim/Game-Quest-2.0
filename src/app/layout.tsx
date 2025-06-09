import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import { QuizProvider } from "./context/QuizContext";
import { CodeProvider } from "./context/CodeContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Quest",
  description: "Plataforma de gamificação",
};


const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${ibm.className}  ${geistMono.variable} antialiased flex items-center justify-center bg-[#00000A]`}
      >
        <Toaster position="top-center" richColors closeButton />
        <AuthProvider>
          <CodeProvider> 
          <QuizProvider>
            {children}
          </QuizProvider>
          </CodeProvider>
        </AuthProvider>


      </body>
    </html>
  );
}
