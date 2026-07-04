import { create } from "zustand";

export type GroceryCategory =
  | "Produce"
  | "Dairy"
  | "Bakery"
  | "Pantry"
  | "Snacks";
export type GroceryPriority = "low" | "medium" | "high";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};

type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = { item: GroceryItem };

type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/items");
      const payload: ItemsResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to load items");
      }

      set({ items: payload.items, isLoading: false });
    } catch (error) {
      console.error("Error loading items:", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (input) => {
    set({ error: null });
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          category: input.category,
          quantity: Math.max(1, input.quantity),
          priority: input.priority,
        }),
      });
      const payload: ItemResponse = await response.json();
      set({ items: [...get().items, payload.item] });
      return payload.item;
    } catch (error) {
      console.error("Error adding item:", error);
      set({ error: "Something went wrong" });
    }
  },

  updateQuantity: async (id, quantity) => {
    set({ error: null });
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      const payload: ItemResponse = await response.json();
      set({
        items: get().items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      set({ error: "Something went wrong" });
    }
  },
  togglePurchased: async (id) => {
    set({ error: null });
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purchased: !get().items.find((item) => item.id === id)?.purchased,
        }),
      });
      const payload: ItemResponse = await response.json();
      set({
        items: get().items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      });
    } catch (error) {
      console.error("Error toggling purchased:", error);
      set({ error: "Something went wrong" });
    }
  },
  deleteItem: async (id) => {
    set({ error: null });
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      set({ items: get().items.filter((item) => item.id !== id) });
    } catch (error) {
      console.error("Error deleting item:", error);
      set({ error: "Something went wrong" });
    }
  },
  clearPurchased: async () => {
    set({ error: null });
    try {
      const response = await fetch("/api/items", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purchased: true }),
      });
      if (!response.ok) {
        throw new Error("Failed to clear purchased items");
      }
      set({ items: get().items.filter((item) => !item.purchased) });
    } catch (error) {
      console.error("Error clearing purchased items:", error);
      set({ error: "Something went wrong" });
    }
  },
}));
