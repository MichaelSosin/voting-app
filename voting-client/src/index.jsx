import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const pair = ['Trainspotting', '28 Days Later']

ReactDOM.render(
  <App pair={pair}/>,
  document.getElementById('app')
)