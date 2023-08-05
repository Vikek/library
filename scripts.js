let library = [];

addBookToLibrary();
displayBooks(library);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

document.querySelector(".add-book-btn").addEventListener("click", function() {
    let form = document.querySelector(".popup-form");
    form.classList.toggle("active");
});

function addBookToLibrary() {
    const book = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
    const book1 = new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, false);
    const book2 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
    library.push(book);
    library.push(book1);
    library.push(book2);
    console.log(library);
}

function displayBooks(library) {
    const libraryContainer = document.querySelector(".library-container");
    library.forEach( book => {
        const title = document.createElement("div");
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement("div");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("div");
        pages.textContent = `Pages: ${book.pages}`;

        const bookContainer = document.createElement("div");
        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pages);

        libraryContainer.appendChild(bookContainer);
    });
}