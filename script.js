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
    console.log(myLibrary);
}

// some initial data to fill library:
addBookToLibrary("Uwe Johnson", "Zwei Ansichten", 243, false);
addBookToLibrary("Lea Streisand", "Im Sommer wieder Fahrrad", 270, false);
addBookToLibrary("Emine Sevgi Özdamar", "Ein von Schatten begrenzter Raum", 763, false);
addBookToLibrary("Eva Illouz", "Warum Liebe weh tut", 467, false);
addBookToLibrary("Marjane Satrapi", "The Complete Persepolis", 341, true);

function displayLibrary(bookArray){

    const libContainer = document.querySelector("#lib");

    for(const book of bookArray){
        let card = document.createElement("div");
        card.classList.add("card");

        let author = document.createElement("div");
        author.textContent = book.author;
        author.classList.add("author");
        card.appendChild(author);
        
        let title = document.createElement("div");
        title.textContent = book.title;
        title.classList.add("title");
        card.appendChild(title);
        
        let pages = document.createElement("div");
        pages.textContent = book.pages + " pages";
        pages.classList.add("pages");
        card.appendChild(pages);
        
        let read = document.createElement("div");
        let label = document.createElement("Label");
        label.textContent = "read";
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if(book.read){
            checkbox.setAttribute("checked", "");
        }
        label.appendChild(checkbox);
        read.appendChild(label);
        read.classList.add("read");
        card.appendChild(label);
        
        libContainer.appendChild(card);
    }

}

displayLibrary(myLibrary);
