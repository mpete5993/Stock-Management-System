//storage controller


//items controller
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
    items: [
      //initializing items manually
      { id: 0, name: 'Product-1', price: 1200, qty: 15 },
      { id: 1, name: 'Product-2', price: 1250, qty: 18 },
      { id: 2, name: 'Product-3', price: 13570, qty: 10 },
    ],
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
    logData: () => {
      return data;
    }
  }
})();

//UI controller
const UIController = (() => {
  //
  const UISelectors = {
    itemList: '.product-wrapper',
    addBtn: '.add-btn',
    itemNameInput: '#product-name',
    itemPriceInput: '#price',
    itemQtyInput: '#qty'

  }

  //public methods
  return {

    populateItemList: (items) => {
      //
      let html = '';

      //loop through items array
      items.forEach((item) => {
        html += `
          <div class="product-container" id="${item.id}">
            <div class="row">
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
                                <b>Average Price :</b>
                                <span class="text-success">R${item.averagePrice}</span>
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="row" id="btn-container">
                <div class="col-md-2 col-sm-4">
                    <button class="add-item"><i class="fa fa-plus"> add items</i></button>
                </div>
                <div class="col-md-2 col-sm-4">
                    <button class="remove-item"><i class="fa fa-trash"> remove items</i></button>
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
        averagePrice: ''
      }

    },
    
    getSelectors: () => {
      return UISelectors;
    }
  }

})();

//App controller
const AppController = ((ItemController, UIController) => {

  //Load event Listeners
  const loadEventListeners = () => {
    //get Ui selectors
    const UISelectors = UIController.getSelectors();

    //add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);


  }
  //add item submit
  const itemAddSubmit = (e) => {

    //get form input from UI controller
    const input = UIController.getItemInput();

    //check for input 
    if (input.name !== '' && input.price !== '' && input.qty !== '') {
      //add items
      const newItem = ItemController.addItem(input.name, input.price, input.qty);
    }

    e.preventDefault();
  }

  //return initializer for the app
  //public methods
  return {
    init: () => {

      //fetch items from data structure
      const items = ItemController.getItems();

      //populate List with items
      UIController.populateItemList(items);

      //Load event listeners
      loadEventListeners();
    }
  }

})(ItemController, UIController);

//initialize App
AppController.init();