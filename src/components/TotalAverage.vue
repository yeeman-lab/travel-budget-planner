<script setup>
import { computed } from "vue";
import { store } from "../store.js";

// Computed property to calculate the total amount of all expenses
const totalAmount = computed(() => {
  return store.items
    .reduce((total, item) => {
      return (
        total +
        item.expenses.reduce((sum, expense) => {
          return sum + expense.amount;
        }, 0)
      );
    }, 0)
    .toFixed(2); // Returning the total amount formatted to 2 decimal places
});

// Computed property to calculate the daily average expense
const dailyAverage = computed(() => {
  const numberofDays = store.items.length;
  return numberofDays ? Math.floor(totalAmount.value / numberofDays) : 0;
});
</script>

<template>
  <div class="header">
    <!-- Total amount section -->
    <div class="total">
      <p>TOTAL</p>
      <p class="amount">£{{ totalAmount }}</p>
    </div>
    <!-- Daily average amount section -->
    <div class="daily-average">
      <p>DAILY AVERAGE</p>
      <p class="amount">£{{ dailyAverage }}</p>
    </div>
  </div>
</template>
