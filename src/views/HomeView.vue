<script setup>
import { watch } from "vue";
import ExpensesLists from "../components/ExpensesLists.vue";
import { store, saveState } from "../store.js";
import { useToast } from "vue-toastification";

// Get toast interface
const toast = useToast();

// Function to sort items by date and save the state
const sortItemsByDate = () => {
  store.items.sort((a, b) => new Date(a.date) - new Date(b.date));
  saveState();
};

// Watch for changes to the items array and sort it when it changes
watch(() => store.items, sortItemsByDate, { deep: true });

// Initial sort of the items when the component is created
sortItemsByDate();

// Function to handle deletion of an expense item by its ID
const handleDeleteDate = (id) => {
  store.items = store.items.filter((item) => item.id !== id);
  toast.success("Expenses deleted.");
};
</script>

<template>
  <!-- Message to show if there are no expense items -->
  <p v-if="store.items.length === 0">
    Planning a budget for your trip? Go to <router-link to="/add-expense"><button>Add Expense</button></router-link> to enter your expenses.
  </p>

  <!-- List of expense items -->
  <ExpensesLists v-for="item in store.items" :key="item.id" :item="item" @submitDeleteDate="handleDeleteDate" />
</template>
