import { Provider } from 'react-redux';
import '@/styles/globals.css';


import store from '@/components/store/store';

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
