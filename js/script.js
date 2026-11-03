const habitos = document.getElementById("lista-habitos-hoje");
const vazioHoje = document.getElementById("mensagem-vazio-hoje");
const main = document.getElementById("main-tela");

function iformacoesHabito() {
    const divDoHabito = document.createElement('div');
    divDoHabito.style.backgroundColor = "gray";
    divDoHabito.style.height = "500px";
    divDoHabito.style.width = "500px";

    divDoHabito.style.position = "absolute";
    divDoHabito.style.top = "20%";
    divDoHabito.style.left = "39%";

    main.appendChild(divDoHabito);
};

function AdicionarHabito() {
    const nomeHabito = prompt("Digite o nome do hábito: ");
    
    iformacoesHabito();

    if (!nomeHabito) return;

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