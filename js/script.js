// Elementos e informações usados pela tela.
const habitos = document.getElementById("lista-habitos-hoje");
const vazioHoje = document.getElementById("mensagem-vazio-hoje");
const main = document.getElementById("main-tela");
const filtroChecklist = document.getElementById("filtro-checklist");
const DURACAO_TRANSICAO_CONCLUIR = 500;

const ESTILOS = {
    barraProgresso: porcentagem => ({
        width: `${porcentagem}%`
    }),
    graficoPizza: porcentagem => ({
        background: `conic-gradient(var(--azul) 0% ${porcentagem}%, var(--borda) ${porcentagem}% 100%)`
    }),
    mensagemVaziaOculta: {
        display: "none"
    },
    listaVazia: {
        display: "",
        width: "100%",
        height: "100%"
    },
    listaRestaurada: {
        backgroundColor: "",
        display: "",
        alignItems: "",
        borderRadius: "",
        borderWidth: "",
        borderStyle: "",
        marginTop: "",
        paddingTop: ""
    },
    listaHabitos: {
        backgroundColor: "#131a27",
        alignItems: "center",
        borderRadius: "10px",
        borderWidth: "1px",
        borderStyle: "none",
        marginTop: "5px",
        paddingTop: "8px"
    },
    itemHabito: {
        width: "95%",
        display: "flex",
        margin: "0 auto",
        border: "none"
    },
    containerTexto: {
        display: "flex",
        flexDirection: "column",
        gap: "0",
        marginBottom: "0"
    },
    textoHabito: {
        fontWeight: "bold"
    },
    tipoHabito: {
        fontSize: "0.85em",
        color: "#666"
    },
    botaoConcluir: {
        backgroundColor: "white",
        marginRight: "10px",
        height: "25px",
        width: "25px",
        border: "none",
        borderRadius: "15%",
        cursor: "pointer",
        transition: `all ${DURACAO_TRANSICAO_CONCLUIR}ms ease`
    },
    botaoConcluirFeito: {
        backgroundColor: "#33CCFF"
    },
    iconeEditar: {
        width: "30px",
        cursor: "pointer"
    },
    iconeApagar: {
        width: "25px",
        cursor: "pointer"
    },
    textoEditando: {
        flex: "1",
        minWidth: "0"
    },
    acoesHabito: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        marginLeft: "auto"
    },
    modal: {
        position: "fixed",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "rgba(11, 15, 23, 0.72)",
        zIndex: "1000"
    },
    formularioModal: {
        width: "min(500px, 100%)",
        maxHeight: "calc(100vh - 32px)",
        overflowY: "auto",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
    },
    grupoBotoesFormulario: {
        justifyContent: "center"
    },
    botaoFormulario: {
        flex: "1 1 140px",
        maxWidth: "140px"
    },
    telaInativa: {
        display: "none"
    },
    telaAtiva: {
        display: "block"
    },
    botaoNavegacaoAtivo: {
        background: "var(--azul-grad)",
        borderColor: "transparent",
        color: "#fff",
        fontWeight: "600",
        boxShadow: "0 0 22px rgba(0, 200, 255, 0.35)"
    },
    botaoNavegacaoInativo: {
        background: "linear-gradient(180deg, #202a3b, #19212f)",
        color: "var(--texto)",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.35)"
    }
};

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
    },
    infoHabitos: []
};

let proximoIdHabito = 0;

// Aplica vários estilos a um elemento.
function adicionarStyle(elemento, estilos) {
    for (const propriedade in estilos) {
        elemento.style[propriedade] = estilos[propriedade];
    }
}

