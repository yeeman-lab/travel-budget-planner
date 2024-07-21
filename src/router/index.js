import { createRouter, createWebHistory } from "vue-router";

// Importing components that will be used as views for the routes
import HomeView from "../views/HomeView.vue";
import CategoryExpenses from "../views/CategoryExpenses.vue";
import AddExpense from "@/views/AddExpense.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView, // Component to render when the user navigates to the home page
    },
    {
      path: "/category",
      name: "category",
      component: CategoryExpenses, // Component to render for the category expenses page
    },
    {
      path: "/add-expense",
      name: "add-expense",
      component: AddExpense, // Component to render for the add expense page
    },
  ],
});

export default router;
