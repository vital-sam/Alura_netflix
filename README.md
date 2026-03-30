# 🎬 Netflix Clone — Projeto Vibe Coding

> Uma recriação da interface da Netflix feita do zero, sem frameworks, sem tutoriais passo a passo — só uma ideia, ferramentas de IA e muita tentativa e erro.

---

## 💡 O que é este projeto?

Este é um clone da tela inicial da Netflix feito em **HTML, CSS e JavaScript puro**. Ele simula a experiência de escolher um perfil e navegar por um catálogo de filmes e séries, com vídeos que tocam ao passar o mouse nos cards — igual à Netflix de verdade.

O projeto foi construído do zero por alguém que queria aprender na prática, usando inteligência artificial como parceira de desenvolvimento. Nada de curso. Nada de copiar código pronto. Só a ideia e a vontade de fazer funcionar.

---

## ✨ O que o projeto faz?

- **Tela de seleção de perfis** com 4 personagens, cada um com personalidade própria
- **Catálogo personalizado por perfil** — cada personagem tem seus próprios filmes e séries temáticos
- **Cards de filmes** que reproduzem o trailer ao passar o mouse
- **Barra de busca** que filtra o catálogo enquanto você digita
- **Sino de notificações** com popup de avisos
- **Menu de perfil** com troca de usuário e logout
- **Tema claro/escuro** com alternância pelo botão da lua/sol

---

## 👥 Os 4 Perfis

| Perfil | Personalidade | Catálogo |
|--------|--------------|----------|
| **Nestor** | Eclético · Caótico neutro | Um pouco de tudo — terror, animação, ação |
| **Megan** | Sóbria · Maldosa · Macabra | Horror psicológico, true crime, distopia |
| **Luna** | Pura · Ingênua · Maravilhada | Animação, natureza, documentários tocantes |
| **Kaio** | Explorador · Autoconfiante | Épicos, aventura, superação, adrenalina |

---

## 🗂️ Estrutura de arquivos

```
Site-Netflix
│
├── index.html          ← Tela de seleção de perfis
├── index.js            ← Lógica de clique nos perfis e navegação
├── styles.css          ← Estilos da tela inicial
│
├── Assets/
│   ├── perfil1.jpg     ← Foto do Nestor
│   ├── perfil2.jpg     ← Foto da Megan
│   ├── perfil3.jpg     ← Foto da Luna
│   └── perfil4.jpg     ← Foto do Kaio
│
└── catalogo/
    ├── catalogo.html   ← Tela do catálogo (navbar, cards, footer)
    ├── catalogo.css    ← Estilos do catálogo
    └── js/
        ├── data.js         ← Filmes e séries de cada perfil
        ├── utils.js        ← Funções auxiliares
        ├── main.js         ← Lógica principal (busca, notificações, perfil)
        └── components/
            ├── Card.js      ← Cria cada card de filme
            └── Carousel.js  ← Cria cada fileira de cards
```

---

## 🚀 Como rodar o projeto

> ⚠️ **Importante:** abrir o arquivo pelo duplo clique **não funciona** para os vídeos. O navegador bloqueia o YouTube quando o site é aberto direto do computador. Use o **Live Server**.

### Passo a passo

1. Baixe e instale o [Visual Studio Code](https://code.visualstudio.com/)
2. Abra a pasta do projeto no VS Code
3. Instale a extensão **Live Server**
   - Clique no ícone de extensões (quadradinhos no menu lateral)
   - Pesquise `Live Server`
   - Clique em **Install**
4. Com o arquivo `index.html` aberto, clique em **Go Live** no canto inferior direito
5. O site abre automaticamente em `http://127.0.0.1:5500` — e os vídeos funcionam!

---

## 🤖 Feito com Vibe Coding

Este projeto foi desenvolvido com **vibe coding** — uma forma de programar onde você descreve o que quer em linguagem natural e a IA escreve o código. Sem decorar sintaxe. Sem manual. Só a ideia e a conversa.

Foram usadas várias ferramentas de IA ao longo do processo:

| IA | Participação |
|----|-------------|
| **GitHub Copilot** | Sugestões inline enquanto o código era editado |
| **Google Gemini** | Consultas e geração de trechos de código |
| **ChatGPT** | Explicações e alternativas de implementação |
| **Claude (Anthropic)** | Diagnóstico de bugs, correções precisas e explicações claras |

### Por que o Claude se destacou?

Das ferramentas testadas, o **Claude foi o mais preciso e elucidativo**. Enquanto as outras IAs às vezes geravam código que parecia certo mas não funcionava, ou davam respostas genéricas, o Claude:

- Identificou a causa raiz dos bugs em vez de só corrigir os sintomas
- Explicou **por que** cada problema acontecia, não só como consertar
- Manteve consistência ao longo de uma conversa longa com muitas iterações
- Apontou problemas que nem haviam sido perguntados (como o bloqueio do `localStorage` via `file://` e o erro 153 do YouTube)

---

## 🐛 Problemas que foram resolvidos ao longo do caminho

| Problema | Causa | Solução |
|----------|-------|---------|
| Catálogo não aparecia ao clicar no perfil | Scripts usavam `import/export` (ES Modules), bloqueados no `file://` | Removido `type="module"`, scripts carregados em ordem no HTML |
| Foto do perfil não aparecia no catálogo | `.getAttribute('src')` retorna caminho relativo quebrado | Trocado para `.src` que retorna o caminho absoluto |
| Erro 153 nos vídeos | YouTube bloqueia embedding por `file://` (sem origem) | Solução: usar Live Server (`localhost`) |
| Nome do perfil travado em "Carregando..." | `localStorage` bloqueado pelo Chrome em `file://` | Dados do perfil passados pela URL como parâmetros |
| Catálogo igual para todos os perfis | `main.js` ainda chamava a variável antiga `categories` | Atualizado para `getCatalogo(nomePerfil)` |

---

## 🛠️ Tecnologias usadas

- **HTML5** — estrutura das páginas
- **CSS3** — estilização e animações
- **JavaScript** — toda a lógica (sem frameworks)
- **Font Awesome** — ícones
- **Google Fonts** — tipografia (Roboto)
- **TMDB** — imagens dos posters
- **YouTube Embed API** — trailers nos cards

---

## 📌 Observações

- Os posters vêm da API pública do [TMDB](https://www.themoviedb.org/)
- Os trailers são embeds do YouTube — precisam de conexão com internet
- O projeto é 100% front-end, sem banco de dados ou back-end
- Feito para fins de aprendizado e portfólio

---

*Feito com curiosidade, persistência e muita ajuda da IA* 🤙
