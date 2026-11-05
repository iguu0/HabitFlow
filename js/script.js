const habitos = document.getElementById("lista-habitos-hoje");
const vazioHoje = document.getElementById("mensagem-vazio-hoje");
const main = document.getElementById("main-tela");

function iformacoesHabito() {
    const styleDiv = [
        {
            backgroundColor: "#242526",
            height: "500px",
            width: "500px",
            borderRadius: "20px",
            borderWidth: "1px",
            borderColor: "gray",
            borderStyle: "solid",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        },
        {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
            flexDirection: "column"
        },
        {
            fontSize: "20px",
            marginBottom: "5px"
        },
        {
            type: "text",
            textAlign: "center",
            fontSize: "15px",
            color: "gray",
            marginBottom: "20px",
            width: "80%",
            height: "40px",
            backgroundColor: "#2d2d2d",
            transition: "all 0.25s"
        },
        {
            textAlign: "center",
            fontSize: "15px",
            color: "gray",
            marginBottom: "20px",
            width: "80%",
            height: "40px",
            backgroundColor: "#2d2d2d"
        }
    ];

    function adicionarStyle(Index, Modificado) {
        for (let i in styleDiv[Index]) {
            Modificado.style[i] = styleDiv[Index][i];
        };
    }

    const divDoHabito = document.createElement('div');
    adicionarStyle(0, divDoHabito);

    const divForm =document.createElement('form');
    adicionarStyle(1, divForm);

    const informacoesParaForm = [
        {nomeLabel: "Nome do hábito:", NomePlaceholder: "Digite o hábito...", id: "InputNomeHabito", tipo: "texto"},
        {nomeLabel: "Descrição:", NomePlaceholder: "Digite a descrição...", id: "InputDescriçãoHabito", tipo: "texto"},
        {nomeLabel: "Tipo do hábito:", id: "SelectTipoHábito", valor: ["Saúde", "Carreira", "Hobby"]}
    ];

    for (const i of informacoesParaForm) {

        if (i.tipo == "texto") {
            const divLabel = document.createElement('label');
            divLabel.textContent = i.nomeLabel;
            adicionarStyle(2, divLabel);

            const divInput = document.createElement('input');
            divInput.id = i.id;
            divInput.placeholder = i.NomePlaceholder;

            adicionarStyle(3, divInput);
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

            adicionarStyle(2, divLabel);

            const divSelect = document.createElement('select');
            divSelect.id = i.id;

            adicionarStyle(4, divSelect);

            for (const valorHabito of informacoesParaForm[2].valor) {
                const Option = document.createElement("option");

                Option.value = valorHabito;
                Option.textContent = valorHabito;

                divSelect.appendChild(Option);
            };
            divForm.appendChild(divSelect);
        };
    };

    const botaoPost = document.createElement('button')
    botaoPost.textContent = "Criar"
    botaoPost.style.marginTop = "10px"
    divForm.appendChild(botaoPost)

    divDoHabito.appendChild(divForm);
    main.appendChild(divDoHabito);
};

function AdicionarHabito() {
    const nomeHabito = prompt("Digite o nome do hábito: ");

    if (!nomeHabito) return;

    let informacoes = iformacoesHabito();

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