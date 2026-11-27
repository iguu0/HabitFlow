(function () {
  var modal = document.getElementById('modal');
  if (!modal) return;

  var USUARIOS = 'habitflow_usuarios';   
  var SESSAO   = 'habitflow_usuario';    

  var form = document.getElementById('form-auth');
  var erro = document.getElementById('auth-erro');
  var modo = 'login';

  function ler(chave, padrao) {
    try { return JSON.parse(localStorage.getItem(chave)) || padrao; } catch (e) { return padrao; }
  }
  function gravar(chave, valor) {
    try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) {}
  }

  function definirModo(novo) {
    modo = novo;
    var cad = modo === 'cadastro';
    document.getElementById('modal-caixa').classList.toggle('modo-cadastro', cad);
    document.getElementById('aba-login').classList.toggle('ativa', !cad);
    document.getElementById('aba-cadastro').classList.toggle('ativa', cad);
    document.getElementById('btn-enviar').textContent = cad ? 'Criar conta' : 'Entrar';
    document.getElementById('modal-titulo').textContent = cad ? 'Crie sua conta' : 'Acesse sua conta';
    document.getElementById('modal-sub').textContent = cad
      ? 'Preencha os dados para começar a construir seus hábitos.'
      : 'Entre com seu e-mail e senha.';
    document.getElementById('auth-senha').autocomplete = cad ? 'new-password' : 'current-password';
    erro.textContent = '';
  }

  function abrir(m) {
    definirModo(m || 'login');
    modal.classList.add('aberto');
    setTimeout(function () {
      document.getElementById(modo === 'cadastro' ? 'auth-nome' : 'auth-email').focus();
    }, 50);
  }
  function fechar() { modal.classList.remove('aberto'); form.reset(); erro.textContent = ''; }

  document.getElementById('btn-login').addEventListener('click', function () { abrir('login'); });
  document.getElementById('btn-fechar').addEventListener('click', fechar);
  document.getElementById('aba-login').addEventListener('click', function () { definirModo('login'); });
  document.getElementById('aba-cadastro').addEventListener('click', function () { definirModo('cadastro'); });
  modal.addEventListener('click', function (e) { if (e.target === modal) fechar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = document.getElementById('auth-nome').value.trim();
    var email = document.getElementById('auth-email').value.trim().toLowerCase();
    var senha = document.getElementById('auth-senha').value;
    var usuarios = ler(USUARIOS, []);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { erro.textContent = 'Informe um e-mail válido.'; return; }
    if (senha.length < 4) { erro.textContent = 'A senha deve ter pelo menos 4 caracteres.'; return; }

    var usuario;
    if (modo === 'cadastro') {
      if (!nome) { erro.textContent = 'Informe seu nome.'; return; }
      if (usuarios.some(function (u) { return u.email === email; })) {
        erro.textContent = 'Já existe uma conta com esse e-mail.'; return;
      }
      usuario = { nome: nome, email: email, senha: btoa(unescape(encodeURIComponent(senha))) };
      usuarios.push(usuario);
      gravar(USUARIOS, usuarios);
    } else {
      var cod = btoa(unescape(encodeURIComponent(senha)));
      usuario = usuarios.filter(function (u) { return u.email === email && u.senha === cod; })[0];
      if (!usuario) { erro.textContent = 'E-mail ou senha incorretos.'; return; }
    }

    gravar(SESSAO, { nome: usuario.nome, email: usuario.email });
    window.location.href = 'app.html';
  });
})();


/* =====================================================================
   APP (app.html)
   ===================================================================== */
