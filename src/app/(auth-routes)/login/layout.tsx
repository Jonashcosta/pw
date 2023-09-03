import "../../(public)/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "100"
});

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <div className="flex min-h-screen m-0  items-center justify-center bg-blue-500">
          {children}
        </div>
      </body>
    </html>
  );
}
