import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from '../store/index';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastContainer position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className='z-[10000]'
        />
        <Head>
          <title>Payment App</title>
          <link rel='icon' href='/favicon.png' />
          <meta name='kewwords' content='megz payment integiration app'/>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
