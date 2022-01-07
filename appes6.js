class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //create an element
    const row = document.createElement("tr");
    row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href="#" class="delete">x</a></td>
     `;

    list.appendChild(row);
    console.log(row);
  }

  showAlert(messege, className) {
    //creat a div
    const div = document.createElement("div");

    //add classname to div
    div.className = `alert ${className}`;
    //add messge
    div.appendChild(document.createTextNode(messege));
    //get container parent div

    //style the div
    div.style.padding = "5px";
    div.style.textAlign = "center";
    div.style.width = "30vh";
    div.style.margin = "auto";
    div.style.fontWeight = "bold";
    div.style.fontFamily = "sans-serif";
    div.style.borderRadius = "40px";
    const container = document.querySelector(".container");
    //get form
    const form = document.getElementById("book-form");
    //append to dom
    container.insertBefore(div, form);
    //timeout after 3sec]
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}



//local storage class

class Store {

  static getBooks(){
    let books;
    if(localStorage.getItem('books')=== null){
      books = [];
    }
    else
    {

      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;




  }

  static displayBooks(){

    const books = Store.getBooks()
    books.forEach(function(book){
      //insiate ui class
      const ui = new UI();

      //add book to ui
      ui.addBookToList(book);
    })


}

static addBook(book){

const books = Store.getBooks()
books.push(book);
localStorage.setItem('books', JSON.stringify(books));
}


static removeBook(isbn){

console.log(isbn);
const books = Store.getBooks();
books.forEach(function(book, index){

  if(book.isbn === isbn){
    books.splice(index, 1)
  }

})


localStorage.setItem('books', JSON.stringify(books));
}


}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)








//add event listner
document.getElementById('book-form').addEventListener('submit', function(e){
    
    //get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
          

    //instiate book
          const book = new Book(title, author, isbn);
    
    //instiate UI
    const ui = new UI();


    //validate

    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('please fill the values', 'error');
        e.preventDefault();
    }
    else{

            //add book to list
    ui.addBookToList(book);

    //add book to local storage
    Store.addBook(book)

    //Clear fields
    ui.clearFields();
          
    e.preventDefault();
    
    ui.showAlert('Book Added', 'success');

    }


})

//add event listner to book-list

document.getElementById('book-list').addEventListener('click', function(e){

    //instiate ui
    const ui = new UI();
    //call delete function
    ui.deleteBook(e.target);
    //remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show alert
    ui.showAlert('Book deleted', 'success');

})
