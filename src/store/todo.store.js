import { Todo } from '../todos/models/todo.model'

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
    ],
    filter: Filters.All
}

/**
 * Inicia el Store mostrando el estado
 */
const initStore = () => {
    console.log(state);
}

const loadStore = () => {
    
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Returns the ToDo array, depending on the filter option.
 * @param {Filters} filter Tipo de todos a obtener
 * @returns Array<Todo>
 */
const getTodos = ( filter = Filters.All ) => {
    switch ( filter ) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
    
        default:
            throw new Error('Not a valid option');
    }
}

/**
 * Añade un nuevo toDo
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if (!description) throw new Error('Description needed');
    
    state.todos.push( new Todo(description));
    saveStateToLocalStorage();
}

/**
 * Cambia el estado del ToDo y lo invierte
 * @param {String} todoId Id
 */
const toogleTodo = ( todoId ) => {
    let todoIndex = state.todos.findIndex((t) => (t.id === todoId) );
    state.todos[todoIndex].done = !state.todos[todoIndex].done;
    saveStateToLocalStorage();
  }
  
/**
 * Delete a ToDo searched by his ID.
 * @param {String} todoId Id
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();
}

/**
 * Delete all the completed ToDo's
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done );
    saveStateToLocalStorage();
}

/**
 * Change the filter to the selectioned one
 * @param {String:Filters} newFilter Filters
 */
const setFilter = ( newFilter = Filters.All ) => {
    if( Object.keys(Filters).includes(newFilter) ){
        state.filter = newFilter;
    } else throw new Error(`${newFilter} no es una opcion valida`);
}

/**
 * Returns the actual Filter
 * @returns String:Filter
 */
const getCurrentFilter = () => {
    return state.filter.toString();
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toogleTodo
}