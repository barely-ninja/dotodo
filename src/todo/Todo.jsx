import React from 'react'

const Todo = (props) => {
  const renderCompleted = () => [
      <div
        className="todo-content">
        <span>
        {props.content}</span>
      </div>,
      <div
        className={"completed-todo-toggle"}>
        Completed!
      </div>
  ]

  const renderActive = () => [
      <div
        className="todo-content">
        <span
        onClick={props.onBodyClick}>
        {props.content}</span>
      </div>,
      <div
        className={"active-todo-toggle"}
        onClick={props.onComplete}>
        Click to complete
      </div>
  ]

  return (
    <div
      className="todo">
      <h2>{props.title}</h2>
      {props.isActive?renderActive():renderCompleted()}
      <div
        className="remove-todo-button"
        onClick={props.onRemove}>
        Remove
      </div>
    </div>
  )

}

export default Todo