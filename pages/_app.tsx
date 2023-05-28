import "../styles/main.css";
import type { AppProps } from 'next/app'
import Header from "../components/Header/Header";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
      <main className={montserrat.className}>
        <Header/>
        <Component {...pageProps} />
      </main>
  );
}