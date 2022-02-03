export const toPascalCase = (str) => {
    str = str.replace(/\w+/g,
        function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});
    return str
}