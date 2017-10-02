'use strict';
/* global $ */

const STORE = {
  items: [ {name: 'apples', checked: false, hidden: false},
    {name: 'oranges', checked: false, hidden: false},
    {name: 'milk', checked: true, hidden: false},
    {name: 'bread', checked: false, hidden: false} ],
  hideChecked: false,
  searchTerm: null
};

function isHidden(item){
  if (STORE.hideChecked && item.checked) {
    return true;
  }
  
  if (STORE.searchTerm !==null && item.name !== STORE.searchTerm) {
    item.hidden = !item.hidden;
    return true;
  } else if (STORE.searchTerm === null) {
    item.hidden = false;
    return false;
  }
}
  
function generateItemElement(item, itemIndex) {
  const checkedClass = item.checked ? 'shopping-item__checked' : '';
  const hiddenAttr = isHidden(item) ? 'style="display: none;"' : '';

  return (
    `<li class="js-item-index-element" data-item-index="${itemIndex}" ${hiddenAttr} >
      <span id="js-li" class="shopping-item js-shopping-item ${checkedClass} ">${item.name}</span>
      <input type="text" class="edit" style="display:none"/>
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

function generateShoppingItemsString(shoppingList) {
  //console.log('Generating shopping list element');
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}
  
function renderShoppingList() {
  // render the shopping list in the DOM
  //console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
  
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}
  
function addItemToShoppingList(itemName) {
  //console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false, hidden: false});
}
  
function handleNewItemSubmit() {
  //console.log('`handleNewItemSubmit` ran');
  $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function resetSearchSubmit() {
  if ($('.js-search-term').val() === '') {
    STORE.searchTerm = null;
  }
}

function handleSearchSubmit() {
  //console.log('`handleSearchSubmit` ran');
  $('#js-search-form').submit(event => {
    event.preventDefault();
    const newItemName = $('.js-search-term').val();
    //$('.js-search-term').val('');
    STORE.searchTerm = newItemName;
    resetSearchSubmit();
    renderShoppingList();
  });
}

// borrowed this idea from the web with some changes, it works!
function handleEditItemClicked() {
  $('ul').on('click', '.js-shopping-item', event => {
    $(event.currentTarget).hide().siblings('.edit').show().val($(event.currentTarget).text()).focus();

    $('.edit').focusout(event => {
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      $(event.currentTarget).hide().siblings('.js-shopping-item').show().text($(event.currentTarget).val());
      const upDatedItemName = $(event.currentTarget).val();
      STORE.items[itemIndex]['name'] = upDatedItemName;
      renderShoppingList();
    });
  });
}

function toggleCheckedForListItem(itemIndex) {
  //console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex]['checked'] = !STORE.items[itemIndex]['checked'];
}

function toggleCheckedVisibility() {
  STORE.hideChecked = !STORE.hideChecked;
}

function handleToggleChecked() {
  $('#js-search-form').on('change', '.js-toggle-checked', () => {
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
  //console.log('`handleItemCheckClicked` ran');
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}
  
function handleDeleteItemClicked() {
  //console.log('`handleDeleteItemClicked` ran');
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE.items.splice(itemIndex, 1);
    renderShoppingList();
  });
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleChecked();
  handleSearchSubmit();
  handleEditItemClicked();
}

$(handleShoppingList);




//---------------------------------------------------------------------------Test Ideas-----------------------------------------------------------------



//-------------Code Search Auto Code
// borrowed this from the web to implement search, doesn't check STORE state (yet) but it works!
// function handleSearchForItem() {
//   //console.log('`handleSearchForItem` ran');
//   let input, filter, ul, li, a, i;
//   input = document.getElementById('searchforitem');
//   filter = input.value.toUpperCase();
//   ul = document.getElementById('js-ul');
//   li = ul.getElementsByTagName('li');
//   for (i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName('span')[0];
//     if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = '';
//     } else {
//       li[i].style.display = 'none';
//     }
//   }
// }

// function updateStoreEditedName() {
//   // console.log('updateStoreEditedName, ran ');
//   // console.log( $('.js-shopping-item').text());
//   // $('.js-shopping-item').on('change', event => {
//   //   const itemIndex = getItemIndexFromElement(event.currentTarget);
//   //   //$(event.currentTarget).attr('contenteditable', true);
//   //   alert('The text has been changed.');
//   //   console.log('update name', STORE.items[itemIndex]['name'], $('.js-shopping-item').text());
//   //   //STORE.items[itemIndex].name = $('.js-shopping-item').text();
//   //   renderShoppingList();
//   // }); 
// }

// //----------------------------------------------------------------------------------------
// //mouseup
// function handleEditItemClicked() {
//   $('.js-shopping-item').on('focus', event => {
//     console.log('Test Output', $('.js-shopping-item').text(), $('.js-shopping-item').val());
//     const itemIndex = getItemIndexFromElement(event.currentTarget);
//     $(event.currentTarget).css("background-color", "yellow");
//     console.log('Test Index Value', itemIndex);
//     $(event.currentTarget).attr('contenteditable', true);
//    // STORE.items[itemIndex]['name'] = 'pear';
//     // alert('The text has been changed.');
//     //renderShoppingList();
//   }).mouseleave(event => {
//     alert('The text has been changed.');
//     const itemIndex = getItemIndexFromElement(event.currentTarget);
//     STORE.items[itemIndex]['name'] = 'pear';
//     renderShoppingList();
//   });
// }
// isSearchTerm(item);
// const hiddenClass = item.hidden ? 'hidden' : ''; =>${hiddenClass}

// STORE.items.map(function (k) {
//   console.log(k['name'], k['hidden']);
//   if (k['name'] !== STORE.searchTerm) {
//     console.log('here', k['name']);
//     k['hidden'] = true;
//     console.log('hidden', k['hidden']);
//   }
// });
// also return FALSE if the item's name is NOT in search term
// because we DO want to see it
// if (STORE.searchTerm !== null) {
//   //console.log('isHidden', STORE.searchTerm);
//   STORE.items.map(function (k, i) {
//     //console.log(k);
//     for (let key in k) {
//       console.log(k[key]);
//       //console.log( STORE.items.hidden);
//       if (k[key]['name'] !== STORE.searchTerm) {
//         console.log('here', k[key]['names'], i);
//        // STORE.items[i].hidden = true;
//        toggleHiddenForListItem();
//       }
//     }
//   });
// }


// function handleSearchSubmit() {
//   //match first letters of input box and reduce html and look for match
//   $('#js-search-form').submit(function(event) {
//     event.preventDefault();
//     console.log('`handleSearchSubmit` ran');
//     const newItemName = $('.js-search-term').val();
//     //$('.js-search-term').val('');
//     //addItemToShoppingList(newItemName);
//     STORE.searchTerm = newItemName;
//     console.log(STORE.searchTerm);
//     renderShoppingList();
    
//   });
// }

// function isSearchTerm(item) {
//   if (item.name === STORE.searchTerm) {
//     console.log('here get Search', item, STORE.searchTerm);
//     toggleHiddenForListItem();
//     return true;
//   } else {
//     return false;
//   }
// }

// function toggleHiddenForListItem() {
//   //console.log('Toggling checked property for item at index ');
//   //STORE.items['hidden'] = !STORE.items['hidden'];
//   STORE.items.map(function (k) {
//     if (k['name'] !== STORE.searchTerm) {
//       k['hidden'] = !k['hidden'];
//       console.log('hidden', k['name'], k['hidden']);
//     }
//   });
// }


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

  

  




/* --Code Depot--



items: [ {name: 'apples', checked: false, editable: false, hidden: false}, {name: 'milk', checked: false, editable: false, hidden: false}, {name: 'cheese', checked: false, editable: false, hidden: false} ],


// handleEditItemClicked();
  //handleSaveButton();
  // handleShowOnlyCheckedItems();
  //handleSearchSubmit();


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