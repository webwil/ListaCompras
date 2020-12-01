var list = [
    {"desc":"teste","qtd":"1","valor":"0.50"},
    {"desc":"teste2","qtd":"10","valor":"1.99"},
    {"desc":"teste3","qtd":"3","valor":"2.75"}
];

function getTotal(list) {
    var total = 0;
    for (var key in list) {
        total += list[key].valor * list[key].qtd;
        
    }
    return total;
}

function setList(list) {
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';
    for(var key in list) {
        table += '<tr><td>'+ list[key].desc +'</td><td>'+ list[key].qtd+'</td><td>'+ list[key].valor +'</td><td>Editar | Apagar</td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
}

setList(list);
console.log(getTotal(list));