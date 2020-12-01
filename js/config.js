function setConfig() {
    var texts = {
        //definindo o titulo da aplicação
        "title":"Shopping Control"
    };
    document.title = texts.title;
    document.getElementById("navTitle").innerHTML = texts.title;
}

setConfig();