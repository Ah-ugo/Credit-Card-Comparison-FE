"use server";

const API_BASE_URL = "https://credit-card-comparison-be.onrender.com";

// Function to search cards based on natural language query
export async function searchCards(query: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching cards:", error);
    throw new Error("Failed to search cards");
  }
}

// Function to get all cards
export async function getAllCards() {
  try {
    const response = await fetch(`${API_BASE_URL}/cards`, {
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
}

// Function to get a specific card
export async function getCard(cardId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/cards/${cardId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching card:", error);
    throw new Error("Failed to fetch card");
  }
}

// Function to compare two cards
export async function compareCards(card1Id: string, card2Id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/compare`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card1_id: card1Id,
        card2_id: card2Id,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error comparing cards:", error);
    throw new Error("Failed to compare cards");
  }
}

// Function to add a new card (admin function)
export async function addCard(cardData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding card:", error);
    throw new Error("Failed to add card");
  }
}

// Function to update a card (admin function)
export async function updateCard(cardId: string, cardData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating card:", error);
    throw new Error("Failed to update card");
  }
}

// Function to delete a card (admin function)
export async function deleteCard(cardId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting card:", error);
    throw new Error("Failed to delete card");
  }
}
