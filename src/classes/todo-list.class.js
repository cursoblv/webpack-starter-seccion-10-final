import { Todo } from '/src/classes/';

export class TodoList {

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