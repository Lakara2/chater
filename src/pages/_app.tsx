import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import "@/styles/bootstrap.css";
import "@/styles/navbar.css";
import Navbars from '@/component/Navbars';


export default function App({ Component, pageProps }: AppProps) {
  return (<>
      <Navbars/>
      <Component {...pageProps} />
    </>
  );
}
