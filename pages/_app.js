import "../styles/globals.css";
import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux'
import { authReducer } from './redux/authReducer';
import { createWrapper } from "next-redux-wrapper";

const store = createStore(authReducer);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
