import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit,AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import "./style.css";
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    index:number;
    todo:Todo;
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({index,todo,todos,setTodos}:Props) => {
    const[edit,setEdit] = useState<boolean>(false);
    const[editTodo,setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id:number) => {
        setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone}: todo))
    }
    const handleDelete = (id:number) => {
        setTodos(todos.filter((todo) => todo.id !== id ))
    }

    const handleEdit = (e:React.FormEvent,id:number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => (
            todo.id ===id ? {...todo,todo:editTodo} : todo
        )));
        setEdit(false);
    }

    const ref = useRef<HTMLInputElement>(null); //for focusing the input area when click edit icon

    useEffect(() => {
        ref.current?.focus();
    },[edit]);


  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided,snapshot) => (
                <form 
                className={`todosSingle ${snapshot.isDragging ? "drag" : ""}`} 
                onSubmit={(e) => handleEdit(e,todo.id)}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                    {
                        edit ? (
                            <input 
                            ref = {ref}
                            value={editTodo} 
                            onChange={(e) => setEditTodo(e.target.value)} className="todosSingleText"/>
                        ) :
                        (
                            
                                todo.isDone ? (
                                    <s className="todosSingleText">{todo.todo}</s>
                                ): (
                                    <span className="todosSingleText">{todo.todo}</span>
                                )
                            
                        )
                    }
                    
                
                    <div>
                        <span className="icon" onClick={ () => {
                        if(!edit && !todo.isDone){
                                setEdit(!edit);
                            }
                        }
                        }><AiFillEdit/></span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete/></span>
                        <span className="icon" onClick={() => handleDone(todo.id)}><MdDone/></span>
                    </div>
                </form>
            )
        }
        
    </Draggable>
    
  )
}

export default SingleTodo
