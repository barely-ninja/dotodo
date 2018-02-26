import React from 'react'
import Todo from './Todo.jsx'
import EditedTodo from './EditedTodo.jsx'

const aTodo = {
  isEdited: true,
  isActive: true,
  title: 'Enter a title',
  content: 'Enter some content'
}

class TodosApp extends React.Component{
  constructor(props){
    super(props)
    this.state={todos : [aTodo]}
  }

  componentDidMount(){
    const cachedTodos = localStorage.getItem('todos')
    if (cachedTodos){
      this.setState({todos: cachedTodos})
    }
  }

  changeState(task){
    let todos = this.state.todos.slice()
    switch (task.op){
      case 'add':
      todos.push(aTodo)
      break
      case 'sort by title':
      todos.sort((a,b) => a.title.localeCompare(b.title))
      break
      case 'edit':
      todos[task.id].isEdited = true
      break
      case 'complete':
      todos[task.id].isActive = false
      break
      case 'remove':
      todos.splice(task.id,1)
      break
      case 'set title':
      todos[task.id].title = task.title
      todos[task.id].isEdited = false
      break      
      case 'set body':
      todos[task.id].body = task.body
      todos[task.id].isEdited = false
      break
    }
    localStorage.setItem('todos', todos)
    this.setState({todos})
  }

  render(){
    return (
      <div
        className="app-container">
        <div
          className="toolbar">
          <div 
            className="add-todo-button"
            onClick={()=>this.changeState({op: 'add'})}>
            Add a todo
          </div>
          <div 
            className="sort-todos-button"
            onClick={()=>this.changeState({op: 'sort by title'})}>
            Sort todos by title
          </div>
        </div>
        <div
          className="todos-container">
          {this.state.todos.map((item, id) => item.isEdited ? 
            <Todo
              key={id} 
              isActive={item.isActive}
              title={item.title}
              content={item.content}
              onBodyClick={()=>this.changeState({op: 'edit', id})}
              onComplete={()=>this.changeState({op: 'complete', id})}
              onRemove={()=>this.changeState({op: 'remove', id})}/> : 
            <EditedTodo
              key={id} 
              title={item.title}
              content={item.content}
              onTitleChange={(title)=>this.changeState({op: 'set title', id, title})}
              onBodyChange={(body)=>this.changeState({op: 'set body', id, body})}/>
          )}
        </div>
      </div>
    )
  }
}

export default TodosApp