// Elementos e informações usados pela tela.
const habitos = document.getElementById("lista-habitos-hoje");
const vazioHoje = document.getElementById("mensagem-vazio-hoje");
const main = document.getElementById("main-tela");

let informacoesDeHabitosAdicionados = {
    habitos: 0,
    habitosFeitos: 0,
    checagemConcluidos: {},
    categorias: {
        "Saúde": 0,
        "Carreira": 0,
        "Hobby": 0,
        "Estudo": 0,
        "Outro": 0
    }
};

// Aplica vários estilos a um elemento.
function adicionarStyle(elemento, estilos) {
    for (const propriedade in estilos) {
        elemento.style[propriedade] = estilos[propriedade];
    }
}

// Atualiza os contadores e a exibição do progresso.
function MudarBarra(contador, quantidade, categoria) {
    informacoesDeHabitosAdicionados[contador] += quantidade;

    if (categoria) {
        informacoesDeHabitosAdicionados.categorias[categoria] += quantidade;
    }

    const contadorConcluidos = document.getElementById('contador-habitos-concluidos');
    const contadorTotal = document.getElementById('contador-habitos-total');
    const porcentagemTexto = document.getElementById('progresso-geral-texto');
    const tamanhoBarra = document.getElementById('progresso-geral-barra');
    const graficoPizza = document.getElementById('grafico-pizza');

    const totais = informacoesDeHabitosAdicionados.habitos;
    const feitas = informacoesDeHabitosAdicionados.habitosFeitos;
    const porcentagem = totais > 0 ? Math.round((feitas / totais) * 100) : 0;
    let totalCategorias = 0;

    for (const categoria in informacoesDeHabitosAdicionados.categorias) {
        if (informacoesDeHabitosAdicionados.categorias[categoria] > 0) {
            totalCategorias++;
        }
    }

    porcentagemTexto.textContent = `${porcentagem}%`;
    contadorConcluidos.textContent = `${feitas}`;
    contadorTotal.textContent = `${totais}`;
    document.getElementById('indicador-habitos-ativos').textContent = `${feitas}`;
    document.getElementById('indicador-categorias').textContent = `${totalCategorias}`;

    tamanhoBarra.style.width = `${porcentagem}%`;
    graficoPizza.style.background = `conic-gradient(var(--azul) 0% ${porcentagem}%, var(--borda) ${porcentagem}% 100%)`;

    if (informacoesDeHabitosAdicionados.habitos === 0) {
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

// Criação dos itens de hábito e ações de cada item.
function AdicionarHabitoNaDiv(nomeHabito, tipo) {
    if (vazioHoje) {
        vazioHoje.style.display = "none";
    }

    const estiloLista = {
        backgroundColor: "#131a27",
        alignItems: "center",
        borderRadius: "10px",
        borderWidth: "1px",
        borderStyle: "none",
        marginTop: "5px",
        paddingTop: "8px"
    };
    const estiloItem = {
        width: "95%",
        display: "flex",
        margin: "0 auto",
        border: "none"
    };
    const estiloBotaoConcluir = {
        backgroundColor: "white",
        marginRight: "10px",
        height: "25px",
        width: "25px",
        border: "none",
        borderRadius: "15%",
        cursor: "pointer",
        transition: "all 0.2s ease"
    };

    adicionarStyle(habitos, estiloLista);

    const habitoNovo = document.createElement('li');
    habitoNovo.id = `habito${informacoesDeHabitosAdicionados.habitos}`;
    adicionarStyle(habitoNovo, estiloItem);

    const containerTexto = document.createElement('div');
    containerTexto.className = "grupo-campo";
    containerTexto.style.display = "flex";
    containerTexto.style.flexDirection = "column";
    containerTexto.style.gap = "0";
    containerTexto.style.marginBottom = "0";

    const textoSpan = document.createElement('span');
    textoSpan.textContent = nomeHabito;
    textoSpan.style.fontWeight = "bold";

    const tipoSpan = document.createElement('span');
    tipoSpan.textContent = tipo;
    tipoSpan.style.fontSize = "0.85em";
    tipoSpan.style.color = "#666";

    const botaoConcluir = document.createElement('button');
    adicionarStyle(botaoConcluir, estiloBotaoConcluir);

    botaoConcluir.onclick = function() {
        if (this.style.backgroundColor !== "rgb(51, 204, 255)") {
            this.style.backgroundColor = "#33CCFF";
            MudarBarra('habitosFeitos', 1);
            informacoesDeHabitosAdicionados.checagemConcluidos[habitoNovo.id] = true;
        } else {
            this.style.backgroundColor = "white";
            MudarBarra('habitosFeitos', -1);
            delete informacoesDeHabitosAdicionados.checagemConcluidos[habitoNovo.id];
        }
    };

    const editar = document.createElement('img');
    editar.src = "img/editar.png";
    editar.alt = "Botão de editar tarefa";
    editar.style.width = "30px";
    editar.style.cursor = "pointer";

    editar.onclick = function() {
        if (containerTexto.querySelector(".input-editar-tarefa")) return;

        const inputEdicao = document.createElement('input');
        inputEdicao.type = "text";
        inputEdicao.className = "input-editar-tarefa";
        inputEdicao.setAttribute("aria-label", "Nome da tarefa");
        inputEdicao.value = textoSpan.textContent;

        const flexAnterior = containerTexto.style.flex;
        const larguraMinimaAnterior = containerTexto.style.minWidth;
        let edicaoFinalizada = false;

        const finalizarEdicao = function(salvar) {
            if (edicaoFinalizada) return;
            edicaoFinalizada = true;

            const novoNome = inputEdicao.value.trim();
            if (salvar && novoNome) textoSpan.textContent = novoNome;

            containerTexto.replaceChild(textoSpan, inputEdicao);
            containerTexto.style.flex = flexAnterior;
            containerTexto.style.minWidth = larguraMinimaAnterior;
        };

        inputEdicao.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                finalizarEdicao(true);
            } else if (event.key === "Escape") {
                finalizarEdicao(false);
            }
        });
        inputEdicao.addEventListener("blur", function() {
            finalizarEdicao(true);
        });

        containerTexto.style.flex = "1";
        containerTexto.style.minWidth = "0";
        containerTexto.replaceChild(inputEdicao, textoSpan);
        inputEdicao.focus();
        inputEdicao.select();
    };

    const apagar = document.createElement('img');
    apagar.src = "img/lixeira.png";
    apagar.alt = "Botão de apagar tarefa";
    apagar.style.width = "25px";
    apagar.style.cursor = "pointer";

    apagar.onclick = function() {
        habitoNovo.remove();
        MudarBarra('habitos', -1, tipo);

        if (informacoesDeHabitosAdicionados.checagemConcluidos[habitoNovo.id]) {
            MudarBarra('habitosFeitos', -1);
            delete informacoesDeHabitosAdicionados.checagemConcluidos[habitoNovo.id];
        }
    };

    containerTexto.appendChild(textoSpan);
    containerTexto.appendChild(tipoSpan);

    habitoNovo.appendChild(botaoConcluir);
    habitoNovo.appendChild(containerTexto);

    const acoesTarefa = document.createElement('div');
    acoesTarefa.style.display = "flex";
    acoesTarefa.style.alignItems = "center";
    acoesTarefa.style.gap = "4px";
    acoesTarefa.style.marginLeft = "auto";
    acoesTarefa.appendChild(editar);
    acoesTarefa.appendChild(apagar);
    habitoNovo.appendChild(acoesTarefa);

    habitos.appendChild(habitoNovo);
    MudarBarra('habitos', 1, tipo);
}

