//Check for duplication:
//get the existing items list from firebase
//loop through the existing items list to check if there is a match with current item
//set itemExists to true if duplication and return it

export const checkDuplication = (items, newItem) => {
  let itemExists = false;
  const regex = /[\W|_]/g;
  items.forEach((itemObject) => {
    //Remove punctuation of existing item with regex
    const existingItem = itemObject.itemName;
    const cleanExistingItem = existingItem.replace(regex, '');

    //Remove punctuation of current item with regex
    const currentItem = newItem;
    const cleanCurrentItem = currentItem.replace(regex, '');

    //Check for duplication while normalizin capitalization
    if (cleanCurrentItem.toLowerCase() === cleanExistingItem.toLowerCase()) {
      itemExists = true;
    }
  });
  return itemExists;
};

//Set error message and erase it after 3 sec and focus text input
export const showErrorMessage = (reference, dispatch) => {
  dispatch({
    type: 'DUPLICATED_ITEM',
    payload: 'Item already added. Try another one.',
  });
  reference.current.focus();
  setTimeout(() => {
    dispatch({ type: 'RESET_MESSAGE' });
  }, 3000);
};

// set the success message to infor the user that the item is added, and erase it after 3 sec
export const showSuccessMessage = (reference, dispatch) => {
  reference.current.focus();
  setTimeout(() => {
    dispatch({ type: 'RESET_MESSAGE' });
  }, 3000);
};
