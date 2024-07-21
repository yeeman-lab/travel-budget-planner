<script setup>
import { ref } from "vue";
import ExpensesList from "./ExpensesList.vue";
import { useToast } from "vue-toastification";
import { mdiCloseThick } from "@mdi/js";

// Get toast interface for showing notifications
const toast = useToast();

const dialog = ref(false);

// Defining props to receive data from the parent component
const props = defineProps(["item"]);

// Defining events that this component can emit to the parent component
const emit = defineEmits(["submitDeleteDate"]);

// Function to emit delete event with the item's ID
const submitDelete = (id) => {
  emit("submitDeleteDate", id);
  dialog.value = false;
};

// Function to handle deletion of an individual expense
const handleDeleteExpense = (id) => {
  props.item.expenses = props.item.expenses.filter((expense) => expense.id !== id);

  if (props.item.expenses.length === 0) {
    submitDelete(props.item.id);
  } else {
    toast.success("Expense deleted.");
  }
};
</script>

<template>
  <div class="date-header">
    <p class="date">{{ new Date(item.date).toDateString() }}</p>
    <button class="delete-date-btn" @click="dialog = true"><v-icon :icon="mdiCloseThick" /></button>
    <v-dialog v-model="dialog" width="auto">
      <v-card class="dialog-card">
        <v-card-title class="dialog-title">
          Delete all expenses for
          <br />
          {{ new Date(item.date).toDateString() }}
        </v-card-title>
        <v-card-text class="dialog-text">Are you sure you want to delete?</v-card-text>
        <button class="dialog-button" @click="submitDelete(item.id)">DELETE</button>
        <button class="dialog-button" @click="dialog = false">CANCEL</button>
      </v-card>
    </v-dialog>
  </div>
  <ExpensesList v-for="expense in item.expenses" :key="expense.id" :expense="expense" @deletExpense="handleDeleteExpense" />
</template>
