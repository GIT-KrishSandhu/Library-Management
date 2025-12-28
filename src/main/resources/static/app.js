const API = "http://localhost:8081/books";

function loadBooks() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#bookTable tbody");
      tbody.innerHTML = "";
      data.forEach(b => {
        tbody.innerHTML += `
          <tr>
            <td>${b.bookId}</td>
            <td>${b.name}</td>
            <td>${b.author}</td>
            <td>
              <button onclick="deleteBook(${b.bookId})">Delete</button>
              <button onclick="updateBook(${b.bookId})">Update</button>
            </td>
          </tr>`;
      });
    });
}

function addBook() {
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookId: document.getElementById("id").value,
      name: document.getElementById("name").value,
      author: document.getElementById("author").value
    })
  }).then(loadBooks);
}

function deleteBook(id) {
  fetch(`${API}/${id}`, { method: "DELETE" })
    .then(loadBooks);
}

function updateBook(id) {
  const newName = prompt("New title:");
  const newAuthor = prompt("New author:");

  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, author: newAuthor })
  }).then(loadBooks);
}

loadBooks();
