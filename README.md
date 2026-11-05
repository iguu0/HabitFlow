# 🌱 HabitFlow — Portal de Monitoramento de Hábitos e Produtividade

O **HabitFlow** é um portal de monitoramento de hábitos e produtividade desenvolvido para ajudar os usuários a organizarem suas rotinas, acompanharem seus hábitos diários e gerenciarem suas tarefas de maneira simples e intuitiva.

A plataforma reúne ferramentas de acompanhamento de hábitos e organização de atividades em um único ambiente, permitindo visualizar o progresso e manter uma rotina mais produtiva.

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

Muitas pessoas possuem dificuldades para manter uma rotina consistente, organizar suas tarefas e acompanhar o desenvolvimento de seus hábitos.

A falta de organização e de ferramentas para monitorar o progresso pode comprometer a produtividade e dificultar o alcance de objetivos pessoais.

O HabitFlow pretende solucionar esse problema oferecendo um portal centralizado para gerenciamento de hábitos, acompanhamento de atividades e visualização do progresso diário.

## 🖥️ 4. Planejamento e Organização das Interfaces

A aplicação está organizada em quatro áreas principais, acessíveis por meio de uma barra lateral de navegação.

### 4.1. Visão Geral

É a tela inicial da aplicação, responsável por apresentar um resumo do desempenho diário do usuário.

**Elementos da interface:**
- Barra de progresso geral dos hábitos.
- Percentual de conclusão diária.
- Contador de hábitos realizados e total de hábitos cadastrados.
- Lista de hábitos do dia.
- Atalho para adicionar um novo hábito.

### 4.2. Meus Hábitos

Área destinada ao gerenciamento dos hábitos cadastrados pelo usuário.

**Funcionalidades:**
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

**Funcionalidades:**
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

A navegação principal é realizada por meio de uma barra lateral (Sidebar), que permite acessar as quatro áreas do sistema:

| Área | Identificador |
|---|---|
| Visão Geral | `#visao-geral` |
| Meus Hábitos | `#meus-habitos` |
| Meu Checklist | `#meu-checklist` |
| Perfil | `#perfil` |

A aplicação também possui uma barra superior (Topbar), contendo uma saudação personalizada e um campo de busca global.

## 🎨 6. Identidade Visual

A identidade visual do HabitFlow foi planejada para transmitir organização, equilíbrio, produtividade e evolução pessoal.

**Diretrizes visuais:**

- Interface limpa e intuitiva.
- Organização das informações em cartões.
- Barras de progresso para acompanhamento visual.
- Elementos de fácil identificação.
- Navegação lateral para facilitar o acesso às funcionalidades.
- Layout adaptável a diferentes tamanhos de tela.

A proposta visual prioriza uma experiência simples, agradável e funcional, permitindo que o usuário acompanhe suas atividades sem dificuldades.

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
| `index.html` | Estrutura das páginas e elementos da aplicação. |
| `css/style.css` | Estilização e identidade visual do sistema. |
| `js/script.js` | Lógica, interações e funcionalidades da aplicação. |
| `README.md` | Documentação e planejamento do projeto. |

## ⚙️ 8. Tecnologias Utilizadas

- **HTML5:** construção da estrutura e organização dos elementos da aplicação.
- **CSS3:** estilização, layout e identidade visual.
- **JavaScript:** implementação das funcionalidades, interações e manipulação dinâmica dos dados.

## 🚀 9. Escopo de Desenvolvimento

O desenvolvimento será realizado gradualmente, priorizando inicialmente a estrutura e as funcionalidades essenciais do portal.

**Funcionalidades previstas:**

- [x] Estrutura inicial das quatro áreas principais.
- [x] Navegação básica entre as áreas.
- [x] Estrutura do dashboard de visão geral.
- [x] Interface de gerenciamento de hábitos.
- [x] Formulário de cadastro e edição de hábitos.
- [x] Estrutura visual do checklist.
- [x] Interface de perfil do usuário.
- [ ] Implementação completa do gerenciamento de hábitos.
- [ ] Atualização dinâmica dos indicadores de progresso.
- [ ] Implementação completa do checklist.
- [ ] Persistência dos dados cadastrados.
- [ ] Aprimoramento da responsividade.

*As marcações devem ser atualizadas conforme as funcionalidades forem efetivamente implementadas e testadas.*

## 📦 10. Entregável — Primeira Versão

A primeira versão do HabitFlow contempla a estrutura inicial da aplicação, a organização das quatro áreas principais e a proposta de navegação entre as interfaces.

O objetivo desta etapa é apresentar uma versão executável do portal, demonstrando a organização do projeto, sua identidade visual inicial e o desenvolvimento de pelo menos 20% do escopo obrigatório.

**Entregáveis desta etapa:**

- Estrutura inicial do projeto.
- Organização das interfaces.
- Navegação básica entre as áreas.
- Proposta inicial de identidade visual.
- Documentação do planejamento e da organização das interfaces.

## ▶️ 11. Como Executar o Projeto

1. Clone este repositório:

```bash
git clone https://github.com/iguu0/HabitFlow.git
```

2. Entre na pasta do projeto:

```bash
cd HabitFlow
```

3. Abra o arquivo `index.html` em seu navegador.

Não é necessária a instalação de dependências ou ferramentas adicionais para executar a versão inicial.

## 📌 12. Status do Projeto

🚧 **Em desenvolvimento — Primeira versão.**

O HabitFlow encontra-se em fase de desenvolvimento, com foco na implementação das funcionalidades de gerenciamento de hábitos, organização de tarefas e acompanhamento da produtividade.

---

**HabitFlow — Construa os seus hábitos. Transforme sua rotina! 🌱**
