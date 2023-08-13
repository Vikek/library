let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

document.querySelector(".form-book-info").addEventListener("submit", function(e) {
    const book = Object.fromEntries(new FormData(e.target).entries());
    addBookToLibrary(book.title, book.author, book.pages, book.read);
    
    toggleForm();
    e.target.reset();
    e.preventDefault();
});

document.querySelector(".add-book-btn").addEventListener("click", function() {
    toggleForm();
});

function toggleForm() {
    let form = document.querySelector(".popup-form");
    form.classList.toggle("active");
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
    displayBook(book);
}

function displayBook(book) {
    const libraryContainer = document.querySelector(".library-container");

    const title = document.createElement("div");
    title.textContent = `Title: ${book.title}`;

    const author = document.createElement("div");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("div");
    pages.textContent = `Pages: ${book.pages}`;

    const read = document.createElement("div");
    if(book.read) {
        read.textContent = `Read: √`;
    } else read.textContent = `Read: x`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-book-btn");

    const bookContainer = document.createElement("div");
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(read);
    bookContainer.appendChild(removeBtn);

    libraryContainer.appendChild(bookContainer);

    document.querySelector(".remove-book-btn").addEventListener("click", function(e) {
        e.target.parentNode.remove();
    });
}