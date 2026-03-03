import "./globals.css";
import { Poppins } from "next/font/google";
import ToasterProvider from "@/components/ui/ToasterProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: {
    template: "%s / ToDo Lista",
    default: "Dobrodošli / ToDo Lista",
  },
  description: "Stranica koja predstavlja ToDo listu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body className={poppins.className}>
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
