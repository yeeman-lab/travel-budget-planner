<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { reactive } from "vue";
import { computed } from "vue";

import { store } from "../store.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

// Computed property to calculate total expenses by category
const expensesByCategory = computed(() => {
  const categoryTotals = {};

  // Summing up expenses for each category
  store.items.forEach((item) => {
    item.expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });
  });

  return categoryTotals;
});

// Chart data and configuration
const data = computed(() => ({
  labels: ["Transportation", "Accommodation", "Food and Drink", "Entertainment"],
  datasets: [
    {
      label: "Expenses by Category",
      data: [expensesByCategory.value["transportation"] || 0, expensesByCategory.value["accommodation"] || 0, expensesByCategory.value["foodAndDrink"] || 0, expensesByCategory.value["entertainment"] || 0],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(176, 224, 162)"],
      hoverOffset: 4,
    },
  ],
}));

// Chart options
const options = reactive({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
  maintainAspectRatio: false,
});
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>
