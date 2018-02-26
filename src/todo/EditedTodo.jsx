import React from 'react'

const EditedTodo = (props) => {
  return (
    <div
      className="todo-edited">
      <input
        type="text"
        onChange={(ev)=>props.onTitleChange(ev.target.value)}
        value={props.title}/>
      <textarea
        onChange={(ev)=>props.onBodyChange(ev.target.value)}>
        {props.content}
      </textarea>
    </div>
  )
}

export default EditedTodo