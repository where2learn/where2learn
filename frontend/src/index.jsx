import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import { configStore } from "./redux/configStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { auth } from "./firebase";
import { authInfoSuccess } from "./redux/actions/authActions";

const [store, persistor] = configStore();

auth.onAuthStateChanged((user) => {
  store.dispatch(authInfoSuccess(user));
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>,
    document.getElementById("root")
  );
});
