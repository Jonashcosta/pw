import NavBar from "@/components/navBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/auth/session-provider";
import Nav from "@/components/navBar/navB";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen m-0  items-center">
            <Nav />
            {children}
            <Footer />
          </div>
        </body>
      </Provider>
    </html>
  );
}
