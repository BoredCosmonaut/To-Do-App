<template>
    <main :class="{'box-dark-mode-new':darkMode,'box-light-mode-new':!darkMode}">
        <div class="circle"></div>
        <form action="post" method="post" class="new-box" @submit.prevent="addTodo">
            <input type="text" name="text" id="" placeholder="Create a new todo.." v-model="newTodoText" :class="{'dark-mode-new':darkMode,'light-mode-new':!darkMode}">
        </form>
    </main>
</template>

<script setup>
    import axios, { Axios } from 'axios';
    import { defineProps,defineEmits,ref } from 'vue';

    const props = defineProps({
        darkMode:{
            type:Boolean,
        },
    })

    const newTodoText = ref("");
    const emit = defineEmits(["addTodo"]);
    const addTodo = () =>{
        if(newTodoText.value.trim()) {
        emit('addTodo',newTodoText.value);
        newTodoText.value = "";
        } else {
            alert("Please enter a todo");
        }
    }

</script>

<style scoped>
    .new-box {
        width: 100%;
    }

    .box-dark-mode-new {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 90%;
        height: 30px;
        padding: 5px;
        border-radius: 10px;
        background-color: hsl(235, 24%, 19%);
    }

    .box-light-mode-new {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 90%;
        height: 30px;
        padding: 5px;
        border-radius: 10px;
        background-color: white;
    }

    .circle {
        width: 15px;
        height: 15px;
        border: black 2px solid;
        border-radius: 50%;
    }

    .dark-mode-new {
        width: 90%;
        height: 20px;
        border: none;
        background-color: hsl(235, 24%, 19%);
        margin-left: 3%;
    }

    .light-mode-new {
        width: 90%;
        height: 20px;
        border: none;
        margin-left: 3%;
    }

    @media(min-width:500px) {
        .box-dark-mode-new{
            height:40px;
        }

        .box-light-mode-new{
            height: 40px;
        }

        .circle {
            margin-left: 1%;
        }

        .dark-mode-new{
            height: 30px;
        }

        .light-mode-new {
            height: 30px;
        }
    }
</style>