//Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI constructor
function UI(){}


//delete from book
UI.prototype.deleteBook = function(target){

    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }

}



//Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list')
    //create an element
    const row = document.createElement('tr');
     row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href="#" class="delete">x</a></td>
     `;

     list.appendChild(row);
    console.log(row);
}

//clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}



// show alert
UI.prototype.showAlert = function(messege, className){
    //creat a div
    const div =  document.createElement('div');
    

    //add classname to div
    div.className = `alert ${className}`
    //add messge
    div.appendChild(document.createTextNode(messege));
    //get container parent div

    //style the div
    div.style.padding = '5px';
    div.style.textAlign = 'center';
    div.style.width = '30vh';
    div.style.margin = 'auto';
    div.style.fontWeight = 'bold';
    div.style.fontFamily = 'sans-serif';
    div.style.borderRadius = '40px';
    const container = document.querySelector('.container');
    //get form
    const form = document.getElementById('book-form');
    //append to dom
    container.insertBefore(div, form);
    //timeout after 3sec]
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)
}

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
    //show alert
    ui.showAlert('Book deleted', 'success');

})