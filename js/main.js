/* ======= Storage controller ========== */
const StorageController = (() => {

  //public methods
  return {
    storeItem: (item) => {
      let items;
      //check if any items in LocalStorage
      if (localStorage.getItem('products') == null) {
        items = [];
        //push new items
        items.push(item);
        //set LS
        localStorage.setItem('products', JSON.stringify(items));
      } else {
        //get what is already in LS
        items = JSON.parse(localStorage.getItem('products'));
        //push new item
        items.push(item);
        //Re set LS
        localStorage.setItem('products', JSON.stringify(items));
      }
    },
    getItemsFromStorage: () => {
      let items;
      //check if any items in LS
      if (localStorage.getItem('products') == null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('products'));
      }
      return items;
    },
    updateItemStorage: (updatedItem) => {
      let items = JSON.parse(localStorage.getItem('products'));

      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      //Re set LS
      localStorage.setItem('products', JSON.stringify(items));
    },
    storeUserEmailToStorage: (email) => {
      let emails;
      //check if any items in LocalStorage
      if (localStorage.getItem('emails') === null) {
        emails = [];
        //push new item
        emails.push(email);
        //set items in localStorage
        localStorage.setItem('emails', JSON.stringify(emails));
      }
      else {
        emails = JSON.parse(localStorage.getItem('emails'));
        //push new item
        emails.push(email);
        UIController.buyItemsSuccess();
        //set items in localStorage
        localStorage.setItem('emails', JSON.stringify(emails));
      }
    }
  }
})();

/* ======= Items controller ========== */
const ItemController = (() => {
  //Item contrustor
  const Item = function (id, name, price, qty) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.qty = qty;
  }

  //Data Structure - State 
  const data = {
    // items: [
    //   //initializing items manually
    //   { id: 0, name: 'Product 1', price: 1250, qty: 15 },
    //   { id: 1, name: 'Product 2', price: 1250, qty: 18  },
    //   { id: 2, name: 'Product 3', price: 13570, qty: 10},
    // ],
    items: StorageController.getItemsFromStorage(),//saving items into LocalStorage
    currentItem: null, //for updating an item
    averagePrice: 0
  }

  //give access to data
  return {
    //fetch data
    getItems: () => {
      return data.items;
    },
    //add items
    addItem: (name, price, qty) => {
      let ID;
      //generate ID for items
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      }
      else {
        ID = 0;
      }
      //create new Item
      newItem = new Item(ID, name, price, qty);
      //add to items array
      data.items.push(newItem)

      return newItem;
    },
    updateItem: (qty) => {
      //qty to number
      qty = parseInt(qty);
      //find item
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          numOfItems = parseInt(item.qty);
          item.qty = numOfItems + qty;
          found = item;
        }
      });
      return found;
    },
    buyItem: (qty) => {
      //qty to number
      qty = parseInt(qty);
      //find item
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          numOfItems = parseInt(item.qty);
          item.qty = numOfItems - qty;
          found = item;
        }
      });
      return found;
    },
    getItemById: (id) => {
      let found;
      //looop through the item
      data.items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: (item) => {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    getAveragePrice: () => {
      
    },
    logData: () => {
      return data;
    }
  }
})();

