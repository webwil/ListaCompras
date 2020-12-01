var list = [
    {"desc":"fosforo","qtd":"1","valor":"0.50"},
    {"desc":"cerveja","qtd":"10","valor":"1.99"},
    {"desc":"refrigerante","qtd":"3","valor":"2.75"}
];

// inicio da listagem de produtos
function getTotal(list) {
    var total = 0;
    for (var key in list) {
        total += list[key].valor * list[key].qtd;
        
    }
    document.getElementById("totalValue").innerHTML = formatValor(total);
}

// Função resposavel pela geração da tabela
function setList(list) {
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';
    for(var key in list) {
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatQtd(list[key].qtd) +'</td><td>'+ formatValor(list[key].valor) +'</td><td><button class="btn btn-default" onclick="setUpdate('+ key +');">Editar</button>  <button class="btn btn-default" onclick="deleteData('+ key +');">Apagar</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

// Formata a descrição do produto
function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() +str.slice(1);
    return str;
}

// Formata o compo (Quantidade) da listagem
function formatQtd(qtd) {
    return parseInt(qtd);
}

// Formata o compo (Valor) da listagem
function formatValor(valor) {
    var str = parseFloat(valor).toFixed(2) + "";
    str = str.replace(".",",");
    str = "R$ " + str;
    return str;
}
// Função para cadastrar dados do formulario
function addData() {

    if (!validation()) {
        return;
    }

    var desc = document.getElementById("desc").value;
    var qtd = document.getElementById("qtd").value;
    var valor = document.getElementById("valor").value;

    list.unshift({"desc":desc, "qtd":qtd, "valor":valor});
    setList(list);
}

// Função que carrega dados para atualização
function setUpdate(id) {
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("qtd").value = obj.qtd;
    document.getElementById("valor").value = obj.valor;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIdUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+ id +'">'
}

// Função que reseta o formulario
function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("qtd").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIdUpdate").innerHTML = "";
    document.getElementById('errors').style.display = "none";
}

// Função que atualiza os dados
function updateData() {

    if (!validation()) {
        return;
    }

    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var qtd = document.getElementById("qtd").value;
    var valor = document.getElementById("valor").value;

    list[id] = {"desc":desc, "qtd":qtd, "valor":valor};
    resetForm();
    setList(list);
}

// Função que apaga registros da listagem
function deleteData(id) {
    if (confirm('Tem certeza que deseja apagar este registo?')) {
        if (id === list.length - 1) {
            list.pop();
        } else if (id === 0) {
            list.shift();
        } else {
            var arrAuxIni = list.slice(0,id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

// Tratamento e Validação de dados
function validation() {
    var desc = document.getElementById("desc").value;
    var qtd = document.getElementById("qtd").value;
    var valor = document.getElementById("valor").value;
    var errors = "";

    document.getElementById('errors').style.display = "none";

    if (desc === "") {
        errors += '<p>Por favor, digite a Descrição</p>';
    }
    if (qtd === "") {
        errors += '<p>Por favor, digite a Quantidade</p>';
    } else if (qtd != parseInt(qtd)) {
        errors += '<p>A quatidade deve ser um valor Numérico!</p>';
    }
    if (valor === "") {
        errors += '<p>Por favor, digite o Valor</p>';
    } else if (valor != parseFloat(valor)) {
        errors += '<p>A quatidade deve ser um valor Numérico!</p>';
    }

    if (errors != "") {
        document.getElementById('errors').style.display = "block";
        document.getElementById('errors').style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById('errors').style.color = "white";
        document.getElementById('errors').style.padding = "10px";
        document.getElementById('errors').style.margin = "10px";
        document.getElementById('errors').style.borderRadius = "13px";

        document.getElementById('errors').innerHTML = "<h3>Error: </h3>" + errors;
        return 0;
    } else {
        return 1;
    }

}

// Função exclui lista completa
function deleteList() {
    if (confirm("Voçê tem certeza que deseja excluir a lista de produtos?")) {
        list = [];
        setList(list);
    }
}

// Salva lista no LocalStorage
function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}

// Função de Inicialização de dados
function initListStorage() {
    var testList = localStorage.getItem("list");
    if (testList) {
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage();