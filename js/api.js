const API_URL = "http://localhost:3000/items";


export async function getItems() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Помилка завантаження списку");
  }

  return response.json();
}


export async function getItemById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Помилка завантаження елемента");
  }

  return response.json();
}


export async function createItem(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Помилка створення");
  }

  return response.json();
}


export async function updateItem(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Помилка оновлення");
  }

  return response.json();
}


export async function deleteItem(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Помилка видалення");
  }
}
