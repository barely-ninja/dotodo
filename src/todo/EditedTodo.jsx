import React from 'react'

const EditedTodo = (props) => {
  return (
    <div
      className="todo-edited">
      <input
        type="text"
        onChange={(ev)=>props.onTitleChange(ev.target.value)}
        value={props.title}
        placeholder="Title:"/>
      <textarea
        onChange={(ev)=>props.onBodyChange(ev.target.value)}
        value={props.content}
        rows="4"
        placeholder="Add some content:">
      </textarea>
      <div
        className="todo-edited-button"
        onClick={props.onEditFinished}>
        Done editing
      </div>
    </div>
  )
}

export default EditedTodo