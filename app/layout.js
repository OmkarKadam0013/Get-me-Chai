import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SessionWraper from "@/components/SessionWraper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me a Chaha",
  description: "This app is created to donate a chai to your content creater",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SessionWraper>
        <Navbar/>
        <div className="min-h-[89vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white"> 
        {children}
        </div>
        <Footer/>
        </SessionWraper>

      </body>
    </html>
  );
}
