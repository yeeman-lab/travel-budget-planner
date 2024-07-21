import { reactive } from "vue";

// Function to load items from localStorage
const loadState = () => {
  const storedItems = localStorage.getItem("items");
  return storedItems ? JSON.parse(storedItems) : [];
};

// Initialize items with data from localStorage
export const store = reactive({
  items: loadState(),
});

// Function to save items to localStorage
export const saveState = () => {
  localStorage.setItem("items", JSON.stringify(store.items));
};
