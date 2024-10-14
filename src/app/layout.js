import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
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
      <head>
        <meta property="og:image" content="https://cdn-icons-png.flaticon.com/512/3114/3114886.png" />
        <meta name="msapplication-TileImage" content="https://cdn-icons-png.flaticon.com/512/3114/3114886.png" />
      </head>
      <body className={fredoka.variable} >
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="navbar">
                  <Navbar />
                </div>
                <div className="wrapper">
                  {children}
                </div>
                <div className="footer">
                  <Footer />
                  <FooterTamar />
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
