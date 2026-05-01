import { createItem, getItemById, updateItem } from "./api.js";

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const message = document.getElementById("form-message");
  const form = document.getElementById("item-form");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    try {
      const item = await getItemById(id);

      form.title.value = item.title;
      form.category.value = item.category;
      form.price.value = item.price;
      form.description.value = item.description;
    } catch (error) {
      message.textContent = "Помилка завантаження даних";
      message.style.color = "red";
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data.price = Number(data.price);

    if (!data.title || data.title.trim().length < 3) {
      message.textContent = "Назва має бути мінімум 3 символи";
      message.style.color = "red";
      return;
    }

    if (!data.category || data.category.trim() === "") {
      message.textContent = "Вкажіть категорію";
      message.style.color = "red";
      return;
    }

    if (isNaN(data.price) || data.price <= 0) {
      message.textContent = "Ціна повинна бути більше 0";
      message.style.color = "red";
      return;
    }

    if (!data.description || data.description.trim().length < 5) {
      message.textContent = "Опис має бути мінімум 5 символів";
      message.style.color = "red";
      return;
    }

    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Збереження...";

    try {
      if (id) {
        await updateItem(id, data);
        message.textContent = "Успішно оновлено!";
        message.style.color = "green";
      } else {
        await createItem(data);
        message.textContent = "Успішно створено!";
        message.style.color = "green";
      }

      setTimeout(() => {
        window.location.href = "catalog.html";
      }, 700);

    } catch (error) {
      console.error(error);
      message.textContent = "Помилка при збереженні";
      message.style.color = "red";
    }

    button.disabled = false;
    button.textContent = id ? "Оновити" : "Створити";
  });
}