function renderizarHabitos(
    concluidas = informacoesDeHabitosAdicionados.checagemConcluidos,
    filtro = filtroChecklist.value
) {
    const listaDeHabitos = informacoesDeHabitosAdicionados.infoHabitos;
    const habitosFiltrados = listaDeHabitos.filter(dadosHabito => {
        const concluido = Boolean(concluidas[dadosHabito.id]);

        if (filtro === "concluidas") return concluido;
        if (filtro === "pendentes") return !concluido;
        return true;
    });

    habitos.replaceChildren(vazioHoje);

    if (listaDeHabitos.length === 0) {
        vazioHoje.textContent = "Nenhuma tarefa cadastrada no checklist. Clique abaixo para adicionar.";
        adicionarStyle(vazioHoje, ESTILOS.listaVazia);
        adicionarStyle(habitos, ESTILOS.listaRestaurada);
        return;
    }

    if (habitosFiltrados.length === 0) {
        vazioHoje.textContent = filtro === "concluidas"
            ? "Nenhuma tarefa concluída."
            : "Nenhuma tarefa pendente.";
        adicionarStyle(vazioHoje, ESTILOS.listaVazia);
        adicionarStyle(habitos, ESTILOS.listaRestaurada);
        return;
    }

    adicionarStyle(vazioHoje, ESTILOS.mensagemVaziaOculta);
    adicionarStyle(habitos, ESTILOS.listaHabitos);

    for (const dadosHabito of habitosFiltrados) {
        const habitoNovo = document.createElement('li');
        habitoNovo.id = dadosHabito.id;
        adicionarStyle(habitoNovo, ESTILOS.itemHabito);

        const containerTexto = document.createElement('div');
        containerTexto.className = "grupo-campo";
        adicionarStyle(containerTexto, ESTILOS.containerTexto);

        const textoSpan = document.createElement('span');
        textoSpan.textContent = dadosHabito.nome;
        adicionarStyle(textoSpan, ESTILOS.textoHabito);

        const tipoSpan = document.createElement('span');
        tipoSpan.textContent = dadosHabito.tipo;
        adicionarStyle(tipoSpan, ESTILOS.tipoHabito);

        const botaoConcluir = document.createElement('button');
        adicionarStyle(botaoConcluir, {
            ...ESTILOS.botaoConcluir,
            ...(concluidas[dadosHabito.id] ? ESTILOS.botaoConcluirFeito : {})
        });

        let timeoutRenderizacaoFiltro;
        botaoConcluir.onclick = function() {
            const concluidoAgora = !concluidas[dadosHabito.id];

            if (concluidoAgora) {
                concluidas[dadosHabito.id] = true;
                MudarBarra('habitosFeitos', 1);
            } else {
                delete concluidas[dadosHabito.id];
                MudarBarra('habitosFeitos', -1);
            }

            adicionarStyle(
                this,
                concluidoAgora
                    ? ESTILOS.botaoConcluirFeito
                    : ESTILOS.botaoConcluir
            );

            clearTimeout(timeoutRenderizacaoFiltro);
            const filtroAtual = filtroChecklist.value;
            const deveOcultar =
                (filtroAtual === "concluidas" && !concluidoAgora) ||
                (filtroAtual === "pendentes" && concluidoAgora);

            if (deveOcultar) {
                timeoutRenderizacaoFiltro = setTimeout(
                    () => renderizarHabitos(concluidas),
                    DURACAO_TRANSICAO_CONCLUIR
                );
            }
        };

        const editar = document.createElement('img');
        editar.src = "img/editar.png";
        editar.alt = "Botão de editar tarefa";
        adicionarStyle(editar, ESTILOS.iconeEditar);

        editar.onclick = function() {
            if (containerTexto.querySelector(".input-editar-tarefa")) return;

            const inputEdicao = document.createElement('input');
            inputEdicao.type = "text";
            inputEdicao.className = "input-editar-tarefa";
            inputEdicao.setAttribute("aria-label", "Nome da tarefa");
            inputEdicao.value = textoSpan.textContent;

            const estilosAnteriores = {
                flex: containerTexto.style.flex,
                minWidth: containerTexto.style.minWidth
            };
            let edicaoFinalizada = false;

            const finalizarEdicao = function(salvar) {
                if (edicaoFinalizada) return;
                edicaoFinalizada = true;

                const novoNome = inputEdicao.value.trim();
                if (salvar && novoNome) {
                    dadosHabito.nome = novoNome;
                    textoSpan.textContent = novoNome;
                }

                containerTexto.replaceChild(textoSpan, inputEdicao);
                adicionarStyle(containerTexto, estilosAnteriores);
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

            adicionarStyle(containerTexto, ESTILOS.textoEditando);
            containerTexto.replaceChild(inputEdicao, textoSpan);
            inputEdicao.focus();
            inputEdicao.select();
        };

        const apagar = document.createElement('img');
        apagar.src = "img/lixeira.png";
        apagar.alt = "Botão de apagar tarefa";
        adicionarStyle(apagar, ESTILOS.iconeApagar);

        apagar.onclick = function() {
            const indiceHabito = listaDeHabitos.findIndex(
                habito => habito.id === dadosHabito.id
            );
            if (indiceHabito === -1) return;

            const estavaConcluido = Boolean(concluidas[dadosHabito.id]);
            listaDeHabitos.splice(indiceHabito, 1);
            delete concluidas[dadosHabito.id];
            MudarBarra('habitos', -1, dadosHabito.tipo);

            if (estavaConcluido) {
                MudarBarra('habitosFeitos', -1);
            }

            renderizarHabitos(concluidas);
        };

        containerTexto.appendChild(textoSpan);
        containerTexto.appendChild(tipoSpan);

        habitoNovo.appendChild(botaoConcluir);
        habitoNovo.appendChild(containerTexto);

        const acoesTarefa = document.createElement('div');
        adicionarStyle(acoesTarefa, ESTILOS.acoesHabito);
        acoesTarefa.appendChild(editar);
        acoesTarefa.appendChild(apagar);
        habitoNovo.appendChild(acoesTarefa);

        habitos.appendChild(habitoNovo);
    }
}

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

    adicionarStyle(tamanhoBarra, ESTILOS.barraProgresso(porcentagem));
    adicionarStyle(graficoPizza, ESTILOS.graficoPizza(porcentagem));

    if (informacoesDeHabitosAdicionados.habitos === 0) {
        adicionarStyle(vazioHoje, ESTILOS.listaVazia);
        adicionarStyle(habitos, ESTILOS.listaRestaurada);
    }
}

