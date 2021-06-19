//Instantiate a product
class product {
    constructor(product_name, price, qty){
        this.product_name = product_name;
        this.price = price;
        this.qty = qty;
    }    
}

class UI {

    addProductToList(product) {
      const list = document.getElementById('book-list');
      // Create tr element
      const row = document.createElement('tr');
      // Insert cols
      row.innerHTML = `
          <td>${product.product_name}</td>
          <td>${product.price}</td>
          <td>${product.qty}</td>
          <td><a href="#" class="delete">Remove<a></td>
        `;
  
      list.appendChild(row);
    }
  
    deleteProduct(target) {
      if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
      }
    }
  
    //clear fields after form is submitted
    clearFields() {
      document.getElementById('product-name').value = '';
      document.getElementById('price').value = '';
      document.getElementById('qty').value = '';
    }
  }
  

class UI {
    addProductToList(product) {
      const list = document.getElementById('book-list');
      // Create tr element
      const row = document.createElement('tr');
      // Insert cols
      row.innerHTML = `
        <td>${product.title}</td>
        <td>${product.author}</td>
        <td>${product.isbn}</td>
        <td><a href="#" class="delete">Remove<a></td>
      `;
    
      list.appendChild(row);
    }
  
    showAlert(message, className) {
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = `alert ${className}`;
      // Add text
      div.appendChild(document.createTextNode(message));
      // Get parent
      const container = document.querySelector('.container');
      // Get form
      const form = document.querySelector('#product-form');
      // Insert alert
      container.insertBefore(div, form);
  
      // Timeout after 3 sec
      setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
    }
  
    deleteProduct(target) {
      if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
      }
    }
  
    //clear fields after form is submitted
    clearFields() {
      document.getElementById('product-name').value = '';
      document.getElementById('price').value = '';
      document.getElementById('qty').value = '';
    }
  }
  

//Storing a product on LocalStorage
class Store {
    static getProducts() {
        let products;
        if(localStorage.getItem('products') === null){
            products = [];
        }
        else{
            products = JSON.parse(localStorage.get('products'));
        }
    }

    // static displayProduct(){
    //     const products = Store.getProducts();

    //     products.forEach(function(product){
    //         const ui  = new UI;
      
    //         // Add book to UI
    //         ui.addProductToList(products);
    //       });
    // }

    static addProduct(product){
        const products = Store.getProduct();

        products.push(product);
        
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// DOM Load Event
// document.addEventListener('DOMContentLoaded', Store.displayProduct);

// Event Listener for add book
document.getElementById('product-form').addEventListener('submit', function(e){

    //Get form values
    const product_name = document.getElementById('product-name').value,
        price = document.getElementById('price').value,
        qty = document.getElementById('qty').value

    // Instantiate book
    const product = new Book(product_name, price, qty);

    // Instantiate UI
    const ui = new UI();
    console.log(ui);

    // Validate
    if(product_name === '' || price === '' || qty === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add to LS
        Store.addBook(book);

        // Show success
        ui.showAlert('Book Added!', 'success');
    
        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});