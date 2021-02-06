/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 829:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "L": () => (/* binding */ todoList)
});

;// CONCATENATED MODULE: ./src/classes/todo.class.js
class Todo {

    static fromJson({ id, tarea, completado, creado }) {
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea) {
        this.tarea = tarea;
        this.id = this.generateNextID();
        this.completado = false;
        this.creado = new Date();
    }

    generateNextID() {
        let sec = new Date().getTime();
        let ran = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        let id = sec.toString() + ran.toString();
        return parseInt(id);
    }

    imprimirClase() {
        console.log(`${this.tarea} - ${this.id}`);
    }

}
;// CONCATENATED MODULE: ./src/classes/todo-list.class.js


class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        // console.log('nuevoTodo: ', todo);
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        console.log('eliminarTodo', this.todos, id);

        if (!Number.isInteger(id)) {
            console.log("Error: [Id:int] Format error", { id });
            throw "Error: [Id:int] Format error";
        }

        this.todos = this.todos.filter(todo => todo.id !== id);
        this.guardarLocalStorage();

        console.log('this.todos:', this.todos);
    }


    /**
     * marcar como Completado y viceversa
     * @param {number} id 
     */
    marcarCompletado(id) {

        if (!Number.isInteger(id)) {
            console.log("Error: [Id:int] Format error", { id });
            throw "Error: [Id:int] Format error";
        }

        console.log('marcarCompletado', this.todos, id);

        for (const todo of this.todos) {

            if (todo.id === id) {
                todo.completado = !todo.completado;
                break;
            }
        }

        this.guardarLocalStorage();
    }

    elimarCompletados() {
        console.log('elimarCompletados', this.todos);

        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();

        console.log('this.todos:', this.todos);
    }

    contarPendientes() {
        let counter = 0;
        this.todos.forEach(todo => {
            if (todo.completado !== true) {
                counter++;
            }
        });

        return counter;
    }

    guardarLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    cargarLocalStorage() {
        console.log('cargarLocalStorage');

        this.todos = (localStorage.getItem('todos'))
            ? this.todos = JSON.parse(localStorage.getItem('todos'))
            : [];

        // this.todos = this.todos.map((obj) => Todo.fromJson(obj));
        this.todos = this.todos.map(Todo.fromJson);

    }
}
;// CONCATENATED MODULE: ./src/js/componentes.js
// import '/src/css/componentes.css';



// Referencias Objetos HTML
const divTodoList = document.querySelector('.todo-list');
const inpNewTodo = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('button.clear-completed');
const ulFilters = document.querySelector('ul.filters');
const eleCounter = document.querySelector('footer > span.todo-count > strong')


const actualizarPendientes = () => {
    eleCounter.innerText = todoList.contarPendientes();
}

const crearTodoHTML = (todo) => {


    let todoHTML = `<li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
                        <div class="view">
                            <input class="toggle test" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                            <label>${todo.tarea}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Create a TodoMVC template">
                    </li>`;

    const div = document.createElement('DIV');
    div.innerHTML = todoHTML;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}


// Eventos

inpNewTodo.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && inpNewTodo.value.length > 0) {
        const newTodo = new Todo(inpNewTodo.value);
        crearTodoHTML(newTodo);
        todoList.nuevoTodo(newTodo);
        inpNewTodo.value = null;
        actualizarPendientes();
    }
});


//, querySelectorAll('li .toggle')
divTodoList.addEventListener('click', (event) => {
    console.log('Click: ', event);

    // input, label, button
    const todoTarget = event.target;

    if (todoTarget.localName === 'input') {
        console.log('Click on Input');

        // const nombreElemento = todoTarget.localName;
        const todoElemento = todoTarget.parentElement.parentElement;
        const todoID = todoElemento.dataset.id;

        // const li = document.querySelector('li[data-id="' + todoID + '"]');

        if (todoTarget.attributes.type.value === 'checkbox') {

            if (todoTarget.classList.value.includes('toggle')) {
                // todoList.marcarCompletado(+e.getAttribute('data-id'));  
                todoList.marcarCompletado(+todoID);
                todoElemento.classList.toggle('completed');
                actualizarPendientes();
            }
        }

    } else if (todoTarget.localName === 'button') {
        console.log('Click on Button');

        if (todoTarget.classList.value.includes('destroy')) {
            const todoElemento = todoTarget.parentElement.parentElement;
            const todoID = todoElemento.dataset.id;

            todoList.eliminarTodo(+todoID);
            divTodoList.removeChild(todoElemento);
            actualizarPendientes();
        }

    } else if (event.target.localName === 'label') {
        console.log('Click on Label');

    } else {
        console.log('Click on ???DONDE???');
    }


})

btnClearCompleted.addEventListener('click', () => {
    todoList.elimarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        if (divTodoList.children[i].classList.contains('completed')) {
            divTodoList.removeChild(divTodoList.children[i]);
        }
    }
});


ulFilters.addEventListener('click', (event) => {
    console.log('ulFilters Click', event);

    if (event.target.hash === '#/') {
        // Todos
        for (const element of divTodoList.children) {
            element.classList.remove('hidden')
        }

    } else if (event.target.hash === '#/active') {
        // Pendientes
        for (const element of divTodoList.children) {
            if (element.classList.contains('completed')) {
                element.classList.add('hidden')
            } else {
                element.classList.remove('hidden')
            }
        }

    } else if (event.target.hash === '#/completed') {
        // Completados
        for (const element of divTodoList.children) {
            if (!element.classList.contains('completed')) {
                element.classList.add('hidden')
            } else {
                element.classList.remove('hidden')
            }
        }
    } else {
        return;
    }

    ulFilters.querySelectorAll('li > a').forEach((element) => element.classList.remove('selected'));
    event.target.classList.add('selected');


    return;
});


;// CONCATENATED MODULE: ./src/index.js

// import img from './assets/img/awesome_webpack_branding.png';




const todoList = new TodoList();

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(829);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;