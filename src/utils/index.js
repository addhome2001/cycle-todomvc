export const generateRandomNum = () => Math.round(Math.random() * 9) + 1;

export const filterTrigger = {
  All: () => true,
  Active: complete => !complete,
  Completed: complete => complete,
};
