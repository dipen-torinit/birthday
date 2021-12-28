export const currentDate = () => {
  const date = new Date();
  const mon = date.getMonth() + 1;
  return date.getDate() + "/" + mon + "/" + date.getFullYear();
};