function AdicionarHabito(nomeHabito, tipo) {
    const novoHabito = {
        id: `habito${proximoIdHabito++}`,
        nome: nomeHabito,
        tipo
    };

    informacoesDeHabitosAdicionados.infoHabitos.push(novoHabito);
    MudarBarra('habitos', 1, tipo);
    renderizarHabitos();
}

function CriarHabito() {
    if (document.getElementById("modal-criacao-habito")) return;

    const modal = document.createElement('div');
    modal.id = "modal-criacao-habito";
    adicionarStyle(modal, ESTILOS.modal);

    const formulario = document.createElement('form');
    formulario.className = "card-formulario";
    adicionarStyle(formulario, ESTILOS.formularioModal);

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

        AdicionarHabito(nomeHabito, tipoSelecionado);
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
    adicionarStyle(grupoBotoes, ESTILOS.grupoBotoesFormulario);

    const botaoCriar = document.createElement('button');
    botaoCriar.type = "submit";
    botaoCriar.className = "btn-primario";
    botaoCriar.textContent = "Criar";
    adicionarStyle(botaoCriar, ESTILOS.botaoFormulario);

    const botaoCancelar = document.createElement('button');
    botaoCancelar.type = "button";
    botaoCancelar.className = "btn-neutro";
    botaoCancelar.textContent = "Cancelar";
    adicionarStyle(botaoCancelar, ESTILOS.botaoFormulario);

    botaoCancelar.onclick = function() {
        modal.remove();
    };

    grupoBotoes.appendChild(botaoCancelar);
    grupoBotoes.appendChild(botaoCriar);
    formulario.appendChild(grupoBotoes);

    modal.appendChild(formulario);
    main.appendChild(modal);
}

let telaAtiva = document.getElementById("visao-geral");
function AtivarTela(idTela, idBotao) {
    const telaParaAtivar = document.getElementById(idTela);

    if (!telaParaAtivar) return;
    if (telaParaAtivar === telaAtiva) return;

    adicionarStyle(telaAtiva, ESTILOS.telaInativa);
    adicionarStyle(telaParaAtivar, ESTILOS.telaAtiva);

    const botaoClicado = document.getElementById(idBotao);
    adicionarStyle(botaoClicado, ESTILOS.botaoNavegacaoAtivo);

    const botaoAntigo = document.getElementById(`link-${telaAtiva.id}`);
    adicionarStyle(botaoAntigo, ESTILOS.botaoNavegacaoInativo);

    telaAtiva = telaParaAtivar;
}

filtroChecklist.addEventListener("change", function() {
    renderizarHabitos(informacoesDeHabitosAdicionados.checagemConcluidos, this.value);
});