// Elementos e informações usados pela tela.
const habitos = document.getElementById("lista-habitos-hoje");
const vazioHoje = document.getElementById("mensagem-vazio-hoje");
const main = document.getElementById("main-tela");
const filtroChecklist = document.getElementById("filtro-checklist");
let textoPesquisa = "";
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
        justifyContent: "flex-end"
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
    filtro = filtroChecklist.value,
    pesquisa = textoPesquisa
) {
    // O mapa "concluidas" registra quais hábitos foram marcados; o filtro vem do seletor da tela.
    const listaDeHabitos = informacoesDeHabitosAdicionados.infoHabitos;
    const termoPesquisa = pesquisa.trim().toLowerCase();
    const habitosFiltrados = listaDeHabitos.filter(dadosHabito => {
        const concluido = Boolean(concluidas[dadosHabito.id]);

        // Decide quais hábitos aparecem, sem apagar do cadastro os que ficam fora do filtro.
        if (filtro === "concluidas" && !concluido) return false;
        if (filtro === "pendentes" && concluido) return false;

        return termoPesquisa === "" ||
            dadosHabito.nome.toLowerCase().includes(termoPesquisa);
    });

    // Remove os itens antigos e mantém a mensagem disponível para quando a lista ficar vazia.
    habitos.replaceChildren(vazioHoje);

    if (listaDeHabitos.length === 0) {
        // Mostra a mensagem padrão quando ainda não existe nenhum hábito cadastrado.
        vazioHoje.textContent = "Nenhuma tarefa cadastrada no checklist. Clique abaixo para adicionar.";
        adicionarStyle(vazioHoje, ESTILOS.listaVazia);
        adicionarStyle(habitos, ESTILOS.listaRestaurada);
        return;
    }

    if (habitosFiltrados.length === 0) {
        // Informa quando há hábitos, mas nenhum corresponde ao filtro escolhido.
        vazioHoje.textContent = termoPesquisa !== ""
            ? "Nenhuma tarefa encontrada."
            : filtro === "concluidas"
                ? "Nenhuma tarefa concluída."
                : filtro === "pendentes"
                    ? "Nenhuma tarefa pendente."
                    : "Nenhuma tarefa cadastrada.";
        adicionarStyle(vazioHoje, ESTILOS.listaVazia);
        adicionarStyle(habitos, ESTILOS.listaRestaurada);
        return;
    }

    adicionarStyle(vazioHoje, ESTILOS.mensagemVaziaOculta);
    adicionarStyle(habitos, ESTILOS.listaHabitos);

    // Cria novamente na tela cada hábito que passou pelo filtro.
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
        // Mantém tamanho e animação e acrescenta o azul se o hábito já estiver concluído.
        adicionarStyle(botaoConcluir, {
            ...ESTILOS.botaoConcluir,
            ...(concluidas[dadosHabito.id] ? ESTILOS.botaoConcluirFeito : {})
        });

        let timeoutRenderizacaoFiltro;
        botaoConcluir.onclick = function() {
            const concluidoAgora = !concluidas[dadosHabito.id];

            // Salva a nova confirmação e atualiza os números do progresso.
            if (concluidoAgora) {
                concluidas[dadosHabito.id] = true;
                MudarBarra('habitosFeitos', 1);
            } else {
                delete concluidas[dadosHabito.id];
                MudarBarra('habitosFeitos', -1);
            }

            // Muda a cor no próprio botão para deixar a animação acontecer.
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
                // Só redesenha depois da animação se o hábito não pertencer mais ao filtro atual.
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
            // Evita abrir vários campos de edição para o mesmo hábito.
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

            // Salva ou cancela a edição e restaura o layout do texto.
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
                renderizarHabitos(concluidas);
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
            // Retira o hábito dos dados salvos; a lista será reconstruída logo depois.
            const indiceHabito = listaDeHabitos.findIndex(
                habito => habito.id === dadosHabito.id
            );
            if (indiceHabito === -1) return;

            const estavaConcluido = Boolean(concluidas[dadosHabito.id]);
            listaDeHabitos.splice(indiceHabito, 1);
            delete concluidas[dadosHabito.id];
            MudarBarra('habitos', -1, dadosHabito.tipo);

            // Se estava concluído, também remove essa conclusão dos contadores.
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

        // Coloca o hábito pronto na lista visível.
        habitos.appendChild(habitoNovo);
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

    adicionarStyle(tamanhoBarra, ESTILOS.barraProgresso(porcentagem));
    adicionarStyle(graficoPizza, ESTILOS.graficoPizza(porcentagem));

    if (informacoesDeHabitosAdicionados.habitos === 0) {
        adicionarStyle(vazioHoje, ESTILOS.listaVazia);
        adicionarStyle(habitos, ESTILOS.listaRestaurada);
    }
}

// Salva os dados do hábito e atualiza a lista renderizada.
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

// Abre o formulário, sem criar mais de um modal ao mesmo tempo.
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

// Alterna entre as telas do aplicativo.
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

const inputPesquisa = document.getElementById("campo-nova-tarefa");
inputPesquisa.addEventListener("input", function() {
    textoPesquisa = this.value;
    renderizarHabitos(informacoesDeHabitosAdicionados.checagemConcluidos,filtroChecklist.value);
});