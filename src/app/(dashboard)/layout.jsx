"use client";

import SideNav from "@/components/SideNav/SideNav";
import "../globals.css";
import { Outfit } from 'next/font/google';
import useUserStore from "@/zustand/store";
import { useRouter } from "next/navigation"; // Import pour la redirection

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  if (!user) {
    router.push("/"); // Utiliser useRouter pour rediriger côté client
    return null; // Pour ne rien afficher avant la redirection
  }

  return (
    <html lang="en">
      <body className={outfit.className}>
        <main className="main">
          <SideNav />
          {children}
        </main>
      </body>
    </html>
  );
}
