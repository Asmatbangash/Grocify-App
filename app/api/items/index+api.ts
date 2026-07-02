import { AddGroceryItem, ListOfGroceryItems } from "@/lib/server/db-actions";

export async function GET() {
  try {
    const items = await ListOfGroceryItems();

    return Response.json({ items });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch items";

    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, quantity, priority } = body;

    if (!name || !category || !priority) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newItem = await AddGroceryItem({
      name,
      category,
      quantity,
      priority,
    });
    return Response.json({ item: newItem }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add item";

    return Response.json({ error: message }, { status: 500 });
  }
}
