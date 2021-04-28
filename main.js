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

function addBookToLibrary(book){
  myLibrary.push(book);
}