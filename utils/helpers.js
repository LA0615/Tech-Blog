
module.exports = {
  format_date: (date) => {
    // Check if date is defined
    if (date) {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    }
    // If date is undefined, return an empty string or another default value
    return '';
  },
};


