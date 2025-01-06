export const formatDate = (dateStr) => {
   const date = new Date(dateStr);
   const options = { year: 'numeric', month: 'short', day: 'numeric' };
   return date.toLocaleDateString(undefined, options);
 };
 