/* ======= UI controller ========== */
const UIController = (() => {
  //
  const UISelectors = {
    itemList: '.product-wrapper',
    listItems: '.product-wrapper .product-container',
    addBtn: '.add-btn',
    addItemsBtn: '.add-item',
    removeItemsBtn: '.remove-item',
    backToList: '.back-to-list',
    buyBtn: '.buy-btn',
    backBtn: '.back-btn',
    buyItemsContainer: '.buy-items-container',
    addItemsContainer: '.add-items-container',
    itemNameInput: '#product-name',
    itemPriceInput: '#price',
    itemQtyInput: '#qty',
    updateItemsBtn: '.add-more-btn',
    editQtyInput: '.edit-qty',
    userEmailInput: '#user-email',
    buyItemQtyInput: '#buy-item-qty',
    errorMsg: '#buy-item-msg',
    warningMsg: '#add-item-msg',
    addItemsMessage: '.add-items-message',
    showAveragePrice: '.average-price'
  }

  //public methods
  return {

    populateItemList: (items) => {
      //
      let html = '';

      //loop through items array
      items.forEach((item) => {
        html += `
          <div class="product-container" id="item-${item.id}">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row product-info" >
                        <div class="col-md-12">
                            <h6>${item.name}</h6>
                            <span class="item-qty">
                              No of Items: <span class="text-success"> ${item.qty}</span>
                            </span>
                            <span>
                              Price : <span class="text-success">R${item.price}</span>
                            </span>
                            <span class="pull-right">
                            Average Price : R<span class="text-success average-price"></span>
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="row stock-list" id="btn-container">
                <div class="col-md-2 col-sm-4">
                    <button class="add-item"> add items</i></button>
                </div>
                <div class="col-md-2 col-sm-4 buy-i">
                    <button class="remove-item" id=""> Buy items</i></button>
                </div>
            </div>
        </div>
        `
      });

      //Insert items in the stock
      document.querySelector(UISelectors.itemList).innerHTML = html;

    },
    getItemInput: () => {

      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        price: document.querySelector(UISelectors.itemPriceInput).value,
        qty: document.querySelector(UISelectors.itemQtyInput).value,
      }
    },
    getNumOfItems: () => {
      return {
        qty: document.querySelector(UISelectors.editQtyInput).value
      }
    },
    getUserItems: () => {
      return {
        qty: document.querySelector(UISelectors.buyItemQtyInput).value,
      }
    },
    showAveragePrice: (averageprice) => {
      document.querySelectorAll(UISelectors.showAveragePrice).textContent = averageprice;
    },
    clearUserEmail: () => {
      document.querySelector(UISelectors.userEmailInput).value = '';
      document.querySelector(UISelectors.buyItemQtyInput).value = '';
    },
    buyItemsError: () => {
      let errorMsg = document.querySelector(UISelectors.errorMsg);
      errorMsg.innerHTML = `
      <div class="alert alert-danger">
        You cannot longer use this email to buy items
      </div>`;

      //hide alert after 3 sec
      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 3000);
    },
    buyItemsWarning: () => {
      let errorMsg = document.querySelector(UISelectors.errorMsg);
      errorMsg.innerHTML = `
      <div class="alert alert-warning">
         Please fill all the fields<i class="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i>
      </div>`;

      //hide alert after 3 sec
      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 3000);
    },
    buyItemsSuccess: () => {
      let errorMsg = document.querySelector(UISelectors.errorMsg);
      errorMsg.innerHTML = `
      <div class="alert alert-success">
        Items purchased successfully. Thank you..!! <i class="fa fa-check-circle-o pull-right" aria-hidden="true"></i>
      </div>`;

      //hide alert after 3 sec
      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 3000);
    },
    addItemsSuccess: () => {
      let errorMsg = document.querySelector(UISelectors.addItemsMessage);
      errorMsg.innerHTML = `
      <div class="alert alert-success">
        <span class="text-success"> Items added successfully <i class="fa fa-check-circle-o pull-right"
            aria-hidden="true"></i>
         </span>
      </div>`;

      //hide alert after 3 sec
      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 3000);
    },
    addItemsMessage: () => {
      let errorMsg = document.querySelector(UISelectors.addItemsMessage);
      errorMsg.innerHTML = `
      <div class="alert alert-warning">
         Please fill all the fields<i class="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i>
      </div>`;

      //hide alert after 3 sec
      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 3000);
    },
    addListItem: (item) => {
      //show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //create list of products
      const productContainer = document.createElement('div');
      //add class to div
      productContainer.className = 'product-container';
      //add ID 
      productContainer.id = `item-${item.id}`;
      //add html
      productContainer.innerHTML = `<div class="row">
        <div class="col-lg-8">
            <div class="row product-info" >
                <div class="col-md-12">
                    <h6>${item.name}</h6>
                    <span class="item-qty">
                        <b>No of Items:</b>  <span class="text-success">${item.qty}</span>
                    </span>
                    <span>
                        <b>Price :</b>
                        <span class="text-success">R${item.price}</span>
                    </span>
                    <span class="pull-right average-price">
                        <b>Average Price :</b>
                        <span class="text-success">R</span>
                    </span>
                </div>
            </div>
            
        </div>
    </div>
    <div class="row stock-list" id="btn-container">
        <div class="col-md-2 col-sm-4">
            <button class="add-item"><i class="fa fa-"> add items</i></button>
        </div>
        <div class="col-md-2 col-sm-4">
            <button class="remove-item" > Buy items</i></button>
        </div>
    </div>`;

      //insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', productContainer);
    },
    updateListItem: (item) => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //turn node list in array
      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<div class="row">
          <div class="col-lg-8">
              <div class="row product-info" >
                  <div class="col-md-12">
                      <h6>${item.name}</h6>
                      <span class="item-qty">
                          <b>No of Items:</b>  <span class="text-success">${item.qty}</span>
                      </span>
                      <span>
                          <b>Price :</b>
                          <span class="text-success">R${item.price}</span>
                      </span>
                      <span class="pull-right">
                          <b>Average Price :</b>R
                          <span class="text-success average-price"></span>
                      </span>
                  </div>
              </div>
            </div>
          </div>
          <div class="row stock-list" id="btn-container">
              <div class="col-md-2 col-sm-4">
                  <button class="add-item"><i class="fa fa-"> add items</i></button>
              </div>
              <div class="col-md-2 col-sm-4">
                  <button class="remove-item" > Buy items</i></button>
              </div>
          </div>`;
          document.querySelector(UISelectors.buyItemsContainer).innerHTML = `
          <div class="row">
              <div class="col-md-12">
                  <h6 id="show-product-name">${item.name}</h6>
                  <span>Price : R</span> <span class="text-success" id="show-price">${item.price}</span>
                  <span style="margin-left: 20px;">No of Items : </span> <span class="text-success"
                      id="show-qty">${item.qty}</span>
              </div>
          </div>
          <form>
              <div class="row">
                  <div class="col-md-12" id="buy-item-msg">

                  </div>
              </div>
              <div class="row" id="buy-input">
                  <div class="col-md-4">
                      <label for="">Email</label><br>
                      <input type="email" name="email" id="user-email" placeholder="Enter your Email"
                          required>
                  </div>
                  <div class="col-md-4">
                      <label for="">No of Items</label><br>
                      <input type="number" class="price" id="buy-item-qty" value="1" required>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-2">
                      <div class="">
                          <button class="buy-btn">Buy <i class="fa fa-shopping-cart"
                              aria-hidden="true"></i></button>
                      </div>
                  </div>
          </form>
          <div class="col-md-2">
              <div class="">
                  <button class="back-to-list"><i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                      Back </button>
              </div>
          </div>`;

          document.querySelector(UISelectors.addItemsContainer).innerHTML = `
          <div class="row">
              <div class="col-md-12">
                  <h6 id="show-item-name">${item.name}</h6>
                  <span>Price : R</span> <span class="text-success" id="show-item-price">${item.price}</span>
                  <span style="margin-left: 20px;">Number of Items : </span> <span class="text-success"
                      id="show-item-qty">${item.qty}</span>
              </div>
          </div>
          <div class="row">
              <div class="col-lg-12">
                  <div class="add-items-message"></div>
              </div>
          </div>
          <div class="row" id="buy-input">
              <div class="col-md-4">
                  <label for="">Qty</label><br>
                  <input type="number" class="edit-qty" id="price" value="1">
              </div>
          </div>
          <div class="row">
              <div class="col-md-2">
                  <div class="">
                      <button class="add-more-btn"><i class="fa fa-plus" aria-hidden="true"></i> add
                          Items</button>
                  </div>
              </div>
              <div class="col-md-2">
                  <div class="">
                      <button class="back-btn"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back
                      </button>
                  </div>
              </div>
          </div>`;
        }
      })
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemPriceInput).value = '';
      document.querySelector(UISelectors.itemQtyInput).value = '';
    },
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    hideAddStockContent: () => {
      document.querySelector(UISelectors.buyItemsContainer).style.display = 'none';
      document.querySelector(UISelectors.addItemsContainer).style.display = 'none';
      document.querySelector(UISelectors.itemList).style.display = 'block';
    },
    hideBuyStockContent: () => {
      document.querySelector(UISelectors.buyItemsContainer).style.display = 'none';
      document.querySelector(UISelectors.addItemsContainer).style.display = 'none';
      document.querySelector(UISelectors.itemList).style.display = 'block';
    },
    addItemToForm: () => {
      document.querySelector(UISelectors.addItemsContainer).style.display = 'block';
      document.querySelector(UISelectors.itemList).style.display = 'none';

      document.querySelector('#show-item-name').textContent = ItemController.getCurrentItem().name;
      document.querySelector('#show-item-price').textContent = ItemController.getCurrentItem().price;
      document.querySelector('#show-item-qty').textContent = ItemController.getCurrentItem().qty;
    },
    buyItemToForm: () => {
      document.querySelector(UISelectors.buyItemsContainer).style.display = 'block';
      document.querySelector(UISelectors.itemList).style.display = 'none';

      document.querySelector('#show-product-name').textContent = ItemController.getCurrentItem().name;
      document.querySelector('#show-price').textContent = ItemController.getCurrentItem().price;
      document.querySelector('#show-qty').textContent = ItemController.getCurrentItem().qty;
    },
    clearEditState: () => {
      document.querySelector(UISelectors.buyItemsContainer).style.display = 'none';
      document.querySelector(UISelectors.addItemsContainer).style.display = 'none';
    },
    getSelectors: () => {
      return UISelectors;
    }
  }
})();

/* ======= App controller ========== */
const AppController = ((ItemController, StorageController, UIController) => {

  //Load event Listeners
  const loadEventListeners = () => {
    //get Ui selectors
    const UISelectors = UIController.getSelectors();

    //add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //add & buy items events
    document.querySelector(UISelectors.itemList).addEventListener('click', setToaddItems);
    document.querySelector(UISelectors.itemList).addEventListener('click', setToBuyItems);
    document.querySelector(UISelectors.updateItemsBtn).addEventListener('click', addMoreItemsSubmit);
    document.querySelector(UISelectors.buyBtn).addEventListener('click', buyItemsSubmit);

    //hide add and buy content
    document.querySelector(UISelectors.backBtn).addEventListener('click', hideAddStock);
    document.querySelector(UISelectors.backToList).addEventListener('click', hideBuyStock);

  }
  //add item submit
  const itemAddSubmit = (e) => {

    //get form input from UI controller
    const input = UIController.getItemInput();

    //check for input 
    if (input.name !== '' && input.price !== '' && input.qty !== '') {
      //add items
      const newItem = ItemController.addItem(input.name, input.price, input.qty);

      //Add item to UI list
      UIController.addListItem(newItem);

      //stoore in LocalStprage
      StorageController.storeItem(newItem);

      //get average price
      const averageprice = ItemController.getAveragePrice();

      //add average price to UI
      UIController.showAveragePrice(averageprice);

      //clear fields after submit
      UIController.clearInput();
    } else {
      UIController.buyItemsWarning();
    }

    e.preventDefault();
  }

  //Update product  Items 
  const addMoreItemsSubmit = (e) => {
    //get input from ui
    const input = UIController.getNumOfItems();

    if (input.qty != '') {
      //update item
      const updatedItem = ItemController.updateItem(input.qty);

      //update ui
      UIController.updateListItem(updatedItem);


      //add more items to existing product in LS
      StorageController.updateItemStorage(updatedItem);
      UIController.addItemsSuccess();

      //clear input value
      document.querySelector('.edit-qty').value = '';
    } else {
      UIController.addItemsMessage();
    }
    e.preventDefault();
  }

  //buy items
  const buyItemsSubmit = (e) => {
    //get input from ui
    const input = UIController.getUserItems();
    //get user email
    const userEmail = document.querySelector('#user-email');
    const qtyInput = document.querySelector('#buy-item-qty');


    if (userEmail.value != '' && qtyInput.value != '') {

      const email = StorageController.storeUserEmailToStorage(userEmail.value, input.qty);
      //update item
      const updatedItem = ItemController.buyItem(input.qty);
      //update ui
      UIController.updateListItem(updatedItem);

      //clear email input 
      UIController.clearUserEmail();

      //add more items to existing product in LS
      StorageController.updateItemStorage(updatedItem);
    } else {
      UIController.buyItemsWarning();
    }


    e.preventDefault();
  }

  //add items click event
  const setToaddItems = (e) => {

    if (e.target.classList.contains('add-item')) {
      //get List Items ID
      const listId = e.target.parentNode.parentNode.parentNode.id;

      //break into array
      const listIdArr = listId.split('-');

      //get actual id
      const id = parseInt(listIdArr[1]);

      //get item
      const itemTOEdit = ItemController.getItemById(id);

      //set current Item
      ItemController.setCurrentItem(itemTOEdit);

      //add item to form
      UIController.addItemToForm();
    }
    e.preventDefault();
  }

  //buy items click event
  const setToBuyItems = (e) => {

    if (e.target.classList.contains('remove-item')) {
      //get List Items ID
      const listId = e.target.parentNode.parentNode.parentNode.id;

      //break into array
      const listIdArr = listId.split('-');

      //get actual id
      const id = parseInt(listIdArr[1]);

      //get item
      const itemTOEdit = ItemController.getItemById(id);

      //set current Item
      ItemController.setCurrentItem(itemTOEdit);

      //add item to form
      UIController.buyItemToForm();
    }
    e.preventDefault();
  }

  //hide add content
  const hideAddStock = (e) => {
    UIController.hideAddStockContent();
    e.preventDefault();
  }
  //hide add content
  const hideBuyStock = (e) => {
    UIController.hideBuyStockContent();
    e.preventDefault();
  }

  //return initializer for the app
  //public methods
  return {
    init: () => {

      //edit state
      UIController.clearEditState();

      //fetch items from data structure
      const items = ItemController.getItems();


      //check if any items
      if (items.length === 0) {
        UIController.hideList();
      }
      else {
        //populate List with items
        UIController.populateItemList(items);
      }
      //get average price
      const averageprice = ItemController.getAveragePrice();

      //add average price to UI
      UIController.showAveragePrice(averageprice);

      //Load event listeners
      loadEventListeners();
    }
  }

})(ItemController, StorageController, UIController);

//initialize App
AppController.init();