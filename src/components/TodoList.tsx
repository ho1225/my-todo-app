import React, { useState } from 'react'


interface Todo {
  name: string;
  checked: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    {name: "Buy groceries", checked: false},
    {name: "Clean the house", checked: false}, 
    {name: "Walk the dog", checked: false},]);
  
  const[newTodo, setNewTodo] = useState<string>("")

  const handleTodoTick = (index: number) => {
    const isChecked: boolean = todos[index].checked

    const updatedTodos:Todo[] =  todos.map((todo, i)=>
      i === index ? {...todo, checked: isChecked ? false : true} : todo)
    
    setTodos(updatedTodos)
    setNewTodo("")
  }

  const handleAddItem = () => {
    if(newTodo.trim() !== ""){
      const updatedTodos:Todo[] = [...todos, {name: newTodo, checked: false}]

      setTodos(updatedTodos)
      setNewTodo("");
    }
  }

  const handleDeleteItem = (event: React.MouseEvent, index: number) => {
    // Prevent event propagation to the parent li element
    event.stopPropagation();

    const updatedTodos:Todo[] = todos.filter((_, i)=>
      i !== index)
    setTodos(updatedTodos)
  }

  return ( 
    <>
        <ul className="list-group">
            {
              todos?.map((todo, index) => 
              <li 
                className={`list-group-item ${todo.checked ? "active": ""}`}
                key={index}
                onClick={() => handleTodoTick(index)}
                >
                <input 
                  className="form-check-input me-1" 
                  type="checkbox"
                  checked={todo.checked}
                  value={todo.name}
                  aria-label={todo.name}
                  onChange={e=>e}
                  />
                  {todo.name}
                  <button type="button" className="mx-2 btn btn-danger" onClick={(e) => handleDeleteItem(e, index)}>Delete</button>
              </li>)
            }
        </ul>
        
        <div className="form-outline">
          
          <input type='text' id='todoitem' className="form-control" placeholder="Add to-do item" value={newTodo} onChange={(e) =>setNewTodo(e.target.value)} />
          
          <button type="button" className="m-2 btn btn-primary" value="submit" onClick={handleAddItem}>Add</button>
        </div>
        <div>
        
        </div>
        
    </>
  )
}

export default TodoList