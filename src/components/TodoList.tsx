import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import "./style.css";

interface Props {
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos:Todo[];
    setCompeletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({todos,setTodos,completedTodos,setCompeletedTodos}:Props) => {
  return (
    <div className="container">
        <Droppable droppableId='TodosList'>
            {
                (provided,snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                    <span className="todosHeading">
                        Active Tasks
                    </span>
                    {
                        todos.map((todo,index) => (
                            <SingleTodo 
                            index = {index}
                            todo={todo}
                            todos={todos}
                            key={todo.id}
                            setTodos={setTodos} 
                            />
                        ))
                    }
                    {provided.placeholder}
                </div>
                )
            }
       
        </Droppable>
        <Droppable droppableId="TodoRemove">
            {
                (provided,snapshot) => (
                    <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                    <span className="todosHeading">
                            Completed Tasks
                        </span>
                        {
                            completedTodos.map((todo,index) => (
                                <SingleTodo 
                                index = {index}
                                todo={todo}
                                todos={completedTodos}
                                key={todo.id}
                                setTodos={setCompeletedTodos} 
                                />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )
            }       
        </Droppable>       
    </div>
  )
}

export default TodoList
