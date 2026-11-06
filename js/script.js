const habitos = document.getElementById("lista-habitos-hoje");
const vazioHoje = document.getElementById("mensagem-vazio-hoje");
const main = document.getElementById("main-tela");

let informacoesDeHabitosAdicionados = {
    habitos: 0,
    habitosFeitos: 0,
    checagemConcluidos: {}
}

function adicionarStyle(Index, Modificado, style) {
    for (let i in style[Index]) {
        Modificado.style[i] = style[Index][i];
    }
}

function MudarBarra(OqueVaiMudar, quantidade) {
    informacoesDeHabitosAdicionados[OqueVaiMudar] += quantidade;
    const contadorConcluidos = document.getElementById('contador-habitos-concluidos');
    const contadorTotal = document.getElementById('contador-habitos-total');
    const porcentagemTexto = document.getElementById('progresso-geral-texto');
    const tamanhoBarra = document.getElementById('progresso-geral-barra');

    const totais = informacoesDeHabitosAdicionados.habitos;
    const feitas = informacoesDeHabitosAdicionados.habitosFeitos;
    const porcentagem = totais > 0 ? Math.round((feitas / totais) * 100) : 0;
    
    tamanhoBarra.style.transition = "all 1s"
    tamanhoBarra.style.width = `${porcentagem}%`
    
    porcentagemTexto.textContent = `${porcentagem}%`;
    contadorConcluidos.textContent = `${informacoesDeHabitosAdicionados.habitosFeitos}`;
    contadorTotal.textContent = `${informacoesDeHabitosAdicionados.habitos}`;

    if (informacoesDeHabitosAdicionados.habitos == 0 ) {
        vazioHoje.style.display = "";
        vazioHoje.style.width = "100%";
        vazioHoje.style.height = "100%";
        
        habitos.style.backgroundColor = "";
        habitos.style.display = "";
        habitos.style.alignItems = "";
        habitos.style.borderRadius = "";
        habitos.style.borderWidth = "";
        habitos.style.borderStyle = "";
        habitos.style.marginTop = "";
        habitos.style.paddingTop = "";
    }
}

function AdicionarHabitoNaDiv(nomeHabito, tipo) {
    if (vazioHoje) {
        vazioHoje.style.display = "none"; 
    }

    const style = [
        {
            backgroundColor: "#3a3a3c",
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            borderWidth: "1px",
            borderStyle: "none",
            marginTop: "5px",
            paddingTop: "8px"
        },
        {
            width: "98%",
            display: "flex",
            alignItems: "center",
            marginBottom: "8px"
        },
        {
            backgroundColor: "white",
            marginRight: "10px",
            height: "25px",
            width: "25px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease"
        }
    ]

    adicionarStyle(0, habitos, style);

    const habitoNovo = document.createElement('li');
    habitoNovo.id = `habito${informacoesDeHabitosAdicionados.habitos}`;
    adicionarStyle(1, habitoNovo, style);

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

    const botaoConcluir = document.createElement('button');
    adicionarStyle(2, botaoConcluir, style);

    botaoConcluir.onclick = function() {
        if (this.style.backgroundColor !== "rgb(51, 204, 255)") {
            this.style.backgroundColor = "#33CCFF";
            MudarBarra('habitosFeitos', 1);
            informacoesDeHabitosAdicionados.checagemConcluidos[habitoNovo.id] = true;
        } else {
            this.style.backgroundColor = "white";
            MudarBarra('habitosFeitos', -1)
            delete informacoesDeHabitosAdicionados.checagemConcluidos[habitoNovo.id];
        }
    };

    const apagar = document.createElement('h2');
    apagar.textContent = "X";
    apagar.style.marginLeft = "auto";
    apagar.style.cursor = "pointer";

    // arrumar habitos feitos que não diminui
    apagar.onclick = function() {
        habitoNovo.remove();
        MudarBarra('habitos', -1);
        
        if (informacoesDeHabitosAdicionados.checagemConcluidos[habitoNovo.id]) {
            MudarBarra('habitosFeitos', -1)
            delete informacoesDeHabitosAdicionados.checagemConcluidos[habitoNovo.id]
        }
    };

    containerTexto.appendChild(textoSpan);
    containerTexto.appendChild(tipoSpan);

    habitoNovo.appendChild(botaoConcluir);
    habitoNovo.appendChild(containerTexto);
    habitoNovo.appendChild(apagar);

    habitos.appendChild(habitoNovo);
    MudarBarra('habitos', 1);
}

function CriacaoHabito() {
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
        },
        {
            background: "transparent",
            width: "100px",
            color: "white",
            border: "2px solid white",
            borderRadius: "20px",
            marginRight: "10px"
        }
    ];

    const divDeAdicionarHabito = document.createElement('div');
    divDeAdicionarHabito.id = "modal-criacao-habito";
    adicionarStyle(0, divDeAdicionarHabito, styleDiv);

    const divForm = document.createElement('form');
    adicionarStyle(1, divForm, styleDiv);

    divForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nomeInput = document.getElementById("InputNomeHabito");
        const nomeHabito = nomeInput ? nomeInput.value.trim() : "";
        if (!nomeHabito) return;

        const SelectDoTipo = document.getElementById("SelectTipoHábito");
        const tipoSelecionado = SelectDoTipo ? SelectDoTipo.options[SelectDoTipo.selectedIndex].text.trim() : "";
        if (!tipoSelecionado) return;

        AdicionarHabitoNaDiv(nomeHabito, tipoSelecionado);
        divDeAdicionarHabito.remove();
    });

    const informacoesParaForm = [
        {nomeLabel: "Nome do hábito:", NomePlaceholder: "Digite o hábito...", id: "InputNomeHabito", tipo: "texto"},
        {nomeLabel: "Descrição:", NomePlaceholder: "Digite a descrição...", id: "InputDescriçãoHabito", tipo: "texto"},
        {nomeLabel: "Tipo do hábito:", id: "SelectTipoHábito", valor: ["Saúde", "Carreira", "Hobby", "Estudo", "Outro"]}
    ];

    for (const i of informacoesParaForm) {
        if (i.tipo == "texto") {
            const divLabel = document.createElement('label');
            divLabel.textContent = i.nomeLabel;
            adicionarStyle(2, divLabel, styleDiv);

            const divInput = document.createElement('input');
            divInput.id = i.id;
            divInput.type = "text";
            divInput.placeholder = i.NomePlaceholder;

            adicionarStyle(3, divInput, styleDiv);
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
            adicionarStyle(2, divLabel, styleDiv);

            const divSelect = document.createElement('select');
            divSelect.id = i.id;
            adicionarStyle(4, divSelect, styleDiv);

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

    const divBotoes = document.createElement('div');
    const botaoPost = document.createElement('button');
    botaoPost.type = "submit";
    botaoPost.textContent = "Criar";
    adicionarStyle(5, botaoPost, styleDiv);
    divBotoes.appendChild(botaoPost);

    const botaoCancelar = document.createElement('button');
    botaoCancelar.textContent = "Cancelar";
    adicionarStyle(5, botaoCancelar, styleDiv);

    botaoCancelar.onclick = function() {
        divDeAdicionarHabito.remove();
    }

    divBotoes.appendChild(botaoCancelar);
    divForm.appendChild(divBotoes);
    divDeAdicionarHabito.appendChild(divForm);
    main.appendChild(divDeAdicionarHabito);
}

function AdicionarHabito() {
    if (document.getElementById("modal-criacao-habito")) return;

    CriacaoHabito();
}