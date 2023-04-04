import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from '../store/index';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
