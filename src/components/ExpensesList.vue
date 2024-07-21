<script setup>
import { computed, ref } from "vue";
import { mdiBed, mdiTrainCar, mdiFood, mdiTicket, mdiTrashCanOutline } from "@mdi/js";

const props = defineProps(["expense"]);
const emit = defineEmits(["deletExpense"]);

const dialog = ref(false);

// Function to emit delete event with the expense's ID
const submitDeleteExpense = (id) => {
  emit("deletExpense", id);
  dialog.value = false;
};

// Computed property to get the appropriate icon based on the expense category
const categoryIcon = computed(() => {
  switch (props.expense.category) {
    case "accommodation":
      return mdiBed;
    case "transportation":
      return mdiTrainCar;
    case "foodAndDrink":
      return mdiFood;
    case "entertainment":
      return mdiTicket;
    default:
      return "";
  }
});
</script>

<template>
  <div class="expense-item">
    <v-icon :icon="categoryIcon" size="large" />
    <div class="expense-info">
      <p>£{{ expense.amount }}</p>
      <p>{{ expense.description }}</p>
    </div>
    <button class="delete-btn" @click="dialog = true"><v-icon :icon="mdiTrashCanOutline" /></button>
    <v-dialog v-model="dialog" width="auto">
      <v-card class="dialog-card">
        <v-card-title class="dialog-title"> Delete expense item - <br />{{ expense.description }} </v-card-title>
        <v-card-text class="dialog-text">Are you sure you want to delete?</v-card-text>
        <button class="dialog-button" @click="submitDeleteExpense(expense.id)">DELETE</button>
        <button class="dialog-button" @click="dialog = false">CANCEL</button>
      </v-card>
    </v-dialog>
  </div>
</template>
