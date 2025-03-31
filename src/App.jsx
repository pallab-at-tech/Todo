import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {

    let todoString = localStorage.getItem("todos");

    if (todoString != null) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }

  }, [])


  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(params));
  }
  const toggleFinished = (e) => {
    setShowFinished(!ShowFinished)
  }









  const handleEdit = (e, id) => {

    let x = todos.filter(item => {
      return item.id === id;
    })

    setTodo(x[0].todo)
    handleDelete(e, id);

    saveToLs(todos);

  }
  const handleDelete = (e, id) => {
    // let x = confirm("Are you sure want to delete item ? ");

    // if (x === true) {

    let newTodos = todos.filter(item => {
      return item.id != id;
    })

    setTodos(newTodos);
    // }
    saveToLs(newTodos)

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("");
    saveToLs([...todos, { id: uuidv4(), todo, isCompleted: false }])
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    // saveToLs()
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos);
    saveToLs(todos)

  }



  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">

        <div className="addTodo my-5 flex flex-col gap-4">
          <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 bg-white' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='disabled:bg-violet-700 bg-violet-800 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full mx-2'>Save</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={ShowFinished} /> 
        <label className='mx-2' htmlFor="show">show finished</label>

        <div className='bg-black h-[1px] w-[90%] mx-auto my-2 opacity-15'></div>

        <h2 className='text-2xl font-bold'>Your todos</h2>

        <div className="todos">

          {todos.length === 0 && <div className='m-5'>No todos to display</div>}

          {todos.map(item => {


            return (ShowFinished || item.isCompleted === false) && <div key={item.id} className="todo flex justify-between my-3">

              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} id='' />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>




            </div>


          })}

        </div>


      </div>
    </>
  )
}

export default App
