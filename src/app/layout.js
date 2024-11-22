import { App } from "./_components/App";
import "./globals.css";
import { Inter } from "next/font/google";

const commissioner = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WMS",
  description: "Warehouse management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={commissioner.className}>
        <div className="bg-[#F4F7FF] w-[100%] h-[100%]">
          <App>
            {children}
          </App>
        </div>
      </body>
    </html>
  );
}
