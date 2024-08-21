<template>
    <main :class="{'filter-component-dark': darkMode,'filter-component-light':!darkMode}">
        <p :class="{'active-filter': filter === 'all'}" @click="setFilter('all')" class="filter-word">All</p>
        <p :class="{'active-filter': filter === 'active'}" @click="setFilter('active')" class="filter-word">Active</p>
        <p :class="{'active-filter': filter === 'completed'}" @click="setFilter('completed')" class="filter-word">Completed</p>
    </main>
</template>

<script setup>
    import { defineProps,defineEmits,ref,watch } from 'vue';

    const props = defineProps({
        filter:String,
        darkMode:Boolean,
    })

    const emit = defineEmits(["changeFilter"]);
    const currentFilter = ref(props.filter);

    //Watches the changes for the propfilter and changes the current filter
    watch(() => props.filter,(newFilter)=> {
        currentFilter.value = newFilter;
    })

    //Changes the filter 
    const setFilter = (newFilter) => {
        if(props.filter != newFilter) {
            currentFilter.value = newFilter;
            emit('changeFilter',newFilter);
        }
    }
</script>

<style>
    .filter-component-dark {
        width: 90%;
        height: 40px;
        margin-top: 5%;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        padding: 5px;
        background-color: hsl(235, 24%, 19%);
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    }

    .filter-component-light {
        width: 90%;
        height: 40px;
        margin-top: 5%;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        padding: 5px;
        background-color: white;   
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    }

    .filter-word {
        font-size: 20px;
        font-weight: 700;
        color: hsl(236, 9%, 61%);
        margin-right: 5%;
    }

    .active-filter {
        color: hsl(220, 98%, 61%);
    }
</style>