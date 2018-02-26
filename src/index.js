import React from 'react'
import ReactDOM from 'react-dom'
import TodosApp from './todo'
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(TodosApp),
    document.getElementById('mount')
  )
})