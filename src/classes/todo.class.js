export class Todo {

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