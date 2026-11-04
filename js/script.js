const habitos = document.getElementById("lista-habitos-hoje");
const vazioHoje = document.getElementById("mensagem-vazio-hoje");
const main = document.getElementById("main-tela");

function iformacoesHabito() {
    const divDoHabito = document.createElement('div');
    divDoHabito.style.backgroundColor = "#242526";
    divDoHabito.style.height = "500px";
    divDoHabito.style.width = "500px";
    divDoHabito.style.borderRadius = "20px";
    divDoHabito.style.borderWidth = "1px"
    divDoHabito.style.borderColor = "gray"
    divDoHabito.style.borderStyle = "solid"

    divDoHabito.style.position = "absolute";
    divDoHabito.style.top = "50%";
    divDoHabito.style.left = "50%";
    divDoHabito.style.transform = "translate(-50%, -50%)";

    const divForm =document.createElement('form');
    divForm.style.display = "flex";
    divForm.style.justifyContent= "center";
    divForm.style.alignItems = "center";
    divForm.style.marginTop = "25px";
    divForm.style.flexDirection = "column";

    const informacoesParaForm = [
        {nomeLabel: "Nome do hábito:", NomePlaceholder: "Digite o hábito...", id: "InputNomeHabito", tipo: "texto"},
        {nomeLabel: "Descrição:", NomePlaceholder: "Digite a descrição...", id: "InputDescriçãoHabito", tipo: "texto"},
        {nomeLabel: "Tipo do hábito:", id: "SelectTipoHábito", valor: ["Saúde", "Carreira", "Hobby"]}
    ];

    for (const i of informacoesParaForm) {
        if (i.tipo == "texto") {
            const divLabel = document.createElement('label');
            divLabel.textContent = i.nomeLabel;
            divLabel.style.fontSize = "20px";
            divLabel.style.marginBottom = "5px";

            const divInput = document.createElement('input');
            divInput.type = "text";
            divInput.placeholder = i.NomePlaceholder;
            divInput.style.textAlign = "center";
            divInput.style.fontSize = "15px";
            divInput.style.color = "gray";
            divInput.id = i.id;
            divInput.style.marginBottom = "20px";
            divInput.style.width = "80%";
            divInput.style.height = "40px";
            divInput.style.backgroundColor = "#2d2d2d";
            divInput.style.transition = "all 0.25s";

            divInput.addEventListener("mouseenter", function() {
                divInput.style.backgroundColor = "#414141";
            });
            divInput.addEventListener("mouseleave", function() {
                divInput.style.backgroundColor = "#2d2d2d";
            });

            divForm.appendChild(divLabel);
            divForm.appendChild(divInput);
        } else {
            const divLabel = document.createElement('label');
            divForm.appendChild(divLabel);
            divLabel.textContent = i.nomeLabel;
            divLabel.style.fontSize = "20px";
            divLabel.style.marginRight = "5px";

            // colocar pra escolher o tipo do hábito
            const divSelect = document.createElement('select');
            divSelect.id = i.id;

            divForm.appendChild(divSelect);
        };
    };

    divDoHabito.appendChild(divForm);
    main.appendChild(divDoHabito);
};

function AdicionarHabito() {
    const nomeHabito = prompt("Digite o nome do hábito: ");

    if (!nomeHabito) return;

    iformacoesHabito();

    if (vazioHoje) {
        vazioHoje.style.display = "none"; 
    };

    const habitoNovo = document.createElement('li');

    const textoSpan = document.createElement('span');
    textoSpan.textContent = nomeHabito;

    const botaoConcluir = document.createElement('button');
    botaoConcluir.style.backgroundColor = "white";
    botaoConcluir.style.marginRight = "5px";
    botaoConcluir.style.height = "25px";
    botaoConcluir.style.transition = "all 0.2s ease";

    botaoConcluir.onclick = function() {
        if (this.style.backgroundColor !== "rgb(51, 204, 255)") {
            this.style.backgroundColor = "#33CCFF";
        } else {
            this.style.backgroundColor = "white";
        };
    };

    habitoNovo.appendChild(botaoConcluir);
    habitoNovo.appendChild(textoSpan);
    habitos.appendChild(habitoNovo);
}