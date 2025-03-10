import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });
export const metadata = {
  title: "MultiPrint Admin",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={outfit.className}>{children}</body>
      </html>
    </>
  );
}
