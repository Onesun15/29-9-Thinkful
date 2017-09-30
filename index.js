'use strict';

const STORE = {
  items: [ {name: 'beef', checked: false} ],
  hideCompleted: false,
  searchTerm: null
};
  
function generateItemElement(item, itemIndex) {
  return `
      <li class="js-item-index-element" data-item-index="${itemIndex}">
        <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
        <input type="text" class="edit" style="display:none"/>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
              <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
              <span class="button-label">delete</span>
          </button>
          <button class="shopping-item-save js-item-save">
          <span class="button-label">save</span>
        </button>
        </div>
      </li>`;
}
  
  
function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
    
  items.join('');

  return items;
}
  
  
function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
  
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

  
function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}
  
function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}
  
function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  console.log(STORE.items[itemIndex]['checked']);
  STORE.items[itemIndex]['checked'] = !STORE.items[itemIndex]['checked'];
}
  
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}
  
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}
  
function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE.items.splice(itemIndex, 1);

    renderShoppingList();
  });
}


function handleSaveButton() {
  $('.js-shopping-list').on('click', '.js-item-save', event => {
    //const item = getItemIndexFromElement(event.currentTarget);
    const value = $('.edit').val();
   
    console.log(value);
    return value;
  });
  // $('.edit').focusout(function(){
  //   $(event.currentTarget).hide().siblings('.display').show().text($(event.currentTarget).val());
  // });
}

function handleRenameItemClicked() {
  //user dblck item and can edit the name
  //use dblck() and sibligs()
  console.log('`New FEATURE handleRenameItemClicked` ran');
  $('.js-shopping-list').on('click', '.js-shopping-item', event => {
    //console.log($('.js-shopping-item').val());
    // console.log('`New FEATURE handleRenameItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //console.log(STORE.items[itemIndex]);
    $(event.currentTarget).hide().siblings('.edit').show().val($(event.currentTarget).text()).focus();
    // const value = $(event.currentTarget).text();
    console.log(('.edit').val());
    STORE.items[itemIndex]['name'] = $('.edit').val();
    //$(event.currentTarget).text() = handleSaveButton();
    // console.log($('.edit').val()); 
    // addItemToShoppingList(newItemName);
    // renderShoppingList();
    // });
  }); 
}


// $('#js-shopping-list-form').submit(function(event) {
//   event.preventDefault();
//   console.log('`handleNewItemSubmit` ran');
//   const newItemName = $('.js-shopping-list-entry').val();
//   $('.js-shopping-list-entry').val('');
//   addItemToShoppingList(newItemName);
//   renderShoppingList();
// });

function handleHideCompleted() {
  //check new button; if toggled, use .hide() method
  console.log('Hide function ran.');

  $('.js-item-hide').on('click',function() {
    STORE.hideCompleted = !STORE.hideCompleted;
    
    if (STORE.hideCompleted) {
      $('.shopping-item__checked').parent().hide();
    }
    else if (!STORE.hideCompleted) {
      $('.shopping-item__checked').parent().show();
    }
  });
}

function searchList() {

  $('.js-search-list').on('keyup', function() {
    let searchString = $('.js-search-list').val();

    // for (let i = 0; i < STORE.items.length; i++) {
    //   if (STORE.items[i]['name'] !== searchString) {
    //     console.log('Doesn\'t match.');
    //     // $(`span:contains(${STORE.items[i]['name']})`).parent().hide();
    //   }
    // }
  });
}
  
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleRenameItemClicked();
  handleSaveButton();
  handleHideCompleted();
  searchList();
}
  
$(handleShoppingList);
  