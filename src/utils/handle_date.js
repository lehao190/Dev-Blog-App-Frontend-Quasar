const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const month = date.getUTCMonth() + 1; //months from 1-12
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const newDate = day + '/' + month + '/' + year;

  return newDate
};

export { formatDate }
