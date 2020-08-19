import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import '../src/components/Slider.css';
;
const initialData = {};
const initCartData = {};


export const AuthContext = React.createContext(initialData);
export const CartContext = React.createContext(initCartData);
export default function MyApp(props) {
  const [authData, setauthData] = useState(initialData)
  const [cartData, setCartData] = useState({});
  const { Component, pageProps } = props;
  React.useEffect(() => {
    if(window!==undefined){
      let data = JSON.parse(window.localStorage.getItem('cartData'));
      let userData = JSON.parse(window.localStorage.getItem('userData'));
      setauthData({userData:userData});
      setCartData(data);
    }
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="description"
          content="Ordrlo is digital menu card and order processing platform for restaurants. With aim to improve hygiene and overall dining experience, ordrlo provides contact less and seamless dinning solution."
        />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta
          name="keywords"
          content="menu, menu card, qrcode, qrcode scanner, ordrlo, restaurant, delivery, food, online food ordering"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthContext.Provider value={{authData,setauthData}}>
          <CartContext.Provider value={{cartData,setCartData}}>
            <Component {...pageProps} />
          </CartContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};