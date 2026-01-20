import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import NavBar from "../../public/components/NavBar";
import SideNavBar from "../../public/components/SideNavBar";
import RightNavBar from "@/public/components/RightBar";
import NextTopLoader from "nextjs-toploader";
import { UserProvider } from "@/public/UserContext";

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
      <UserProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <NextTopLoader color="#246d3c" showSpinner={false} />
          <NavBar />


          <div className="flex mt-16 min-h-screen">
          
            <aside className="hidden mr-2 sm:block w-[260px] border-r border-gray-500 sticky top-16 h-[calc(100vh-4rem)]">
              <SideNavBar />
            </aside>

           
            <main className="flex-1 ">{children}</main>

        
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
