<template>
    <div class="container">
        <button @click="changeTab('add-todo')">Add</button>
        <button @click="changeTab('incomplete-todo')">ToDo</button>
        <button @click="changeTab('completed-todo')">Complete</button>

        <keep-alive>
            <component
                :is="activeTab"
                :completedTodos="completedTodos"
                :incompleteTodos="incompleteTodos"
            >
            </component>
        </keep-alive>
    </div>
</template>

<script>
import AddTodo from './components/AddTodo'
import CompletedTodo from './components/CompletedTodo'
import IncompleteTodo from './components/IncompleteTodo'
// import { todos } from './data/todos'

export default {
    name: 'app',
    data(){
        return {
            activeTab: 'incomplete-todo',
            // todoIncrementId: todos.length,
            todos: [],
            todoIncrementId: 0,
            todoResource: {}

        }
    },
    components: {
        AddTodo,
        CompletedTodo,
        IncompleteTodo
    },
    computed: {
        incompleteTodos() {
            return this.todos.filter(x => !x.completed);
        },
        completedTodos() {
            return this.todos.filter(x => x.completed);
        }
    },
    methods: {
        changeTab(tabName) {
            this.activeTab = tabName;
        },
        onAddTodo(todoName) {
            console.log('hi');
            this.$http.post('todos', {
                userId: 1,
                title: todoName,
                completed: false,
            }).then(res => {
                console.log(res);
                this.todos.push({
                    id: res.body.id,
                    title: res.body.title,
                    completed: false,
                    edit: false
                });
            });


            // this.todos.push({
            //     id: this.todoIncrementId++,
            //     name: todoName,
            //     completed: false,
            //     edit: false
            // });
        },
        onCompleteTodo(todoId) {
            let currentTodo = this.getTodo(todoId);
            currentTodo.completed = true;
        },
        onRestoreTodo(todoId) {
            let currentTodo = this.getTodo(todoId);
            currentTodo.completed = false;
        },
        onDeleteTodo(todoId) {
            this.todos = this.todos.filter(x => x.id != todoId);
        },
        onEditTodo(todoId) {
            if (this.todos.some(x => x.edit)) {
                return;
            }

            let currentTodo = this.getTodo(todoId);
            currentTodo.edit = true;

        },
        onFinishEditTodo(modifitedTodo) {
            let currentTodo = this.getTodo(modifitedTodo.id);
            currentTodo.name = modifitedTodo.name;
            currentTodo.edit = false;
        },
        getTodo(todoId) {
            return this.todos.find(x => x.id === todoId);
        },
        addEventListeners() {
            this.$root.$on('add-todo', this.onAddTodo);
            this.$root.$on('delete-todo', this.onDeleteTodo);
            this.$root.$on('complete-todo', this.onCompleteTodo);
            this.$root.$on('restore-todo', this.onRestoreTodo);
            this.$root.$on('edit-todo', this.onEditTodo);
            this.$root.$on('finish-edit-todo', this.onFinishEditTodo);
        }
    },
    mounted() {
        this.addEventListeners();
    },
    created() {
        const actions = {
            getTodos: {method: 'get', url: 'todos'},
            postTodo: {method: 'post', url: 'todos'}
        };

        this.todoResource = this.$resource("posts", {}, actions);

        this.todoResource.getTodos()
            .then(res => {
                this.todos = res.body;
            }).catch(console.error);

        
    }
}
</script>

<style>
    /* Global Style */
    body {
        background: #fff;
        color: #333;
        font-family: Lato, sans-serif;
    }
    .container {
        display: block;
        width: 400px;
        margin: 100px auto 0;
    }
    ul {
        margin: 0;
        padding: 0;
    }
    li * {
        float: left;
    }
    li,
    h3 {
        clear: both;
        list-style: none;
    }
    input,
    button {
        outline: none;
    }
    button {
        background: none;
        border: 0px;
        color: #888;
        font-size: 15px;
        width: 60px;
        margin: 10px 0 0;
        font-family: Lato, sans-serif;
        cursor: pointer;
    }
    button:hover {
        color: #333;
    }
    h3,
    label[for="new-task"] {
        color: #333;
        font-weight: 700;
        font-size: 15px;
        border-bottom: 2px solid #333;
        padding: 30px 0 10px;
        margin: 0;
        text-transform: uppercase;
    }
    input[type="text"] {
        margin: 0;
        font-size: 18px;
        line-height: 18px;
        height: 18px;
        padding: 10px;
        border: 1px solid #ddd;
        background: #fff;
        border-radius: 6px;
        font-family: Lato, sans-serif;
        color: #888;
    }
    input[type="text"]:focus {
        color: #333;
    }
</style>
