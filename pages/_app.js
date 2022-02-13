import '@/styles/globals.css';

import { wrapper } from '@/components/store/store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   try {
//     throw new Error("No accessToken or refreshToken");
//   } catch (error) {
//     return { ...appProps };
//   }
// };

export default wrapper.withRedux(MyApp);
