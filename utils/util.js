const extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2]; // El ID está siempre en la penúltima posición
};

module.exports = extractIdFromUrl;  