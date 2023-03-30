import Layout from "@/components/layout";
import { store } from "@/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css"
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
