//Book class to instantiate books from
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI class for displaying everything in the Screen
class UI {
  static displayBooks() {
    // const storedBooks = [
    //   { title: "Book One", author: "jane Dane", isbn: "1" },
    //   { title: "Book Two", author: "Jony dane", isbn: "2" },
    // ];
    const books = Storage.getBooks();
    books.forEach((book) => UI.addBookToTable(book));
  }
  static addBookToTable(book) {
    let tableBody = `<tr>
    <th>${book.title}</th>
    <th>${book.author}</th>
    <th>${book.isbn}</th>
    <th><h1 class="btn btn-danger btn-sm delete">X</h1></th>
</tr>`;
    document.getElementById("book-list").innerHTML += tableBody;
  }
  static clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
  static deleteBook(el) {
    if (el.textContent === "X") {
      el.parentElement.parentElement.remove();
      Storage.removeBook(el.parentElement.previousElementSibling.textContent);
      UI.showAlert("Book has been deleted", "success");
    }
  }
  static showAlert(message, color) {
    const div = document.createElement("div");
    div.className = `alert alert-${color}`;
    div.innerHTML = message;
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2500);
  }
}
// class for local storage to save books for later
class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Storage.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//events
document.addEventListener("load", UI.displayBooks());

document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const bTitle = document.getElementById("title").value;
  const bAuthor = document.getElementById("author").value;
  const bISBN = document.getElementById("isbn").value;
  if (bTitle === "" || bAuthor === "" || bISBN === "") {
    UI.showAlert("please fill all the fields", "danger");
  } else {
    const myBook = new Book(bTitle, bAuthor, bISBN);
    UI.addBookToTable(myBook);
    Storage.addBook(myBook);
    UI.showAlert("Book added successfully", "success");
    UI.clearForm();
  }
});
document.getElementById("book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});
