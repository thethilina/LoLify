import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../public/components/NavBar";
import SideNavBar from "../public/components/SideNavBar";
import NextTopLoader from "nextjs-toploader";
import { UserProvider } from "@/public/UserContext";
import RightNavBar from "@/public/components/RightBar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LOLify",
  description: "LOLify: Browse funny memes and hilarious content to brighten your day.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
     <UserProvider>     <NavBar/>
 <body
  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
>
  <NextTopLoader color="#246d3c" showSpinner={false} />

  <NavBar />

  <div className="grid grid-cols-[260px_1fr_320px] mt-16 min-h-screen">
  
    <aside className="hidden sm:block border-r border-gray-500 sticky top-16 h-[calc(100vh-4rem)]">
      <SideNavBar />
    </aside>


    <main className="px-4 py-3">
      {children}
    </main>


    <aside className="hidden lg:block border-l border-gray-500 sticky top-16 h-[calc(100vh-4rem)]">
      <RightNavBar />
    </aside>
  </div>
</body>
</UserProvider>
    </html>
  );
}
