import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Fredoka } from 'next/font/google'
import FooterTamar from "@/components/footerTamar/FooterTamar";

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-fredoka',
})

export const metadata = {
  title: "קטיפניקים ממליצים",
  description: "המקומות הכי שווים דרך חוויות של החברים מהישוב",
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className={fredoka.variable}>
      <body className={fredoka.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                  <FooterTamar  />
                </div>
                {/* <Footer className="wrapper1" /> */}
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
