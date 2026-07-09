import {
    deleteGroceryItem,
    setGroceryItemPurchased,
    updateGroceryItemQuantity,
} from "@/lib/server/db-actions";

// Helper function to extract ID from URL path
function getIdFromUrl(request: Request): string | null {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/").filter(Boolean);
  // The ID should be the last segment in /api/items/[id]
  return pathSegments[pathSegments.length - 1] || null;
}

export async function DELETE(request: Request) {
  try {
    const id = getIdFromUrl(request);

    if (!id) {
      return Response.json({ error: "Item ID is required" }, { status: 400 });
    }

    await deleteGroceryItem(id);
    return Response.json(
      { message: "Item deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete item";

    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const id = getIdFromUrl(request);

    if (!id) {
      return Response.json({ error: "Item ID is required" }, { status: 400 });
    }

    const body = await request.json();

    if (body.quantity === undefined) {
      return Response.json({ error: "quantity is required" }, { status: 400 });
    }

    const item = await updateGroceryItemQuantity(id, body.quantity);

    if (!item) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    return Response.json({ item }, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update quantity";

    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const id = getIdFromUrl(request);

    if (!id) {
      return Response.json({ error: "Item ID is required" }, { status: 400 });
    }

    const body = await request.json();

    if (body.purchased === undefined) {
      return Response.json({ error: "purchased is required" }, { status: 400 });
    }

    const item = await setGroceryItemPurchased(id, body.purchased);

    if (!item) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    return Response.json({ item }, { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to toggle purchased";

    return Response.json({ error: message }, { status: 500 });
  }
}
