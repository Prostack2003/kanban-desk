export const getCurrentDate = () => {
  const newDate = new Date()
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  if(month < 10) {
    return `${date}-0${month}-${year}`;
  } else {
    return `${date}-${month}-${year}`;
  }
}
