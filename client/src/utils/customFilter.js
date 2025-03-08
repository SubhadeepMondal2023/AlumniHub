export const applyFilters = (data, filters) => {
    return data.filter((item) => {
        return Object.keys(filters).every((key) => {
            if (!filters[key]) return true; 
            if (typeof filters[key] === "string") {
                return item[key]?.toLowerCase().includes(filters[key].toLowerCase());
            }
            return item[key] === filters[key];
        });
    });
};

export const getUniqueFilterOptions = (data, keys) => {
    const uniqueFilters = {};
    keys.forEach((key) => {
        uniqueFilters[key] = [...new Set(data.map((item) => item[key]))];
    });
    return uniqueFilters;
};
