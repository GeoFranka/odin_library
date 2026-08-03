const myLibrary = [];

function Book(author, title, pages, read) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeReadStatus = function(){
    this.read = !(this.read);
};

Book.prototype.edit = function(){
    document.getElementById("formId").value = this.id;
    document.getElementById("formAuthor").value = this.author;
    document.getElementById("formTitle").value = this.title;
    document.getElementById("formPages").value = this.pages;
    document.getElementById("formRead").checked = this.read;
    toggleForm("change");
    dialog.showModal();
}

Book.prototype.changeData = function(author, title, pages, read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function toggleForm(variant){
    document.querySelectorAll("#addDialog > *").forEach((e)=>{
        if(e.classList.contains("add")){
            e.style.display = variant=="change" ? "none" : "block";
        } else if(e.classList.contains("change")){
            e.style.display = variant=="change" ? "block" : "none";
        }
    });   
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

function createButton(cssClasses, textContent, title){
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    for(const cl of cssClasses.split(" ")){
        button.classList.add(cl);
    }
    button.setAttribute("title", title);
    button.textContent = textContent;
    return button;
}

function displayLibrary(){

    const libContainer = document.querySelector("#lib");
    libContainer.textContent = "";

    for(const book of myLibrary){
        const card = createDiv("card");
        card.dataset.id = book.id;

        const upperPart = createDiv("upper");
        const authorTitleDiv = document.createElement("div");

        const author = createDiv("author", book.author);
        authorTitleDiv.appendChild(author);
        
        const title = createDiv("title", book.title);
        authorTitleDiv.appendChild(title);

        upperPart.appendChild(authorTitleDiv);

        const buttonsDiv = createDiv("buttons");
        const deleteBtn = createButton("delBtn btn", "x", "Remove this book from the library");
        const editBtn = createButton("editBtn btn", "", "Edit this book");
        buttonsDiv.appendChild(deleteBtn);
        buttonsDiv.appendChild(editBtn);
        
        upperPart.appendChild(buttonsDiv);

        card.appendChild(upperPart);
        
        const lowerPart = createDiv("lower");

        let pages = createDiv("pages", book.pages>0 ? book.pages + " pages" : "");
        lowerPart.appendChild(pages);
        
        let read = createDiv("read");
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("title", "mark as " + (book.read?"unread":"read"));
        button.classList.add(book.read?"status-read":"status-unread");
        read.appendChild(button);
        lowerPart.appendChild(read);

        card.appendChild(lowerPart);
        
        libContainer.appendChild(card);
    }

    document.getElementById("number").textContent = myLibrary.length + " books";
    document.getElementById("pages").textContent = myLibrary.reduce((total, book) => {
            return total + Number(book.pages);
        }, 0) + " pages";
    document.getElementById("read").textContent = myLibrary.reduce((total, book) => {
            return total + (book.read ? 1 : 0);
        }, 0) + " read";

    const deleteBtns = document.querySelectorAll(".delBtn");
    for(let i=0; i<deleteBtns.length; i++){
        deleteBtns[i].addEventListener("click", deleteBook);
    }

    const editBtns = document.querySelectorAll(".editBtn");
    for(let i=0; i<editBtns.length; i++){
        editBtns[i].addEventListener("click", editBook);
    }

    const readStatusBtns = document.querySelectorAll(".read button");
    for(let i=0; i<readStatusBtns.length; i++){
        readStatusBtns[i].addEventListener("click", changeReadStatusOfBook);
    }

}

displayLibrary();

const dialog = document.getElementById("addDialog");
const form = document.getElementById("addForm");
const openBtn = document.getElementById("addBtn");

form.addEventListener('reset', function() {
    this.querySelectorAll("input[type=hidden]").forEach(input=>{
        input.value = "";
    });
    this.querySelectorAll("input[required]").forEach(input=>{
        input.classList.remove("validated");
    });
});

openBtn.addEventListener("click", () => {
    toggleForm("add");
    form.reset();
    dialog.showModal();
});

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let valid = true;
    const inputs = form.querySelectorAll("input");
    for(input of inputs){
        let errorMsg = "";
        if(!input.validity.valid){
            input.classList.add("validated");
            valid = false;
            const nameInCamelcase = input.name[0].toUpperCase() + input.name.substring(1);
            errorMsg = `Field ${nameInCamelcase} cannot be empty!`;
        }
        toggleError(errorMsg, input);
    }
    if(!valid){
        return;
    }
    if(formData.get("id") == ""){
        addBookToLibrary(
            formData.get("author"),
            formData.get("title"),
            formData.get("pages"),
            formData.get("read") != null);
    } else {
        const id = formData.get("id");
        const book = myLibrary.find((book)=>{
            return book.id == id;
        });
        book.changeData(
            formData.get("author"),
            formData.get("title"),
            formData.get("pages"),
            formData.get("read") != null);
    }
    dialog.close();
    form.reset();
    displayLibrary();
});

function deleteBook(e){
    const id = e.target.closest(".card").dataset.id;
    const index = myLibrary.findIndex((book)=>{
        return book.id == id;
    });
    myLibrary.splice(index, 1);
    displayLibrary();
}

function changeReadStatusOfBook(e){
    const id = e.target.closest(".card").dataset.id;
    const book = myLibrary.find((book)=>{
        return book.id == id;
    });
    book.changeReadStatus();
    displayLibrary();
}

function editBook(e){
    const id = e.target.closest(".card").dataset.id;
    const book = myLibrary.find((book)=>{
        return book.id == id;
    });
    book.edit();
}

function toggleError(msg, input){
    const errorSpan = input.parentElement.querySelector(".error");
    if(!errorSpan) return;
    errorSpan.textContent = msg;
    errorSpan.style.display = msg.length>0 ? "block" : "none";
}
