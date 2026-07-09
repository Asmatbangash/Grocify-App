import { desc, eq } from "drizzle-orm";
import { db } from "./db/client";
import { groceryItems } from "./db/schema";

export const ListOfGroceryItems = async () => {
  const rows = await db
    .select()
    .from(groceryItems)
    .orderBy(desc(groceryItems.updated_at));
  return rows;
};

export const AddGroceryItem = async (input: {
  name: string;
  category: string;
  quantity: number;
  priority: string;
}) => {
  const rows = await db
    .insert(groceryItems)
    .values({
      id: crypto.randomUUID(),
      name: input.name,
      category: input.category,
      quantity: input.quantity,
      priority: input.priority,
      updated_at: Date.now(),
    })
    .returning();
  return rows[0];
};

export const setGroceryItemPurchased = async (
  id: string,
  purchased: boolean,
) => {
  const rows = await db
    .update(groceryItems)
    .set({ purchased, updated_at: Date.now() })
    .where(eq(groceryItems.id, id))
    .returning();
  return rows[0];
};

export const updateGroceryItemQuantity = async (
  id: string,
  quantity: number,
) => {
  const rows = await db
    .update(groceryItems)
    .set({
      quantity: Math.max(1, Math.floor(quantity)),
      updated_at: Date.now(),
    })
    .where(eq(groceryItems.id, id))
    .returning();

  if (!rows.length) return null;
  return rows[0];
};

export const deleteGroceryItem = async (id: string) => {
  const result = await db
    .delete(groceryItems)
    .where(eq(groceryItems.id, id))
    .returning();

  if (result.length === 0) {
    throw new Error(`Item with id ${id} not found`);
  }

  return result[0];
};

export const clearPurchasedItem = async () => {
  await db.delete(groceryItems).where(eq(groceryItems.purchased, true));
};
