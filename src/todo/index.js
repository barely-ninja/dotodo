import React from 'react'
import Todo from './Todo.jsx'
import EditedTodo from './EditedTodo.jsx'

const aTodo = {
  isEdited: true,
  isActive: true,
  title: '',
  content: ''
}

const validateSchema = (obj, schema) => {
  let result = true
  for (let prop in schema){
    result = result && (prop in obj) && (typeof obj[prop] === typeof schema[prop])
  }
  return result
}

const isObject = obj => (obj !== null && typeof obj === 'object')

const validateArrayOfObjects = (arr, schema) => arr.reduce((pr, cur)=>(pr && isObject(cur) && validateSchema(cur, schema)), true)

class TodosApp extends React.Component{
  constructor(props){
    super(props)
    this.state={todos: [aTodo], saved: false}
    this.saveState=this.saveState.bind(this)
  }

  componentDidMount(){
    try {
      const cachedTodos = JSON.parse(localStorage.getItem('todos'))
      if (Array.isArray(cachedTodos) && 
        cachedTodos.length > 0 &&
        validateArrayOfObjects(cachedTodos, aTodo)) this.setState({todos: cachedTodos})
      else throw(Error("wrong value in cache"))
    } 
    catch (err) {
      console.log('Cache error : ', err)
      localStorage.removeItem('todos')
    }

  }

  changeState(task){
    let todos = this.state.todos.map(x => Object.assign({}, x))
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
    }
    this.setState({todos, saved: false})
  }
  
  saveState(){
    localStorage.setItem('todos', JSON.stringify(this.state.todos))
    this.setState({saved: true})
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
            onClick={this.saveState}>
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