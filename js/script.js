const habitos = document.getElementById("lista-habitos-hoje");
const vazioHoje = document.getElementById("mensagem-vazio-hoje");
const main = document.getElementById("main-tela");

let informacoesDeHabitosAdicionados = {
    habitos: 0,
    habitosFeitos: 0,
    checagemConcluidos: {}
}
// função para adicionar estilos a um elemento
function adicionarStyle(Index, Modificado, style) {
    for (let i in style[Index]) {
        Modificado.style[i] = style[Index][i];
    }
}

// função para atualizar a barra de progresso e os contadores
function MudarBarra(OqueVaiMudar, quantidade) {
    informacoesDeHabitosAdicionados[OqueVaiMudar] += quantidade;

    const contadorConcluidos = document.getElementById('contador-habitos-concluidos');
    const contadorTotal = document.getElementById('contador-habitos-total');
    const porcentagemTexto = document.getElementById('progresso-geral-texto');
    const tamanhoBarra = document.getElementById('progresso-geral-barra');
    const graficoPizza = document.getElementById('grafico-pizza');

    const totais = informacoesDeHabitosAdicionados.habitos;
    const feitas = informacoesDeHabitosAdicionados.habitosFeitos;
    const porcentagem = totais > 0 ? Math.round((feitas / totais) * 100) : 0;

    porcentagemTexto.textContent = `${porcentagem}%`;
    contadorConcluidos.textContent = `${feitas}`;
    contadorTotal.textContent = `${totais}`;

    tamanhoBarra.style.width = `${porcentagem}%`;
    graficoPizza.style.background = `conic-gradient(var(--azul) 0% ${porcentagem}%, var(--borda) ${porcentagem}% 100%)`;

    if (informacoesDeHabitosAdicionados.habitos == 0) {
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
// função para adicionar um hábito à lista de hábitos
function AdicionarHabitoNaDiv(nomeHabito, tipo) {
    if (vazioHoje) {
        vazioHoje.style.display = "none"; 
    }

    const style = [
        {
            backgroundColor: "#131a27",
            alignItems: "center",
            borderRadius: "10px",
            borderWidth: "1px",
            borderStyle: "none",
            marginTop: "5px",
            paddingTop: "8px"
        },
        {
            width: "95%",
            display: "flex",
            margin: "0 auto",
            border: "none"
        },
        {
            backgroundColor: "white",
            marginRight: "10px",
            height: "25px",
            width: "25px",
            border: "none",
            borderRadius: "15%",
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

    const apagar = document.createElement('img');
    apagar.src = "img/lixeira.png";
    apagar.alt = "Apagar hábito";

    apagar.style.width = "20px";
    apagar.style.marginLeft = "auto";
    apagar.style.cursor = "pointer";

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
// função para criar o modal de criação de hábito
function CriacaoHabito() {
    const styleDiv = [
        {
            position: "fixed",
            inset: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            backgroundColor: "rgba(11, 15, 23, 0.72)",
            zIndex: "1000"
        },
        {
            width: "min(500px, 100%)",
            maxHeight: "calc(100vh - 32px)",
            overflowY: "auto",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
        }
    ];

    const divDeAdicionarHabito = document.createElement('div');
    divDeAdicionarHabito.id = "modal-criacao-habito";
    adicionarStyle(0, divDeAdicionarHabito, styleDiv);

    const divForm = document.createElement('form');
    divForm.className = "card-formulario";
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
        const grupoCampo = document.createElement('div');
        grupoCampo.className = "grupo-campo";

        const divLabel = document.createElement('label');
        divLabel.textContent = i.nomeLabel;
        divLabel.htmlFor = i.id;

        if (i.tipo == "texto") {
            const divInput = document.createElement('input');
            divInput.id = i.id;
            divInput.type = "text";
            divInput.placeholder = i.NomePlaceholder;

            grupoCampo.appendChild(divLabel);
            grupoCampo.appendChild(divInput);
        } else {
            const divSelect = document.createElement('select');
            divSelect.id = i.id;

            for (const valorHabito of i.valor) {
                const Option = document.createElement("option");
                Option.value = valorHabito;
                Option.textContent = valorHabito;
                divSelect.appendChild(Option);
            }

            grupoCampo.appendChild(divLabel);
            grupoCampo.appendChild(divSelect);
        }

        divForm.appendChild(grupoCampo);
    }

    const divBotoes = document.createElement('div');
    divBotoes.className = "acoes-formulario";
    divBotoes.style.justifyContent = "center";
    const botaoCriar = document.createElement('button');
    botaoCriar.type = "submit";
    botaoCriar.className = "btn-primario";
    botaoCriar.textContent = "Criar";
    botaoCriar.style.flex = "1 1 140px";
    botaoCriar.style.maxWidth = "140px";

    const botaoCancelar = document.createElement('button');
    botaoCancelar.type = "button";
    botaoCancelar.className = "btn-neutro";
    botaoCancelar.textContent = "Cancelar";
    botaoCancelar.style.flex = "1 1 140px";
    botaoCancelar.style.maxWidth = "140px";

    botaoCancelar.onclick = function() {
        divDeAdicionarHabito.remove();
    }

    divBotoes.appendChild(botaoCancelar);
    divBotoes.appendChild(botaoCriar);
    divForm.appendChild(divBotoes);

    divDeAdicionarHabito.appendChild(divForm);
    main.appendChild(divDeAdicionarHabito);
}

// função para adicionar um hábito, verificando se o modal já está aberto
function AdicionarHabito() {
    if (document.getElementById("modal-criacao-habito")) return;

    CriacaoHabito();
}

// função para ativar a tela selecionada e desativar a tela atual
let TelaAtiva = document.getElementById("visao-geral");
function AtivarTela(id, botãoId) {
    const TelaParaAtivar = document.getElementById(id);

    if (!TelaParaAtivar) return;
    if (TelaParaAtivar == TelaAtiva) return;

    TelaAtiva.style.display = "none";
    TelaParaAtivar.style.display = "block";

    const botãoClicado = document.getElementById(botãoId);
    botãoClicado.style.background = "var(--azul-grad)";
    botãoClicado.style.borderColor = "transparent";
    botãoClicado.style.color = "#fff";
    botãoClicado.style.fontWeight = "600";
    botãoClicado.style.boxShadow = "0 0 22px rgba(0, 200, 255, 0.35)";

    const botãoAntigo = document.getElementById(`link-${TelaAtiva.id}`);
    botãoAntigo.style.background = 'linear-gradient(180deg, #202a3b, #19212f)';
    botãoAntigo.style.color = 'var(--texto)';
    botãoAntigo.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.35)";

    TelaAtiva = TelaParaAtivar;
}