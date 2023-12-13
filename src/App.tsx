import React from 'react'
import {HashRouter} from 'react-router-dom'
import AppRouter from './routing/AppRouter'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'

const store = setupStore()

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </Provider>
  )
}

export default App
