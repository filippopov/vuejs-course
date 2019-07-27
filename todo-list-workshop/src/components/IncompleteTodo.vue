<template>
    <div>
        <h3>Todo</h3>
        <ul id="incomplete-tasks">
            <!--<li v-for="todo in incompleteTodos" :key="todo.id">-->
                <!--<label>{{todo.name}}</label>-->
                <!--<button class="complete" @click="completeTodo(todo.id)">Complete</button>-->
                <!--<button class="delete" @click="deleteTodo(todo.id)">Delete</button>-->
            <!--</li>-->

            <todo-item v-for="todo in incompleteTodos" :key="todo.id" :todo="todo"></todo-item>
        </ul>
    </div>
</template>

<script>
    import TodoItem from './TodoItem'
    export default {
        name: "incomplete-todo",
        props: {
            incompleteTodos: {
                type: Array,
                required: true
            }
        },
        components: {
            TodoItem
        }
    }
</script>

<style scoped>

</style>