// Monta o formulário para criar um hábito.
function CriacaoHabito() {
    const estiloModal = {
        position: "fixed",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "rgba(11, 15, 23, 0.72)",
        zIndex: "1000"
    };
    const estiloFormulario = {
        width: "min(500px, 100%)",
        maxHeight: "calc(100vh - 32px)",
        overflowY: "auto",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
    };

    const modal = document.createElement('div');
    modal.id = "modal-criacao-habito";
    adicionarStyle(modal, estiloModal);

    const formulario = document.createElement('form');
    formulario.className = "card-formulario";
    adicionarStyle(formulario, estiloFormulario);

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nomeInput = document.getElementById("InputNomeHabito");
        const nomeHabito = nomeInput ? nomeInput.value.trim() : "";
        if (!nomeHabito) return;

        const selectTipo = document.getElementById("SelectTipoHábito");
        const tipoSelecionado = selectTipo
            ? selectTipo.options[selectTipo.selectedIndex].text.trim()
            : "";

        if (!tipoSelecionado) return;

        AdicionarHabitoNaDiv(nomeHabito, tipoSelecionado);
        modal.remove();
    });

    const camposFormulario = [
        {
            nomeLabel: "Nome do hábito:",
            placeholder: "Digite o hábito...",
            id: "InputNomeHabito",
            tipo: "texto"
        },
        {
            nomeLabel: "Descrição:",
            placeholder: "Digite a descrição...",
            id: "InputDescriçãoHabito",
            tipo: "texto"
        },
        {
            nomeLabel: "Tipo do hábito:",
            id: "SelectTipoHábito",
            opcoes: ["Saúde", "Carreira", "Hobby", "Estudo", "Outro"]
        }
    ];

    for (const campo of camposFormulario) {
        const grupoCampo = document.createElement('div');
        grupoCampo.className = "grupo-campo";

        const label = document.createElement('label');
        label.textContent = campo.nomeLabel;
        label.htmlFor = campo.id;

        if (campo.tipo === "texto") {
            const input = document.createElement('input');
            input.id = campo.id;
            input.type = "text";
            input.placeholder = campo.placeholder;

            grupoCampo.appendChild(label);
            grupoCampo.appendChild(input);
        } else {
            const select = document.createElement('select');
            select.id = campo.id;

            for (const opcaoTipo of campo.opcoes) {
                const opcao = document.createElement("option");
                opcao.value = opcaoTipo;
                opcao.textContent = opcaoTipo;
                select.appendChild(opcao);
            }

            grupoCampo.appendChild(label);
            grupoCampo.appendChild(select);
        }

        formulario.appendChild(grupoCampo);
    }

    const grupoBotoes = document.createElement('div');
    grupoBotoes.className = "acoes-formulario";
    grupoBotoes.style.justifyContent = "center";

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
        modal.remove();
    };

    grupoBotoes.appendChild(botaoCancelar);
    grupoBotoes.appendChild(botaoCriar);
    formulario.appendChild(grupoBotoes);

    modal.appendChild(formulario);
    main.appendChild(modal);
}

// Abre o formulário, sem criar mais de um modal ao mesmo tempo.
function AdicionarHabito() {
    if (document.getElementById("modal-criacao-habito")) return;

    CriacaoHabito();
}

// Alterna entre as telas do aplicativo.
let telaAtiva = document.getElementById("visao-geral");
function AtivarTela(idTela, idBotao) {
    const telaParaAtivar = document.getElementById(idTela);

    if (!telaParaAtivar) return;
    if (telaParaAtivar === telaAtiva) return;

    telaAtiva.style.display = "none";
    telaParaAtivar.style.display = "block";

    const botaoClicado = document.getElementById(idBotao);
    botaoClicado.style.background = "var(--azul-grad)";
    botaoClicado.style.borderColor = "transparent";
    botaoClicado.style.color = "#fff";
    botaoClicado.style.fontWeight = "600";
    botaoClicado.style.boxShadow = "0 0 22px rgba(0, 200, 255, 0.35)";

    const botaoAntigo = document.getElementById(`link-${telaAtiva.id}`);
    botaoAntigo.style.background = 'linear-gradient(180deg, #202a3b, #19212f)';
    botaoAntigo.style.color = 'var(--texto)';
    botaoAntigo.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.35)";

    telaAtiva = telaParaAtivar;
}