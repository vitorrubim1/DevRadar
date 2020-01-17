module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim());
    //.map, percorre o array
    //trim(), tira o espaçamento antes e após o objeto do array
}