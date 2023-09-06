// SORT SECTION
const sortLibrarySection = document.querySelector(".display-operations--sort");
const selectionBox = document.querySelector("select");
const sortOptions = sortLibrarySection.querySelectorAll("option");

// SORTING
function sortLibrary(){
    selectionBox.addEventListener('change', (e) => {
        const sortOption = e.target.value;
        
        if (sortOption === "a-z"){
            sortA_Z();
        }else if (sortOption === "z-a"){
            sortZ_A();
        }else{
            showAll();
        }
    })
    return myLibrary;
}

function sortA_Z(){
    myLibrary.sort((a, b) => {
        return (a.title > b.title) ? 1 : -1;
    })
    updateTable(myLibrary);
}

function sortZ_A(){
    myLibrary.sort((a, b) => {
        return (a.title < b.title) ? 1 : -1;
    })
    updateTable(myLibrary);
}

function showAll(){
    updateTable(myLibrary);
}