import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./reducer/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
// import { verifyAuth } from "../lib/redux_helper";
import reduxThunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

export const history = createHistory();

export function configStore() {
  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(reduxThunk, routerMiddleware(history)))
  );
  // store.dispatch(verifyAuth());
  const persistor = persistStore(store);
  return [store, persistor];
}

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = createStore(
//   persistedReducer,
//   composeWithDevTools(applyMiddleware(reduxThunk, routerMiddleware(history)))
// );
// store.dispatch(verifyAuth());
// export const persistor = persistStore(store);
