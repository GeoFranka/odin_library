const myLibrary = [];

function Book(author, title, pages, read) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
    myLibrary.push(new Book(author, title, pages, read));
}

// some initial data to fill library:
addBookToLibrary("Uwe Johnson", "Zwei Ansichten", 243, false);
addBookToLibrary("Lea Streisand", "Im Sommer wieder Fahrrad", 270, false);
addBookToLibrary("Emine Sevgi Özdamar", "Ein von Schatten begrenzter Raum", 763, false);
addBookToLibrary("Eva Illouz", "Warum Liebe weh tut", 467, false);
addBookToLibrary("Marjane Satrapi", "The Complete Persepolis", 341, true);

function createDiv(cssClass, textContent){
    const newDiv = document.createElement("div");
    newDiv.classList.add(cssClass);
    if(textContent){
        newDiv.textContent = textContent;
    }
    return newDiv;
}

function displayLibrary(){

    const libContainer = document.querySelector("#lib");
    libContainer.textContent = "";

    for(const book of myLibrary){
        const card = createDiv("card");
        card.setAttribute("data-id", book.id);

        const upperPart = createDiv("upper");
        const authorTitleDiv = document.createElement("div");

        const author = createDiv("author", book.author);
        authorTitleDiv.appendChild(author);
        
        const title = createDiv("title", book.title);
        authorTitleDiv.appendChild(title);

        upperPart.appendChild(authorTitleDiv);

        const deleteDiv = createDiv("delete");
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delBtn");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.textContent = "x";
        deleteDiv.appendChild(deleteBtn);

        upperPart.appendChild(deleteDiv);

        card.appendChild(upperPart);
        
        const lowerPart = createDiv("lower");

        let pages = createDiv("pages", book.pages + " pages");
        lowerPart.appendChild(pages);
        
        let read = document.createElement("div");
        read.classList.add("read");
        let label = document.createElement("label");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if(book.read){
            checkbox.setAttribute("checked", "");
        }
        label.appendChild(checkbox);
        const labelText = document.createElement("span");
        labelText.textContent = " read";
        label.appendChild(labelText);
        read.appendChild(label);
        lowerPart.appendChild(label);

        card.appendChild(lowerPart);
        
        libContainer.appendChild(card);
    }

    const deleteBtns = document.querySelectorAll(".delBtn");

    for(let i = 0; i<deleteBtns.length; i++){
        deleteBtns[i].addEventListener("click", deleteBook);
    }

}

displayLibrary();

const dialog = document.getElementById("addDialog");
const openBtn = document.getElementById("addBtn");

openBtn.addEventListener("click", () => {
    dialog.showModal();
});

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary(
        document.getElementById("formAuthor").value,
        document.getElementById("formTitle").value,
        document.getElementById("formPages").value,
        document.getElementById("formRead").checked);
    dialog.close();
    displayLibrary();
});

function deleteBook(event){
    const id = event.target.closest(".card").dataset.id;
    const index = myLibrary.findIndex((book)=>{
        return book.id == id;
    });
    myLibrary.splice(index, 1);
    displayLibrary();
}
