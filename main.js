let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function(){
      return `
        Title: ${this.title}
        Author: ${this.author}
        Pages: ${this.pages}
        Read: ${this.read}
      `
    }
}

Book.prototype.btnToggleStatus = function() {
    this.read = !this.read;
    let book = document.querySelector(`.card[data-book-index="${myLibrary.indexOf(this)}"]`);
    book.classList.toggle('success');
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function showBooks() {
    let shBooks = document.getElementsByClassName("card-container")[0];
    shBooks.innerHTML = '';
    let indx = 0;
    myLibrary.forEach(book => {
        const card = createCard(book, indx);
        parent.innerHTML += card;
        indx++;
    })
}

// This build a new card that contains information from new book form (here is where will display)
function createCard(book, indx) {
    emptyBook(book);
    const newCard = 
    `
      <div class="card text-center" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <span class="card-text">by ${book.author}</span>
          <p class="card-text">${book.pages}</p>
          <hr>
          <input type="checkbox" class="btnToggleStatus" ${book.read}>
          <span class="switchLabel">I have read this book</span>
          <a href="#" class="btn btn-danger delBook"> Delete </a>
        </div>
      </div>
    `;
    return newCard;
}

// This is a form to fill in the card when you leave the form in blank
function emptyBook(book) {
  if (book.title.trim().length === 0) {
      book.title = " NO NAME ";
  }

  if (book.author.trim().length === 0) {
      book.author = " NO AUTHOR ";
  }

  if(book.read){
      book.read = "checked";
  } else {
      book.read = "";
  }
  return book;
}

function hasClass(elem, className) {
    return elem.classList.contains(className);
}

window.addEventListener("click", function(e) {
    if(hasClass(e.target, "delBook") || hasClass(e.target, "btnToggleStatus")) {
        let card;
        let bookIndex;

        if (hasClass(e.target, "btnToggleStatus")) {
            card = e.target.parentNode.parentNode.parentNode;
            bookIndex = card.dataset.bookIndex;
            const book = myLibrary[bookIndex];
            book.btnToggleStatus;
        } else {
          card = e.target.parentNode.parentNode;
          bookIndex = card.dataset.bookIndex;
          myLibrary.splice(bookIndex, 1);
        }
        showBooks();
        e.preventDefault();
    
    } else if (hasClass(e.target, "modal")) {
      modals.forEach(function(elem) {
          elem.classList.add("hide");
      })
      e.preventDefault();
    }
});

const newBook = document.getElementById("newBook");
const bookForm = document.getElementsByClassName("form-container")[0];
const btnSubmit = document.getElementById("btnSubmit");

newBook.onclick = function() {
    bookForm.classList.add("pullToBottom");
    bookForm.classList.remove("hide");
}

btnSubmit.onclick = function() {
    let bookTitle = document.getElementById("bookTitle");
    let bookAuthor = document.getElementById("bookAuthor");
    let numberOfPages = document.getElementById("numberOfPages");
    let readIt = document.getElementById("readIt");

    newBook = new Book(bookTitle.value, bookAuthor.value, numberOfPages.value, readIt.value);
    addBookToLibrary(newBook);
    showBooks(newBook);
    let newBookForm = document.getElementById("newBookForm").reset();
    bookForm.classList.add("hide");
}
