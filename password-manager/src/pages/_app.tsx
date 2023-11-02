import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const specialId = uuidv4();
    const z = localStorage.getItem("specialId");
    if (!z||z===null) localStorage.setItem("specialId", specialId);
    else console.log(z);
  }, []);
  return <Component {...pageProps} />;
}
