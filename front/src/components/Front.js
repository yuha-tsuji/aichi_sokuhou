import React, {useState, useEffect} from 'react'

const Front = () => {

    const [todos, setTodos] = useState([])
    const [editTodo, setEditTodo] = useState({id:'', content:''})

    useEffect(() => {
        try {
            async function fetchTodoAPI(){
                const config = {method: 'GET'} 
                const res = await fetch("http://localhost:8000/sokuhou/", config)
                const todoJson = await res.json()
                const reverseTodo = todoJson.reverse()
                setTodos(reverseTodo)
            }
            fetchTodoAPI()
            // const response = fetchTodoAPI('GET', 'todos/')
            // setTodos(response)
        } catch (e) {
            console.error(e)
        }
    }, [])

    const createNewTodo = (todo) => {
        try {
            async function fetchCreateTodo(todo){
                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(todo)
                }
                const res = await fetch(`http://localhost:8000/sokuhou/`, config)
                const todoJson = await res.json()
                setTodos([todoJson, ...todos])
                setEditTodo({id:'', content:''})
            }
            fetchCreateTodo(todo)
        } catch(e){
            console.error(e)
        }
    }

    const handleInputChange = () => e => {
        const value=e.target.value;
        const name = e.target.name
        setEditTodo({...editTodo, [name]: value})
    }

    return (
        <div>
            <div className='container'>
                <textarea className='form-control' name='content' placeholder='content' value={editTodo.content} onChange={handleInputChange()} required />
                <br /><br />
                {/* { editTodo.id ?  */}
                {/* <button onClick={()=>updateTodo(editTodo)} className='btn btn-primary'>Update</button> : */}
                <button onClick={()=>createNewTodo(editTodo)} className='btn btn-primary'>Create</button>
                {/* } */}
            </div>
            <ul>
                {
                    todos.map(todo => 
                    <li key={todo.id} className='todo_list'>{todo.created_at}<br /> content: {todo.content}
                    <br />
                    {/* <button onClick={()=>deleteTodo(todo.id)} className='btn btn-primary'>Delete</button>
                    <button onClick={()=>setEditTodo(todo)} className='btn btn-primary'>Update</button> */}
                    </li>)
                }
            </ul>
        </div>
    )
}

export default Front