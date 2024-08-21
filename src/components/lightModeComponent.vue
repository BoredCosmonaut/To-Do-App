<template>
    <main class="theme-main">
        <img v-if="darkMode" src="../../public/images/icon-sun.svg" alt="" class="theme-logo" @click="toggleTheme">
        <img v-else src="../../public/images/icon-moon.svg" alt="" class="theme-logo" @click="toggleTheme">
    </main>
</template>

<script setup>
    import { defineEmits,ref } from 'vue';

    const darkMode = ref(true);
    const emit = defineEmits(["toggleTheme"]);

    const toggleTheme = () => {
        darkMode.value = !darkMode.value;
        emit("toggleTheme",darkMode.value);
    }
</script>

<style scoped>
    .theme-logo {
        width: 25px;
        height: 25px;
        position: relative;
        left: 370px;  
    }
</style>