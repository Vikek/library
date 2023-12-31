let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const author = document.getElementById("author");
const authorError = document.querySelector("#author + span.error");
author.addEventListener("input", () => showAuthorError());

const title = document.getElementById("title");
const titleError = document.querySelector("#title + span.error");
title.addEventListener("input", () => showTitleError());

document.querySelector(".form-book-info").addEventListener("submit", function(e) {
    if (!author.validity.valid) {
        showAuthorError();
        e.preventDefault();
        return;
    }

    if (!title.validity.valid) {
        showTitleError();
        e.preventDefault();
        return;
    }
    
    const book = Object.fromEntries(new FormData(e.target).entries());

    if (book.read = "on") book.read = true;
    else book.read = false;

    addBookToLibrary(book.title, book.author, book.pages, book.read);
    
    toggleForm();
    e.target.reset();
    e.preventDefault();
});

document.querySelector(".add-book-btn").addEventListener("click", function() {
    toggleForm();
});

function showAuthorError() {
    if (author.validity.valid) {
        authorError.textContent = "";
    }

    if (author.validity.valueMissing) {
        authorError.textContent = "Please enter the authors name";
    } else if (author.validity.patternMismatch) {
        authorError.textContent = "Please enter a valid name";
    }
}

function showTitleError() {
    if (title.validity.valid) {
        titleError.textContent = "";
    }

    if (title.validity.valueMissing) {
        titleError.textContent = "Please enter the title";
    } else if (title.validity.patternMismatch) {
        titleError.textContent = "Please enter a valid title";
    }
}

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
    title.classList.add("title");

    const author = document.createElement("div");
    author.textContent = `Author: ${book.author}`;
    author.classList.add("author");

    const pages = document.createElement("div");
    pages.textContent = `Pages: ${book.pages}`;
    pages.classList.add("pages")

    const read = document.createElement("div");
    read.textContent = `Mark as read`;
    read.classList.add("read");
    const toggleReadSwitch = createToggleReadSwitch(book.read);
    read.appendChild(toggleReadSwitch);

    const removeBtn = createRemoveBookButton();

    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(read);
    bookContainer.appendChild(removeBtn);
    bookContainer.id = book.title;

    libraryContainer.appendChild(bookContainer);

    document.querySelectorAll(".remove-book-btn").forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            for (let i = 0; i < library.length; i++) {
                if (library[i].title === e.target.parentNode.id) {
                    library.splice(i, 1);
                }
            }
            e.target.parentNode.remove();
        });
    });

    document.querySelectorAll(".read-switch").forEach(function(btn) {
        btn.addEventListener("change", function(e) {
            for (let i = 0; i < library.length; i++) {
                if (library[i].title === e.target.closest(".book").id) {
                    library[i].read = e.target.checked;
                }
            }
        });
    });
}

function createRemoveBookButton() {
    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-book-btn");

    let removeBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    removeBtnSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    removeBtnSvg.setAttribute("viewBox", "0 0 24 24");
    removeBtnSvg.innerHTML = '<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />';
    removeBtn.appendChild(removeBtnSvg);

    return removeBtn;
}

function createToggleReadSwitch(read) {
    let toggleSwitch = document.createElement("label");
    toggleSwitch.classList.add("switch");

    let input = document.createElement("input");
    input.classList.add("read-switch");
    input.type = "checkbox";
    input.checked = read;

    let slider = document.createElement("span");
    slider.classList.add("slider");

    toggleSwitch.appendChild(input);
    toggleSwitch.appendChild(slider);

    return toggleSwitch;
}