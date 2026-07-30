export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const slugify = (text) => {
  return text.toLowerCase().trim().replace(/\s+/g, "-");
};
