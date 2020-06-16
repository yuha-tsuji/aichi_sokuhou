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
        <div className='container'>
            <div>
                <div className="row">
                    <div className="row">
                        <div className="input-field col s12">
                        <textarea id="textarea1" className="materialize-textarea" name='content' value={editTodo.content} onChange={handleInputChange()} required/>
                        <label for="textarea1">Content</label>
                        <button onClick={()=>createNewTodo(editTodo)} className='waves-effect waves-light btn'>Create</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <ul className="collection">
                {
                    todos.map(todo => 
                    <li key={todo.id} className="collection-item">{todo.created_at}<br /> content: {todo.content}
                    </li>)
                }
            </ul>
        </div>
    )
}

export default Front