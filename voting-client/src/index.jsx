import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const pair = ['Trainspotting', '28 Days Later']
// const pair = []

ReactDOM.render(
  <App pair={pair} hasVoted="Trainspotting"/>,
  document.getElementById('app')
)