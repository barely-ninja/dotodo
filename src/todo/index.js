import React from 'react'
import Todo from './Todo.jsx'
import EditedTodo from './EditedTodo.jsx'

const aTodo = {
  isEdited: true,
  isActive: true,
  title: '',
  content: ''
}

const validateSchema = (todo, schema) => {
  let result = true
  for (let prop in schema){
    result = result && (prop in todo) && (typeof todo[prop] === typeof schema[prop])
  }
  return result
}

class TodosApp extends React.Component{
  constructor(props){
    super(props)
    this.state={todos: [aTodo], saved: false}
    this.changeState=this.changeState.bind(this)
  }

  componentDidMount(){
    try {
      const cachedTodos = JSON.parse(localStorage.getItem('todos'))
      if (Array.isArray(cachedTodos) && 
        cachedTodos.length > 0 &&
        typeof cachedTodos[0] === 'object' &&
        validateSchema(cachedTodos[0], aTodo)) this.setState({todos: cachedTodos})
      else throw("wrong value in cache")
    } 
    catch (err) {
      console.log('Cache error : ', err)
      localStorage.removeItem('todos')
    }

  }

  changeState(task){
    let todos = this.state.todos.map(x => Object.assign({}, x))
    let saved = false
    switch (task.op){
      case 'add':
      todos.push(aTodo)
      break
      case 'sort by title':
      todos.sort((a,b) => b.title.localeCompare(a.title))
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
      break
      case 'done':
      todos[task.id].isEdited = false
      break      
      case 'set content':
      todos[task.id].content = task.content
      break
      case 'save':
      localStorage.setItem('todos', JSON.stringify(todos))
      saved = true
      break
    }
    this.setState({todos, saved})
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
            className="save-todos-button"
            onClick={()=>this.changeState({op: 'save'})}>
            {this.state.saved?'Saved!':'Save todos'}
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
            <EditedTodo
              key={id} 
              title={item.title}
              content={item.content}
              onEditFinished={()=>this.changeState({op: 'done', id})}
              onTitleChange={title=>this.changeState({op: 'set title', id, title})}
              onBodyChange={content=>this.changeState({op: 'set content', id, content})}/> : 
            <Todo
              key={id} 
              isActive={item.isActive}
              title={item.title}
              content={item.content}
              onBodyClick={()=>this.changeState({op: 'edit', id})}
              onComplete={()=>this.changeState({op: 'complete', id})}
              onRemove={()=>this.changeState({op: 'remove', id})}/>
          )}
        </div>
      </div>
    )
  }
}

export default TodosApp