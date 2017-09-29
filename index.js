'use strict';
/* global $ */

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
  return items.join('');
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

function handleRenameItemClicked() {
  console.log('`New FEATURE handleRenameItemClicked` ran');
  $('.js-shopping-list').on('click', '.js-shopping-item', event => {
    $(event.currentTarget).hide().siblings('.edit').show().val($(event.currentTarget).text()).focus();
  }); 
}

function handleSaveButton() {
  $('.js-shopping-list').on('click', '.js-item-save', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE.items[itemIndex]['name'] = $('.edit').val();
    renderShoppingList();
  });
}

function hideAllItems() {
  //take in true false to hide all items
}

function showAllItems() {
  //take in true false to hide all items
}

function handleShowOnlyCheckedItems() {
//create button that will show all items or only unchecked using 
//use object STORE values to toggle true false - hideCompleted: false toggle-all
  $('#js-shopping-list-form').on('click', '.js-toggle-all', event => {
    console.log('New FEATURE II `handleShowOnlyCheckedItems` ran');
    //const itemIndex = getItemIndexFromElement(event.currentTarget);
    //STORE
    // STORE.items.splice(itemIndex, 1);
    // renderShoppingList();
  });
}
  
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleRenameItemClicked();
  handleSaveButton();
  handleShowOnlyCheckedItems();
}
  
$(handleShoppingList);
  