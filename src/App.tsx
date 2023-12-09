import React from 'react'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routing/AppRouter";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const store = setupStore();
function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <AppRouter />
          </BrowserRouter>
      </Provider>
  )
}

export default App
