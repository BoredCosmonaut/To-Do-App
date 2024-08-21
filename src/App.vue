<template>
  <main :class="{'dark-mode': darkMode,'light-mode':!darkMode}" class="main-part">
    <section :class="{'top-dark':darkMode,'top-light':!darkMode}">
      <h2 class="to-do-title">T O D O</h2>
      <themeButton class="theme-button-app" :darkMode="darkMode.value" @toggleTheme="changeTheme"/>
    </section>
    <section class="todo-parts">
      <newTodo :darkMode="darkMode" class="new-app" @addTodo="addTodo" /> 
      <todo :todos="filteredTodos"  :darkMode="darkMode" :completedTodoAmount="completedTodoAmount" @clearCompleted="clearCompleted" @deleteTodo="deleteTodo" @completeTodo="completeTodo" class="todos-container" />
      <filterComponent :filter="currentFilter" :darkMode="darkMode" @changeFilter="updateFilter"/>
    </section>
  </main>
</template>

<script setup>
  import axios from 'axios';
  import themeButton from './components/lightModeComponent.vue';
  import newTodo from './components/newDoComponent.vue';
  import todo from './components/todoComponent.vue';
  import filterComponent from './components/filterComponent.vue';
  import { ref,onMounted,computed,onUnmounted } from 'vue';

  //Variables 
  const darkMode = ref(true);
  const todos = ref([]);
  let currentFilter = ref("all");
  const completedTodoAmount = ref();
  const screenWidth = ref(window.innerWidth);

  const updateWidth = () => {
    screenWidth.value = window.innerWidth;
  }
//We send the filtered todos depending on the filtered version
  const filteredTodos = computed(() => {
    if(currentFilter.value == "all") {
      return todos.value;
    } else if (currentFilter.value == "active") {
      console.log(todos.value)
      return todos.value.filter(todo => !todo.completed);
    } else if (currentFilter.value == "completed") {
      return todos.value.filter(todo => todo.completed);
    }
  })

  //Emit function that comes from the filtered component
  const updateFilter = (newFilter) => {
    currentFilter.value = newFilter;
  }

//API FUNCTIONS
//Gets all the todos
  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3000/api/todos');
    todos.value = response.data;
    //Get the completed item amount
    completedTodoAmount.value = todos.value.filter(todo => !todo.completed).length;
  }
//This function clears all the completed todos
  const clearCompleted = async () => {
      if(todos.value.some(todo => todo.completed)) {
          try {
              console.log("hello"); // This should appear in the browser console
              //This sends a delete request to delete evvery completed todo
              await axios.delete('http://localhost:3000/api/todos/delete', {
              data: { completed: true }
              });
              //Refresh the todos
              fetchTodos();
          } catch (error) {
              console.error('Error during delete request:', error); // Logs any error in the browser console
          }
      } else {
          window.alert("There is no completed To-do to delete!")
      }
  }

//This deletes the todo based on its id
  const deleteTodo =async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/delete/${id}`)
      fetchTodos();
    } catch (error) {
      console.log("Error while deleting:",error);
    }
  }

//Updates the todo to be completed
  const completeTodo = async(id) => {
    try {
      console.log("Updating a todo:",id);
      await axios.patch(`http://localhost:3000/api/todos/update/${id}`);
      fetchTodos();
    } catch (error) {
      console.log("Error while updating:",error)
    }
  }

  const addTodo = async(newTodoText) => {
    try {
      await axios.post('http://localhost:3000/api/todos/new',{
      todo:newTodoText
      });
      fetchTodos();
    } catch(error) {
      console.log("Error while adding a todo:",error);
    }
  }

  //Changes the theme of page
  const changeTheme = (newValue) => {
    darkMode.value = newValue;
  }

  //Gets all of our data before mounting
  onMounted(async () => {
    fetchTodos();
    window.addEventListener("resize",updateWidth);
  })

  onUnmounted(() => {
    window.removeEventListener("resize",updateWidth);
  })
</script>

<style scoped>

  .main-part {
    width: 500px;
    padding-bottom: 50%;
    overflow: hidden;
  }

  .dark-mode {
    width: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: hsl(235, 21%, 11%);
  }

  .light-mode {
    width: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: hsl(0, 0%, 98%); 
  }

  .top-dark {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-image: url("../public/images/bg-mobile-dark.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    height: 200px;
  }

  .top-light {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-image: url("../public/images/bg-mobile-light.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    height: 200px;
  }

  .to-do-title {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 13%;
    position: relative;
    left: 5%;
    color: white;
  }

  .theme-button-app {
    position: relative;
    right:3%;
    margin-bottom: 12%;
  }

  .todo-parts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .new-app {
    margin-top: -15%;
  }

  .todos-container {
    margin-top: 5%;
  }

  @media(min-width:500px){

    .main-part {
      display: flex;
      width: 100%;
      padding-bottom: 50%;
      overflow: hidden;
    }

    .dark-mode {
      width: 100%;
    }

    .light-mode{
      width: 100%;
    }

    .top-dark {
      width: 100%;
      height: auto;
      background-image: url("../public/images/bg-desktop-dark.jpg");
      align-items: center;
      justify-content:center;
      
    }

    .top-light {
      width: 100%;
      height: auto;
      background-image: url("../public/images/bg-desktop-light.jpg");
    }

    .to-do-title {
      margin-left: 22%;
      font-size: 30px;
      margin-top: 2%;
    }

    .theme-button-app {
      left: 16%;
      margin-right: auto;
    }

    .todo-parts {
      width: 50%;
      align-self: center;
    }

  }
</style>
