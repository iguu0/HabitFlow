# 🌱 HabitFlow — Portal de Monitoramento de Hábitos e Produtividade

O **HabitFlow** é um portal de monitoramento de hábitos e produtividade desenvolvido para ajudar os usuários a organizarem suas rotinas, acompanharem seus hábitos diários e gerenciarem suas tarefas de maneira simples e intuitiva.

A plataforma reúne ferramentas de acompanhamento de hábitos e organização de atividades em um único ambiente, permitindo visualizar o progresso e desenvolver uma rotina mais produtiva.

## 🎯 1. Objetivo do Projeto

Desenvolver uma aplicação web que permita aos usuários cadastrar e monitorar hábitos, organizar tarefas diárias e acompanhar seu progresso por meio de indicadores visuais.

O HabitFlow busca incentivar a disciplina, a organização pessoal e a construção de hábitos positivos.

## 👥 2. Público-alvo

O projeto é direcionado a:

- Estudantes que desejam organizar seus estudos e atividades.
- Profissionais que buscam melhorar sua produtividade.
- Pessoas interessadas em desenvolver hábitos saudáveis.
- Usuários que desejam organizar suas tarefas e acompanhar sua evolução pessoal.

## ❗ 3. Problema que a Solução Pretende Resolver

Muitas pessoas enfrentam dificuldades para manter uma rotina consistente, organizar suas tarefas e acompanhar o desenvolvimento de seus hábitos.

A falta de organização e de ferramentas para monitorar o progresso pode comprometer a produtividade e dificultar o alcance de objetivos pessoais.

O HabitFlow pretende solucionar esse problema oferecendo um portal centralizado para gerenciamento de hábitos, acompanhamento de atividades e visualização do progresso diário.

## 🖥️ 4. Planejamento e Organização das Interfaces

A aplicação está organizada em quatro áreas principais, acessíveis por meio de uma barra lateral de navegação (Sidebar).

### 4.1. Visão Geral

Tela inicial responsável por apresentar um resumo do desempenho diário do usuário.

**Elementos da interface:**
- Barra de progresso geral dos hábitos.
- Percentual de conclusão diária.
- Contador de hábitos realizados e total de hábitos cadastrados.
- Lista de hábitos do dia.
- Atalho para adicionar um novo hábito.

### 4.2. Meus Hábitos

Área destinada ao gerenciamento dos hábitos cadastrados pelo usuário.

**Funcionalidades previstas:**
- Cadastro de novos hábitos.
- Edição de hábitos existentes.
- Listagem dos hábitos cadastrados.
- Exclusão de hábitos.
- Busca por nome.
- Filtro por categoria.
- Gerenciamento de categorias.
- Definição de metas diárias ou semanais.
- Configuração da frequência dos hábitos.

**Indicadores apresentados:**
- Quantidade de hábitos ativos.
- Quantidade de categorias.
- Total de dias acumulados.

### 4.3. Meu Checklist

Área destinada à organização e ao acompanhamento de tarefas.

**Funcionalidades previstas:**
- Adição de novas tarefas.
- Marcação de tarefas como concluídas.
- Visualização de tarefas pendentes.
- Filtro entre tarefas concluídas e pendentes.
- Barra de progresso do checklist.
- Contador de tarefas concluídas e totais.

### 4.4. Perfil

Área destinada à apresentação das informações básicas do usuário.

**Elementos da interface:**
- Nome do usuário.
- Status da conta.

## 🗺️ 5. Navegação da Aplicação

A navegação principal é realizada por meio de uma barra lateral (Sidebar), que permite acessar as quatro áreas do sistema.

| Área | Identificador |
|---|---|
| Visão Geral | `#visao-geral` |
| Meus Hábitos | `#meus-habitos` |
| Meu Checklist | `#meu-checklist` |
| Perfil | `#perfil` |

A aplicação também possui uma barra superior (Topbar), contendo uma saudação personalizada e um campo de busca global.

<badge color="success">Concluído</badge> A estrutura de navegação entre as quatro áreas principais já foi desenvolvida.

## 🎨 6. Identidade Visual

A identidade visual do HabitFlow busca transmitir organização, equilíbrio, produtividade e evolução pessoal.

**Diretrizes visuais:**

