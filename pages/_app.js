import { Provider } from "react-redux";
import "../styles/globals.css";
import { useEffect } from "react";

import store from "../components/store/store";
import { getProfile } from "../components/actions/userActions";
import App from "next/app";
import cookieCutter from "cookie-cutter";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   try {
//     throw new Error("No accessToken or refreshToken");
//   } catch (error) {
//     return { ...appProps };
//   }
// };

export default MyApp;
