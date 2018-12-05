import React from 'react'
import { createClient } from 'service-mocker/client'
// eslint-disable-next-line import/no-webpack-loader-syntax
import scriptURL from 'sw-loader!./server.js'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const client = createClient(scriptURL)

client.ready.then(async () => {
  ReactDOM.render(<App />, document.getElementById('root'))
})
