let myLibrary = [];
const bookFormSubmit = document.querySelector(".submit");
const bookChart = document.getElementById("book-chart");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  return [title, author, pages, read];
}

function makeTable() {
  for (let i = 0; i < myLibrary.length; i++) {
    for (let j = 0; j < myLibrary[i].length; j++) {
      let newCell = document.createElement("div");
      let content = document.createTextNode(myLibrary[i][j]);
      newCell.append(content);
      bookChart.append(newCell);
    }
  }
}

function bookAdd(book) {
  function deleteRow(e) {
    e.target.parentElement.remove();
  }
  let bool = book[3];
  let bookRow = document.createElement("div");
  let toggleBtn = document.createElement("button");
  toggleBtn.setAttribute("class", "toggle-btn");
  toggleBtn.textContent = "Toggle";
  toggleBtn.addEventListener("click", (e) => {
    if (bool === true) {
      bool = false;
      e.target.parentElement.textContent = "No";
    } else if (bool === false) {
      bool = true;
      e.target.parentElement.textContent = "Yes";
    }
    bookRow.children[3].append(toggleBtn);
  });

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("class", "del-btn");
  deleteButton.setAttribute("type", "button");
  deleteButton.addEventListener("click", (e) => {
    deleteRow(e);
  });

  for (let i = 0; i < book.length; i++) {
    let newCell = document.createElement("div");
    let content = document.createTextNode(book[i]);
    if (i === 3) {
      if (bool === true) {
        content.textContent = "Yes";
      } else {
        content.textContent = "No";
      }
    }
    newCell.append(content);
    bookRow.append(newCell);
  }
  bookRow.append(deleteButton);
  bookRow.children[3].append(toggleBtn);
  bookChart.append(bookRow);
}

function clearFields() {
  document.getElementById("author").value = "";
  document.getElementById("title").value = "";
  document.getElementById("page-count").value = null;
  document.getElementById("read").checked = false;
}

makeTable();

bookFormSubmit.addEventListener("click", () => {
  let author = document.getElementById("author").value;
  let title = document.getElementById("title").value;
  let pages = document.getElementById("page-count").value;
  let read = document.getElementById("read").checked;
  if (author !== "" && title !== "" && pages !== null) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    bookAdd(newBook);
    clearFields();
  } else {
    alert("Please enter required fields");
  }
});