- Interface limpa e intuitiva.
- Organização das informações em cartões.
- Barras de progresso para acompanhamento visual.
- Elementos de fácil identificação.
- Navegação lateral para facilitar o acesso às funcionalidades.
- Layout adaptável a diferentes tamanhos de tela.

A proposta visual prioriza uma experiência simples, agradável e funcional.

## 🏗️ 7. Estrutura do Projeto

O projeto está organizado da seguinte maneira:

```text
HabitFlow/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── README.md
```

**Descrição dos arquivos:**

| Arquivo/Pasta | Responsabilidade |
|---|---|
| `index.html` | Tela inicial.. |
| `app.html` | Estrutura e organização dos elementos da aplicação. |
| `css/style.css` | Estilização, layout e identidade visual do sistema. |
| `js/script.js` | Lógica, interações e funcionalidades da aplicação. |
| `README.md` | Documentação e planejamento do projeto. |

## ⚙️ 8. Tecnologias Utilizadas

- **HTML5:** construção da estrutura e organização dos elementos da aplicação.
- **CSS3:** estilização, layout e identidade visual.
- **JavaScript:** implementação das funcionalidades, interações e manipulação dinâmica dos elementos.

## 🚀 9. Funcionalidades Implementadas e Pendentes

### Funcionalidades implementadas

- [x] Estrutura inicial das quatro áreas principais.
- [x] Navegação básica entre as áreas.
- [x] Estrutura visual do Dashboard.
- [x] Interface de gerenciamento de hábitos.
- [x] Criação dinâmica de formulário para cadastro de hábitos.
- [x] Campo para informar o nome do hábito.
- [x] Campo para informar a descrição do hábito.
- [x] Seleção de categoria.
- [x] Validação para impedir cadastro com nome vazio.
- [x] Inserção dinâmica de hábitos na lista da Visão Geral.
- [x] Botão para marcar e desmarcar hábitos como concluídos.
- [x] Fechamento automático do formulário após o cadastro.
- [x] Prevenção de abertura de formulários duplicados.
- [x] Estrutura visual do checklist.
- [x] Interface de perfil do usuário.

### Funcionalidades pendentes

- [ ] Implementação completa da edição e exclusão de hábitos.
- [ ] Integração dos dados de descrição e categoria na listagem.
- [ ] Atualização automática da barra de progresso geral.
- [ ] Atualização dos indicadores de hábitos ativos e dias acumulados.
- [ ] Implementação completa do gerenciamento de tarefas.
- [ ] Atualização automática do progresso do checklist.
- [ ] Implementação de filtros e buscas funcionais.
- [ ] Armazenamento persistente dos dados.
- [ ] Aprimoramento da responsividade.

## 📦 10. Escopo da Primeira Entrega

A primeira versão do HabitFlow tem como objetivo apresentar a estrutura inicial da aplicação, a identidade visual e a navegação entre as principais áreas do sistema.

Nesta etapa, foram desenvolvidos:

- Estrutura inicial do projeto.
- Organização das quatro interfaces principais.
- Navegação básica entre as áreas.
- Proposta inicial de identidade visual.
- Formulário dinâmico para cadastro de hábitos.
- Inserção de hábitos na interface.
- Interação para marcar hábitos como concluídos.

A entrega busca demonstrar pelo menos 20% do escopo obrigatório, apresentando uma versão inicial executável e funcionalidades que representam a proposta central da aplicação.

## ▶️ 11. Como Executar o Projeto

1. Clone este repositório:

```bash
git clone https://github.com/iguu0/HabitFlow.git
```

2. Acesse a pasta do projeto:

```bash
cd HabitFlow
```

3. Abra o arquivo `index.html` em seu navegador.

Não é necessária a instalação de dependências adicionais para executar a estrutura inicial.

## 📌 12. Status do Projeto

🚧 **Em desenvolvimento — Primeira versão.**

O HabitFlow encontra-se em fase de desenvolvimento, com sua estrutura principal e navegação organizadas. As funcionalidades de cadastro e acompanhamento inicial de hábitos já começaram a ser implementadas.

As próximas etapas envolvem aprimorar o gerenciamento de hábitos, implementar o checklist e integrar os indicadores de produtividade.

---

**HabitFlow — Construa os seus hábitos. Transforme sua rotina! 🌱**
