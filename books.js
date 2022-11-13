 

const addBtn = document.querySelector('#add_btn');
const form = document.querySelector('.form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const radioButtons = document.querySelectorAll('input[name="read"]');
const tbody = document.querySelector('tbody');
    let title,author,pages,read; 
    let myLibrary = [];

addBtn.addEventListener('click', function(){
    
    title = titleInput.value;
    author = authorInput.value;
    pages = pagesInput.value;
    radioButtons.item(0).checked ? read = true : read = false ;
     
    
    createBook(title, author, pages, read);
    clearInputs();
    displayBook();
});


class Book { 
    
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
   }
  
    hasRead() { 
      this.read = !this.read; 
    }
  };


function createBook(title, author, pages, read){
                              
    book = new Book(title, author, pages, read); 
    myLibrary.push(book);
}

function clearInputs(){
    titleInput.value= "";
    authorInput.value = "";
    pagesInput.value = "";
    radioButtons.item(0).checked = false;
    radioButtons.item(1).checked = false;
}

function displayBook(){
    
    if (tbody.hasChildNodes){
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
          }
    }

    for(let i = 0; i < myLibrary.length; i++){
        
        let newRow = document.createElement('tr');
        
        newRow.setAttribute('data-index', i);
        tbody.appendChild(newRow);
 
        
        let titleTd = document.createElement('td');
        titleTd.setAttribute('headers', 'title');
        titleTd.textContent = `${myLibrary[i].title}`;
        newRow.appendChild(titleTd);

        let authorTd = document.createElement('td');
        authorTd.setAttribute('headers', 'author');
        authorTd.textContent = `${myLibrary[i].author}`;
        newRow.appendChild(authorTd);

        let pagesTd = document.createElement('td');
        pagesTd.setAttribute('headers', 'pages');
        pagesTd.textContent = `${myLibrary[i].pages}`;
        newRow.appendChild(pagesTd);

        let readTd = document.createElement('td');
        readTd.setAttribute('headers', 'read');
        readTd.textContent = `${myLibrary[i].read}`; 
        newRow.appendChild(readTd);

            readTd.addEventListener('click', () =>{
                if (readTd.textContent === 'true'){
                     readTd.textContent = 'false';
                     myLibrary[i].hasRead();
                 } else if (readTd.textContent === 'false'){
                     readTd.textContent = 'true';
                     myLibrary[i].hasRead();
                }
            })

        let deleteTd = document.createElement('td');
        deleteTd.setAttribute('headers', 'delete');

        let trashcan = document.createElement('img');
        trashcan.setAttribute('src', '/images/trash-can-outline.png');
        deleteTd.appendChild(trashcan);
        newRow.appendChild(deleteTd);

            trashcan.addEventListener('click', () => {
                tbody.removeChild(newRow);
                deleteBook(i);
            });  
    }
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayBook(); 
    console.log(myLibrary);
}