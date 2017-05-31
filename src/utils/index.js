/* eslint-disable no-underscore-dangle */

export const filterTrigger = {
  All: () => true,
  Active: checked => !checked,
  Checked: checked => checked,
};

export const incOrdec = (checked, amount) => {
  if (!isNaN(amount)) {
    if (checked) {
      const decAmount = amount - 1;
      return decAmount > 0 ? decAmount : 0;
    }
    return amount + 1;
  }

  throw TypeError('Amount is not an Number.');
};

export const todoFactory = (newTodo = {}) => ({
  item$: newTodo,
  _id: newTodo._id || '',
});
