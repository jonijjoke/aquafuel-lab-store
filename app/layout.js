import React from "react";
import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { StateContext } from "@/context/StateContext";
import ChatBot from "@/components/ChatBot";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AquaFuel Lab Store",
  description: "Premium vitamiinivedet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <StateContext>
            <Layout>
            {children}
            </Layout>
          </StateContext>
          <Toaster />
          <ChatBot />
      </body>
    </html>
  );
}