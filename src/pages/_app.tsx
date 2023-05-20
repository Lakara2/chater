import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "@/styles/bootstrap.css"
import { AuthProvider } from '@/pages/api/context/authContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
