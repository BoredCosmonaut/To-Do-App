<template>
    <main :class="{'main-todo-dark-mode': darkMode,'main-todo-light-mode':!darkMode}">
        <div v-for="todo in todos" :key="todo._id" :id="todo._id">
            <div v-if="todo.completed" :class="{'done-todo-dark-mode': darkMode,'done-todo-light-mode':!darkMode}">
                <div class="done-mark-container">
                    <img class="done-mark-image" src="../../public/images/icon-check.svg" alt="">
                </div>
                <p :class="{'todo-text-dark-mode-done': darkMode,'todo-text-light-mode':!darkMode}">{{todo.todo}}</p>
                <img src="../../public/images/icon-cross.svg" @click="deleteTodo(todo._id)" class="cross">
            </div>
            <div v-else :class="{'not-done-todo-dark-mode': darkMode,'not-done-todo-light-mode':!darkMode}">
                <div class="not-done-mark" @click="completeTodo(todo._id)"></div>
                <p :class="{'todo-text-dark-mode': darkMode,'todo-text-light-mode':!darkMode}">{{todo.todo}}</p>
                <img src="../../public/images/icon-cross.svg" @click="deleteTodo(todo._id)" class="cross">
            </div>
            <hr>
        </div>
        <div :class="{'todo-bot-dark-mode': darkMode,'todo-bot-light-mode':!darkMode}">
            <p :class="{'active-todo-dark-mode': darkMode,'active-todo-light-mode':!darkMode}"> {{ completedTodoAmount }} items left</p>
            <p @click="clearCompleted" class="clear">Clear Completed</p>
        </div>
    </main>
</template>

<script setup>
import axios from 'axios';
import { defineProps, onMounted,ref,defineEmits } from 'vue';

 //Define the props for the array
const props = defineProps({
    todos:Array,
    darkMode:Boolean,
    completedTodoAmount:Number,
 })
 
const completedTodos = ref([]);
const emit = defineEmits(['clearCompleted','deleteTodo','completeTodo']);
//Gets the completed todos
onMounted(async () => {
    const responseCompleted = await axios.get('http://localhost:3000/api/todos/completed');
    completedTodos.value = responseCompleted.data;
})

const clearCompleted = () => {
    emit('clearCompleted');
}

const deleteTodo = (id) => {
    emit('deleteTodo',id);
}

const completeTodo = (id) => {
    emit('completeTodo',id);
}



</script>

<style scoped>
    .main-todo-dark-mode {
        display: flex;
        flex-direction: column;
        width: 90%;
        background-color: hsl(235, 24%, 19%);
        border-radius: 10px;
        padding: 5px;
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    }

    .done-todo-light-mode {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: line-through;  
    }

    .todo-text-light-mode {
        margin-left: 2%;
        color:hsl(235, 19%, 35%);
        font-size: 13px;
        font-weight: 700;
        margin-top: 3%;     
    }

    .done-mark-container {
        width: 20px;
        height:20px;
        display:flex;
        background-color: blue;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
    }

    .done-mark-image {
        width: 10px;
        height:10px;
    }

    .todo-text-dark-mode-done {
        margin-left: 2%;
        color:hsl(234, 11%, 52%);
        font-size: 13px;
        font-weight: 700;
        margin-top: 3%;   
    }

    .not-done-todo-dark-mode {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .not-done-todo-light-mode {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .main-todo-light-mode {
        display: flex;
        flex-direction: column;
        width: 90%;
        background-color:white;
        border-radius: 10px;
        padding: 5px;      
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;  
    }

    .done-todo-dark-mode {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: line-through;
    }

    .todo-text-dark-mode {
        margin-left: 2%;
        color:hsl(234, 11%, 52%);
        font-size: 13px;
        font-weight: 700;
        margin-top: 3%;
    }

    .not-done-mark {
        width: 15px;
        height: 15px;
        border: 2px solid black;
        border-radius: 50%;
    }

    .cross {
        width: 15px;
        height: 15px;
        margin-left: auto;
        margin-right: 3%;
    }

    .todo-bot-dark-mode {
        display:flex;
        flex-direction: row;
        width:100%;
    }

    .todo-bot-light-mode {
        display:flex;
        flex-direction: row;
        width:100%;
    }

    .active-todo-dark-mode {
        font-weight: 700;
        font-size: 15px;
        color:hsl(236, 9%, 61%);
    }

    .active-todo-light-mode {
        font-weight: 700;
        font-size: 15px;
        color:hsl(236, 9%, 61%);
    }

    .clear {
        font-size: 15px;
        font-weight:700;
        color:hsl(236, 9%, 61%);
        margin-left: auto;
    }

    @media(min-width:500px) {
        .done-todo-light-mode {
            height: 40px;
        }

        .todo-text-light-mode {
            font-size: 15px;
            margin-bottom: 3%;
        }

        .todo-text-dark-mode-done{
            font-size: 15px;
            margin-bottom: 3%;
        }

        .not-done-todo-dark-mode{
            height: 40px;
        }

        .not-done-todo-light-mode {
            height: 40px;
        }

        .done-todo-dark-mode {
            height: 40px;
        }

        .todo-text-dark-mode{
            font-size: 15px;
            margin-top: 0;
        }

        .todo-bot-dark-mode {
            height: 40px;
        }

        .todo-bot-light-mode {
            height:40px;
        }

        .active-todo-dark-mode{
            margin-top: 1.5%;
        }

        .active-todo-light-mode{
            margin-top: 1.5%;
        }

        .clear {
            margin-top: 1.5%;
        }
    }
</style>