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
    removeBtn.classList.add("remove-book-btn");

    const removeBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    removeBtnSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    removeBtnSvg.setAttribute("viewBox", "0 0 24 24");
    removeBtnSvg.innerHTML = '<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />';
    removeBtn.appendChild(removeBtnSvg);

    const bookContainer = document.createElement("div");
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(read);
    bookContainer.appendChild(removeBtn);

    libraryContainer.appendChild(bookContainer);

    document.querySelectorAll(".remove-book-btn").forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            e.target.parentNode.remove();
        });
    });
}