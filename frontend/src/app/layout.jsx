import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
