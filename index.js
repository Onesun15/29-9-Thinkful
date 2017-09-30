'use strict';
/* global $ */

//https://codepen.io/dengeist/pen/zEdYaJ/?editors=1010
//https://codepen.io/dengeist/pen/zEdYaJ/

const STORE = {
  items: [ {name: 'apples', checked: false, editable: false, hidden: false}, {name: 'milk', checked: false, editable: false, hidden: false} ],
  hideChecked: false,
  searchTerm: null
};



function isHidden(item){
  if (STORE.hideChecked && item.checked) {
    return true;
  }
  // also return FALSE if the item's name is NOT in search term
  // because we DO want to see it
}
  
function generateItemElement(item, itemIndex) {
  const checkedClass = item.checked ? 'shopping-item__checked' : '';
  const hiddenAttr = isHidden(item) ? 'style="display: none;"' : '';

  return (
    `<li class="js-item-index-element" data-item-index="${itemIndex}" ${hiddenAttr}>
      <span class="shopping-item js-shopping-item ${checkedClass}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>
    `);
}
/*

toggle

*/

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
  STORE.items.push({name: itemName, checked: false, editable: false, hidden: false});
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

function toggleCheckedVisibility() {
  STORE.hideChecked = !STORE.hideChecked;
}

function handleToggleChecked() {
  $('#js-search-form').on('change', '.js-toggle-checked', event => {
    toggleCheckedVisibility();
    renderShoppingList();
  });
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









// function hideCompleteTrue() {
//   const storeOfItems = STORE.items.filter(function(k) {
//     for (let key in k) {
//       if (k[key] === false) { 
//         console.log(k[key]);
//         return k;
//       }
//     }
//   });
// }

// console.log(hideCompleteTrue());


// // hideCompleteTrue();
// const storeOfItems = STORE.items.filter(function(k) {
//   for (let key in k) {
//     if (k[key] === false) { 
//     console.log(k[key]);
//     return k;
//     }
//   }
// });
// console.log(storeOfItems);

// function editableItem(itemIndex) {
//   console.log('Editable item changed to true @ ' + itemIndex);
//   STORE.items[itemIndex]['editable'] = true;
//   //STORE.items[itemIndex]['name'] = $('.js-shopping-item').text();
// }

// function upDateNameInStore(itemIndex) {
//   const newItemName = 'pear';//$('.js-shopping-item').text();
//   console.log(newItemName);
//   STORE.items[itemIndex]['name'] = newItemName;
// }

// function handleSaveButton() {
//   $('.js-shopping-list').on('click', '.js-item-save', event => {
//     const itemIndex = getItemIndexFromElement(event.currentTarget);
//     STORE.items[itemIndex]['name'] = $('.js-shopping-item').text();
//     //renderShoppingList();
//   });
// }

// function handleEditItemClicked() {
//   console.log('`New FEATURE handleRenameItemClicked` ran');
//   $('.js-shopping-list').on('click', '.js-item-edit', event => {
//     const itemIndex = getItemIndexFromElement(event.currentTarget);
//     editableItem(itemIndex);
//     //$(event.currentTarget).closest('li').find('.js-shopping-item').toggleClass('shopping-item__checked');
//   // $('.js-shopping-item').on('focusin', function() {
//   //     // your code here
     
//   // });
  
//   // $('.js-shopping-item').on('focusout', function() {
//   //   const newItemName = $('.js-shopping-item').text();
//   //   console.log(newItemName);
//   //   STORE.items[itemIndex]['name'] = newItemName;
//   // });
//     //$(event.currentTarget).find('.js-shopping-item').prop('contenteditable', true).focus();
//     // $('.js-shopping-item').focus();
//     // $('.js-shopping-item').focusout();
//    // console.log($('.js-item-edit').text(), 'here');
//     // const newItemName = 'pear';//$('.js-shopping-item').text();
//     // console.log(newItemName);
//     // STORE.items[itemIndex]['name'] = newItemName;
//     renderShoppingList();
//     STORE.items[itemIndex]['editable'] = false; 
//   });
// }







// function handleShowOnlyCheckedItems() {
// //create button that will show all items or only unchecked using 
// //use object STORE values to toggle true false - hideCompleted: false toggle-all

//   console.log('New FEATURE II `handleShowOnlyCheckedItems` ran');
//   $('.div-toggle').on('click', '.js-toggle-all', event => {
//     $('ul').toggle();
//     // STORE.items.forEach(function (k) {
//     //   for (let key in k) {
//     //     console.log(k[key]);
//     //     if (k[key] === true) {
//     //       console.log('deep', k[key]);
//     //       // $('ul').toggle();
//     //       //STORE['hideCompleted'] = true;
//     //       console.log('deepdeep', k[key], STORE['hideCompleted']);


//     //     }
//     //   }
//     // });
//     //$('ul').toggle();
//     //STORE['hideCompleted'] = true;
//     console.log('deepdeepdeep', STORE['hideCompleted']);
    
//     renderShoppingList();
//   });
// }

  
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleChecked();
 // handleEditItemClicked();
  //handleSaveButton();
 // handleShowOnlyCheckedItems();
}
  
$(handleShoppingList);
  




/* --Code Depot--
//<span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''} ${item.hidden ? 'item__hidden' : ''}" contenteditable='${item.editable}'>${item.name}</span>
//<span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span> 
//$(event.currentTarget).hide().siblings('.edit').show().val($(event.currentTarget).text()).focus();
//   }); 
//   $('.edit').focusout('.js-shopping-item', function() {
//     $(this).hide().siblings('.display').show().text($(this).val());

$('.editable').on('focusin', function() {
    // your code here
});

$('.editable').on('focusout', function() {
    // your code here
});


<li class="js-item-index-element" data-item-index="${itemIndex}"${hiddenAttr}>
      <span class="shopping-item js-shopping-item ${checkedClass} ${item.hidden}" contenteditable='${item.editable}'>${item.name}</span>
        <input type="text" class="edit" style="display:none"/>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
              <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
              <span class="button-label">delete</span>
          </button>
          <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
        </button>
        </button>
        <button class="shopping-item-save js-item-save">
        <span class="button-label">save</span>
      </button>
        </div>
      </li>`;

*/