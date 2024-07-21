<script setup>
import { ref, watch, computed } from "vue";
import { store, saveState } from "../store.js";
import { useToast } from "vue-toastification";

// Reactive variables for form fields
const date = ref("");
const description = ref("");
const amount = ref("");
const category = ref("");

const maxChar = 50;

// Get toast interface
const toast = useToast();

// Watcher to check and limit the character count for description input
watch(description, (newValue) => {
  if (newValue.length > maxChar) {
    // If exceeds character limit, truncate the description
    description.value = newValue.slice(0, maxChar);
  }
});

// Function to handle form submission
const handleSubmit = () => {
  // Creating a new expense object
  const expense = {
    id: Date.now(), // unique id
    amount: parseFloat(amount.value),
    description: description.value,
    category: category.value,
  };

  // Checking if there's already an item for the selected date
  const existingItem = store.items.find((item) => new Date(item.date).getTime() === new Date(date.value).getTime());

  // If item exists, add expense to existing item's expenses array; otherwise, create a new item
  if (existingItem) {
    existingItem.expenses.push(expense);
  } else {
    store.items.push({
      id: Date.now(), // Unique id
      date: new Date(date.value),
      expenses: [expense], // Creating a new expenses array with the expense
    });
  }

  // Save the updated state to the store
  saveState();
  toast.success("Successfully added to expenses list.");

  // Reset form fields after submission
  date.value = "";
  description.value = "";
  amount.value = "";
  category.value = "";
};
</script>

<template>
  <form class="add-expense-form" @submit.prevent="handleSubmit">
    <div>
      <label for="date">Date:</label>
      <input type="date" v-model="date" required />
    </div>
    <div>
      <label for="description">Description (name of hotel, restaurant, event, etc.):</label>
      <input type="text" v-model="description" maxlength="50" required />
    </div>
    <div>
      <label for="amount">Amount:</label>
      <input type="number" step="0.01" min="0.01" v-model="amount" required />
    </div>
    <div>
      <label for="category">Category:</label>
      <select v-model="category" required>
        <option value="accommodation">Accommodation</option>
        <option value="foodAndDrink">Food and Drink</option>
        <option value="transportation">Transportation</option>
        <option value="entertainment">Entertainment</option>
      </select>
    </div>
    <button type="submit">Add Expense</button>
  </form>
</template>
