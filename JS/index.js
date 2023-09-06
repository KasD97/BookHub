
// DOM Elements
// Show and hide form
const form = document.querySelector(".form");
const titleInput = form.querySelector("#title");
const genreInput = form.querySelector("#genre");
const authorInput = form.querySelector("#author");
const pagesInput = form.querySelector("#pages");
const commentInput = form.querySelector("#comment");
const submitBtn = form.querySelector(".submit");
const body = document.querySelector(".display");
const returnBtn = document.querySelector(".return");
// Add new book button
const addBookBtn = document.querySelector(".add-book");
const table = document.querySelector("table");
const tableBody = table.querySelector("tbody");
// console.log(tableBody);

// STATS
const libraryStats = document.querySelector(".display-operations--stats");
const totalNum = libraryStats.querySelector(".total-num");
const readNum = libraryStats.querySelector(".read-num");
const unreadNum = libraryStats.querySelector(".unread-num");


// Create an empty library array
let myLibrary = [];

// Show stats
function showStats(){
    const booksRead = [];
    const booksUnread = [];

    myLibrary.forEach(bookData => {
        if (bookData.read === true){
            booksRead.push(bookData);
        }else{
            booksUnread.push(bookData);
        }
    })

    totalNum.textContent = myLibrary.length;
    readNum.textContent = booksRead.length;
    unreadNum.textContent = booksUnread.length;

}


// Create books prototype
function Book(title, genre, author, pages, comment, read){
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.pages = pages;
    this.comment = comment;
    this.read = read;
}


// Add new books to library
function addToLibrary(){
    let title = titleInput.value;
    let genre = genreInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let comment = commentInput.value;
    let read = getReadStatus();
    let newBook = new Book(title, genre, author, pages, comment, read);
    myLibrary.push(newBook)
}

// check if user has read book book or not --> true or false
function getReadStatus(){
    // Look for which option has been checked
    const checkedOption = form.querySelector("input[name='read']:checked").value;

    if (checkedOption === "yes"){
        return true;
    }else{
        return false;
    }
}

// Remove a book from my library
function deleteBook(index){
    myLibrary.splice(index, 1);
    updateTable(myLibrary);
}

// Clear previous entries from form
function clearForm(){
    titleInput.value = "";
    genreInput.value = "";
    authorInput.value = "";
    pagesInput.value = ""; 
    commentInput.value = "";
}

// event listener to hide and show display
addBookBtn.addEventListener("click", ()=>{
    
    toggleDisplay();
    // form.classList.toggle("hidden");
    // body.classList.toggle("hidden");
})

//SUBMIT button
submitBtn.addEventListener("click", ()=>{
    addToLibrary();
    toggleDisplay();
    // form.classList.add("hidden");
    // body.classList.remove("hidden");
    updateTable(myLibrary);
    clearForm();
    
})

//return button
returnBtn.addEventListener("click", ()=>{
    toggleDisplay();
    // form.classList.add("hidden");
    // body.classList.remove("hidden");
})

// toggle hidden elements
function toggleDisplay(){
    form.classList.toggle("hidden");
    body.classList.toggle("hidden");
}


// UPDATE TABLE

function updateTable(){
    tableBody.textContent = "";
    
    
    myLibrary.forEach((book, index) => {
        // create a new row in the table for each new book in myLibrary
        let bookRow = document.createElement("tr");
        Object.keys(book).forEach(key => {
            // Create cells in the table for each
            // input value 
            let bookData = document.createElement("td");
            bookData.textContent = book[key];
            // add cells to the row
            bookRow.appendChild(bookData);

            if (key === "read"){
                if (book["read"] === true){
                    bookData.textContent = "Read";
                }else{
                    bookData.textContent = "Not Read";
                }
            }
        })
        bookRow.appendChild(createReadStatusButton(book));
        bookRow.appendChild(createEditBookInfo(book, index));
        bookRow.appendChild(createRemoveBookCell(index));
        tableBody.appendChild(bookRow);
        sortLibrary();
        showStats();
    })
    storeLibrary();
}

// Create read status cell with "change read status button" 
function createReadStatusButton(book){
    // Create a table cell to take in read status button
    let readStatusCell = document.createElement("td")
    // Create button in html
    let readStatusBtn = document.createElement("button");
    // Add inner html to readStatus button
    readStatusBtn.textContent = "Update read status";

    // add eventlistener to created button
    readStatusBtn.addEventListener("click", ()=>{
        // Check curent boolean value of book.read eg
        // if book is on read, change it to unread
        book.read = !book.read;
        // Update Table
        updateTable(myLibrary);

    })
    readStatusCell.appendChild(readStatusBtn);
    return readStatusCell;
}

// Create edit book details cell
function createEditBookInfo(book, index){
    // create edit cell in table
    let editCell = document.createElement("td");
    // create edit button
    let editBookBtn = document.createElement("button");
    // Add inner html to edit button
    editBookBtn.textContent = "Edit book details";
    // Add event listener
    editBookBtn.addEventListener('click', ()=>{
        // Reset user's input values
        titleInput.value = book.title;
        genreInput.value = book.genre;
        authorInput.value = book.author;
        pagesInput.value = book.pages; 
        commentInput.value = book.comment;

        // if read property exists within book
        if (book.read){
            // change read status
            form.querySelector("#yes").checked = true;
        }else{
            form.querySelector("#no").checked = true;
        }

        toggleDisplay();

        // delete current book and show new book details
        submitBtn.addEventListener("click", deleteBook);
    })
    editCell.appendChild(editBookBtn);
    return editCell;
}

// Create "remove from collection" cell
function createRemoveBookCell(index){
    // Create the remove button and assign it inner html
    const removeFromTableBtn = document.createElement("button");
    removeFromTableBtn.textContent = "Remove";
    // Create a table cell to hold the remove button
    const removeFromCollectionCell = document.createElement("td");

    // Add event listener and remove functionality to button
    removeFromTableBtn.addEventListener("click", ()=>{
        // const deletePrompt = document.querySelector(".delete-prompt");
        // deletePrompt.classList.remove("hidden"); 
        const isConfirmed = 
        confirm("Are you sure you want to remove this book from your library?");

        if (isConfirmed){
            deleteBook(index);
        }
    });
    removeFromCollectionCell.appendChild(removeFromTableBtn);
    return removeFromCollectionCell;
}

function storeLibrary(){
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function getStorage(){
    myLibrary = JSON.parse(localStorage.getItem("library"));
}

document.addEventListener("DOMContentLoaded", ()=> {
    if (!localStorage.getItem("library")){
        storeLibrary();
    }else{
        getStorage();
    }

    updateTable(); 
})
