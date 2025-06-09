export const dateToTextFormat = (dateString: string) => {
  const date = new Date(dateString);
  const  formatted = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return formatted;
} 