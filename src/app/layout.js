import "./globals.css";
import { Commissioner } from "next/font/google";

const commissioner = Commissioner({ subsets: ["latin"] });

export const metadata = {
  title: "VMS",
  description: "Ware house management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={commissioner.className}>
        <div className="bg-[#F5F8FA] w-[100%] h-[100vh]">{children}</div>
      </body>
    </html>
  );
}
