const applyFilters = (data, filters) => {
  return data.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      if (key === "yoe") {
        return Number(item[key]) === Number(filters[key]);
      }
      if (key === "searchByName") {
        const fullName = `${item.user?.firstName || ''} ${item.user?.lastName || ''}`.toLowerCase();
        return fullName.includes(filters[key].toLowerCase());
      }
      return item[key]?.toLowerCase().includes(filters[key].toLowerCase());
    });
  });
};

const getUniqueFilterOptions = (data, keys) => {
  return keys.reduce((acc, key) => {
    if (key === "searchByName") {
      acc[key] = []; 
    } else {
      acc[key] = [...new Set(data.map((item) => item[key]))].filter(Boolean);
    }
    return acc;
  }, {});
};

export { applyFilters, getUniqueFilterOptions };