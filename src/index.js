import './style.css';
// import img from './assets/img/awesome_webpack_branding.png';

import { Todo, TodoList } from './classes'
import { crearTodoHTML, actualizarPendientes } from './js/componentes';

export const todoList = new TodoList();

// todoList.todos.forEach(todo => crearTodoHTML(todo));
todoList.todos.forEach(crearTodoHTML);
actualizarPendientes();

// console.log(todoList.todos);
// todoList.todos[0].imprimirClase();


function initTodos() {
    todoList.nuevoTodo(new Todo('Aprender HTML'));
    let newTodo = new Todo('Aprender Javascript!!');
    newTodo.completado = true;
    todoList.nuevoTodo(newTodo);
    todoList.nuevoTodo(new Todo('Aprender CSS'));
    todoList.nuevoTodo(new Todo('Aprender Angular'));
    // todoList.eliminarTodo(newTodo);
    // console.log('todoList', todoList);

}

document.querySelector('header > h1 > span')
    .addEventListener('click', () => {
        initTodos();
    })