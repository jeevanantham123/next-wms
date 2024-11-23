import { App } from "./_components/App";
import "./globals.css";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600", "700", "800"],
  preload: true,
});

export const metadata = {
  title: "WMS",
  description: "Warehouse management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <div className="bg-[#F4F7FF] w-[100%] h-[100%]">
          <App>{children}</App>
        </div>
      </body>
    </html>
  );
}
