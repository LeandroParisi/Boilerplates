import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RootProvider } from './store'

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <RootProvider>
          <Switch>
            <Route exact path="/" component="" />
          </Switch>
        </RootProvider>
      </BrowserRouter>
    </>
  )
}

export default App
