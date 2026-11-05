const habitos = document.getElementById("lista-habitos-hoje");
const vazioHoje = document.getElementById("mensagem-vazio-hoje");
const main = document.getElementById("main-tela");

let informacoesDeHabitosAdicionados = {
    habitos: 0,
    habitosFeitos: 0,
    porcentagem: "0%"
}

function MudarBarra(OqueVaiMudar, quantidade) {
    informacoesDeHabitosAdicionados[OqueVaiMudar] += quantidade;
    const contadorConcluidos = document.getElementById('contador-habitos-concluidos');
    const contadorTotal = document.getElementById('contador-habitos-total');
    

    contadorConcluidos.textContent = `${informacoesDeHabitosAdicionados.habitosFeitos}`;
    contadorTotal.textContent = `${informacoesDeHabitosAdicionados.habitos}`;

}

function AdicionarHabitoNaDiv(nomeHabito, tipo) {
    if (vazioHoje) {
        vazioHoje.style.display = "none"; 
    }

    const habitoNovo = document.createElement('li');

    const containerTexto = document.createElement('div');
    containerTexto.style.display = "flex";
    containerTexto.style.flexDirection = "column";

    const textoSpan = document.createElement('span');
    textoSpan.textContent = nomeHabito;
    textoSpan.style.fontWeight = "bold";

    const tipoSpan = document.createElement('span');
    tipoSpan.textContent = tipo;
    tipoSpan.style.fontSize = "0.85em";
    tipoSpan.style.color = "#666";

    containerTexto.appendChild(textoSpan);
    containerTexto.appendChild(tipoSpan);

    const botaoConcluir = document.createElement('button');
    botaoConcluir.style.backgroundColor = "white";
    botaoConcluir.style.marginRight = "10px";
    botaoConcluir.style.height = "25px";
    botaoConcluir.style.width = "25px";
    botaoConcluir.style.border = "none";
    botaoConcluir.style.cursor = "pointer";
    botaoConcluir.style.transition = "all 0.2s ease";

    botaoConcluir.onclick = function() {
        if (this.style.backgroundColor !== "rgb(51, 204, 255)") {
            this.style.backgroundColor = "#33CCFF";
            MudarBarra('habitosFeitos', 1)
        } else {
            this.style.backgroundColor = "white";
            MudarBarra('habitosFeitos', -1)
        }
    };

    habitoNovo.appendChild(botaoConcluir);
    habitoNovo.appendChild(containerTexto);
    
    habitoNovo.style.display = "flex";
    habitoNovo.style.alignItems = "center";
    habitoNovo.style.marginBottom = "8px";

    habitos.appendChild(habitoNovo);

    MudarBarra('habitos', 1)
}

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
            transform: "translate(-50%, -50%)",
            zIndex: "1000"
        },
        {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            flexDirection: "column"
        },
        {
            fontSize: "20px",
            marginBottom: "5px"
        },
        {
            textAlign: "center",
            fontSize: "15px",
            color: "white",
            marginBottom: "20px",
            width: "80%",
            height: "40px",
            backgroundColor: "#2d2d2d",
            transition: "all 0.25s",
            border: "1px solid gray"
        },
        {
            textAlign: "center",
            fontSize: "15px",
            color: "white",
            marginBottom: "20px",
            width: "80%",
            height: "40px",
            backgroundColor: "#2d2d2d",
            border: "1px solid gray"
        }
    ];

    function adicionarStyle(Index, Modificado) {
        for (let i in styleDiv[Index]) {
            Modificado.style[i] = styleDiv[Index][i];
        }
    }

    const divDoHabito = document.createElement('div');
    divDoHabito.id = "modal-criacao-habito";
    adicionarStyle(0, divDoHabito);

    const divForm = document.createElement('form');
    adicionarStyle(1, divForm);

    divForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nomeInput = document.getElementById("InputNomeHabito");
        const nomeHabito = nomeInput ? nomeInput.value.trim() : "";
        if (!nomeHabito) return;

        const SelectDoTipo = document.getElementById("SelectTipoHábito");
        const tipoSelecionado = SelectDoTipo ? SelectDoTipo.options[SelectDoTipo.selectedIndex].text.trim() : "";
        if (!tipoSelecionado) return;

        AdicionarHabitoNaDiv(nomeHabito, tipoSelecionado);

        divDoHabito.remove();
    });

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
            divInput.type = "text";
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
            divLabel.textContent = i.nomeLabel;
            adicionarStyle(2, divLabel);

            const divSelect = document.createElement('select');
            divSelect.id = i.id;
            adicionarStyle(4, divSelect);

            for (const valorHabito of i.valor) {
                const Option = document.createElement("option");
                Option.value = valorHabito;
                Option.textContent = valorHabito;
                divSelect.appendChild(Option);
            }
            divForm.appendChild(divLabel);
            divForm.appendChild(divSelect);
        }
    }

    const botaoPost = document.createElement('button');
    botaoPost.type = "submit";
    botaoPost.textContent = "Criar";
    botaoPost.style.marginTop = "10px";
    botaoPost.style.padding = "8px 16px";
    divForm.appendChild(botaoPost);

    divDoHabito.appendChild(divForm);
    main.appendChild(divDoHabito);
}

function AdicionarHabito() {
    if (document.getElementById("modal-criacao-habito")) return;

    iformacoesHabito();
}