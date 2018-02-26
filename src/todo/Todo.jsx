import React from 'react'

const Todo = (props) => {
  return (
    <div
      className={props.isActive?"todo":"todo-completed"}>
      <div
        className="todo-content"
        onClick={props.isActive?props.onBodyClick:null}>
        <h2>{props.title}</h2>
        <span>{props.content}</span>
      </div>
      {props.isActive?
        <div
          className="active-todo-toggle"
          onClick={props.onComplete}>
          Click to complete
        </div> :
      null}
      <div
        className="remove-todo-button"
        onClick={props.onRemove}>
        Remove
      </div>
    </div>
  )

}

export default Todo