// import '/src/css/componentes.css';
import { Todo } from '/src/classes/';
import { todoList } from '/src/index';

// Referencias Objetos HTML
const divTodoList = document.querySelector('.todo-list');
const inpNewTodo = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('button.clear-completed');
const ulFilters = document.querySelector('ul.filters');
const eleCounter = document.querySelector('footer > span.todo-count > strong')


export const actualizarPendientes = () => {
    eleCounter.innerText = todoList.contarPendientes();
}

export const crearTodoHTML = (todo) => {


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

