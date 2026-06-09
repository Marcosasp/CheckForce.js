<div align="center">
  <h1>🔐 CheckForce.js</h1>
  <p><strong>Biblioteca de validação e análise de força de senha com interface premium</strong></p>
  <p>
    <img src="https://img.shields.io/badge/versão-3.0.0--alpha1-7c3aed?style=flat-square" alt="versão">
    <img src="https://img.shields.io/badge/licença-MIT-22c55e?style=flat-square" alt="licença">
    <img src="https://img.shields.io/badge/Webpack-5-2563eb?style=flat-square" alt="webpack 5">
    <img src="https://img.shields.io/badge/testes-Karma%2FMocha-f59e0b?style=flat-square" alt="testes">
  </p>
</div>

---

## Sobre o Projeto

O **CheckForce.js** é uma biblioteca JavaScript para validação e análise de força de senhas em tempo real. Na versão 3, o arquivo Bundle (`checkforce.bundle.min.js`) é completamente **autossuficiente**: ele traz embutidas todas as dependências necessárias — o [Popper.js](https://popper.js.org/) para o posicionamento de tooltips, o [Zxcvbn](https://github.com/dropbox/zxcvbn) para análise estatística de entropia, e as validações por expressões regulares para contagem de maiúsculas, minúsculas, números e caracteres especiais.

Nenhuma instalação extra de dependências é necessária para o uso do bundle.

---

## ✨ Interface Premium (Demo)

O projeto inclui uma página de demonstração (`index.html`) com uma UI de alto nível, pensada como vitrine do que a biblioteca é capaz de oferecer:

- **Modo Escuro com Efeitos Neon** — fundo escuro com orbs animados em gradiente roxo/azul e grade mesh sutil, criando profundidade sem distração.
- **Glassmorphism** — card central com `backdrop-filter: blur`, bordas translúcidas e reflexo interno, no padrão premium de design moderno.
- **Barra de Força Dinâmica** — cresce e muda de cor com transição suave entre quatro níveis: `Fraca` (vermelho), `Média` (amarelo), `Forte` (verde) e `Muito Forte` (azul celeste).
- **Estimativa de Tempo de Quebra** — exibe em tempo real o tempo estimado para quebrar a senha por força bruta, alimentado pelo motor de entropia do `zxcvbn` (ex: *"Tempo estimado para quebrar: 3 séculos"*).
- **Gerador de Senha Forte** — botão `⚡ Gerar Senha` que cria automaticamente uma senha de 12 caracteres com mix de todos os tipos, já satisfazendo todos os critérios de validação.
- **Copiar para Área de Transferência** — botão `📋 Copiar` com feedback visual animado ("Copiado!") ao salvar a senha no clipboard.
- **Checklist de Requisitos** — quatro blocos com progresso individual (ex: `1 / 1`, `2 / 2`) que acendem em verde ao serem satisfeitos, com animação de micro-interação.
- **Nível "Muito Forte"** — ativado quando todos os 4 requisitos são atendidos **e** o `zxcvbn` retorna `score === 4`, exibindo a barra em azul celeste (`#38bdf8`).

---

## 🔒 Critérios de Validação

Os critérios seguem um padrão amigável e realista de mercado, configurados para não intimidar o usuário final:

| Critério | Mínimo exigido |
|---|---|
| Letras maiúsculas (A–Z) | **1** |
| Letras minúsculas (a–z) | **1** |
| Números (0–9) | **2** |
| Caracteres especiais (!@#...) | **1** |

O método `checkPasswordOnlyTest()` retorna as **contagens brutas** de cada categoria, permitindo que você aplique seus próprios limiares na interface.

---

## 📦 Instalação

### Via NPM

```sh
npm install checkforce.js --save
```

> **Atenção:** se houver conflitos de peerDependencies durante a instalação local em modo de desenvolvimento, use a flag `--legacy-peer-deps`:
>
> ```sh
> npm install --legacy-peer-deps
> ```

### Via arquivo local

Copie o arquivo de distribuição gerado para o seu projeto e referencie no HTML.

---

## 🚀 Uso

### Bundle autossuficiente (recomendado)

Inclua um único arquivo — todas as dependências já estão embutidas:

```html
<!-- Versão de desenvolvimento -->
<script src="dist/checkforce.bundle.js"></script>

<!-- Versão de produção (minificada) -->
<script src="dist/checkforce.bundle.min.js"></script>
```

### Versão standalone (dependências externas)

Use se preferir controlar as versões de Popper e Zxcvbn separadamente:

```html
<script src="path/to/popper.min.js"></script>
<script src="path/to/zxcvbn.min.js"></script>
<script src="dist/checkforce.min.js"></script>
```

### Inicialização

```html
<input type="password" id="minha-senha">

<script src="dist/checkforce.bundle.min.js"></script>
<script>
  // window.CheckForce aponta diretamente para a classe (UMD + libraryExport: 'default')
  const checker = new CheckForce('#minha-senha');

  document.getElementById('minha-senha').addEventListener('input', () => {
    const resultado = checker.checkPasswordOnlyTest();

    console.log(resultado.uppercaseCheck.lengthUppercase); // nº de maiúsculas
    console.log(resultado.lowercaseCheck.lengthLowercase); // nº de minúsculas
    console.log(resultado.numberCheck.lengthNumber);       // nº de dígitos
    console.log(resultado.charsSpecialCheck.lengthChars);  // nº de especiais
  });
</script>
```

### Retorno de `checkPasswordOnlyTest()`

```js
{
  uppercaseCheck: {
    lengthUppercase: Number,  // contagem de letras maiúsculas
    haveUppercase:   Boolean  // true se houver ao menos uma
  },
  lowercaseCheck: {
    lengthLowercase: Number,
    haveLowercase:   Boolean
  },
  numberCheck: {
    lengthNumber: Number
  },
  charsSpecialCheck: {
    lengthChars: Number
  }
}
```

---

## 📁 Arquivos de Distribuição

| Arquivo | Popper.js | Zxcvbn | Indicado para |
|---|---|---|---|
| `checkforce.bundle.js` | ✅ Incluído | ✅ Incluído | Uso direto no browser, projetos sem bundler |
| `checkforce.bundle.min.js` | ✅ Incluído | ✅ Incluído | **Produção** — arquivo principal do pacote NPM |
| `checkforce.js` | — | — | Projetos com bundler próprio (Webpack, Vite…) |
| `checkforce.min.js` | — | — | Produção standalone com deps externas |

> O campo `"main"` do `package.json` aponta para `dist/checkforce.bundle.min.js`.

---

## 🛠️ Comandos de Desenvolvimento

| Comando | O que faz |
|---|---|
| `npm install --legacy-peer-deps` | Instala todas as dependências locais, ignorando conflitos de peerDependencies |
| `npm start` | Inicia o servidor de desenvolvimento Webpack na porta `9000` e abre o `index.html` |
| `npm test` | Executa a suíte de testes automatizados (Karma + Mocha) no Chrome |
| `npm run build` | Compila o bundle de desenvolvimento (sem minificação) |
| `npm run build-minify` | Compila o bundle de **produção** minificado — arquivo principal para publicação |
| `npm run build-standalone` | Compila a versão sem dependências embutidas (desenvolvimento) |
| `npm run build-minify-standalone` | Compila a versão standalone minificada para uso com deps externas |

---

## 📤 Publicação no NPM

O projeto está configurado para uma publicação profissional e segura:

**`prepublishOnly`** — o script `npm run build-minify` é executado automaticamente antes de qualquer `npm publish`, garantindo que o bundle na pasta `dist/` esteja sempre atualizado com o código mais recente.

**`"files": ["dist/"]`** — apenas a pasta `dist/` é enviada para o registro do NPM. Arquivos de desenvolvimento como `src/`, `test/`, `webpack.config.js`, `karma.conf.js` e `index.html` ficam fora do pacote publicado.

**`.npmignore`** — camada adicional de proteção que exclui explicitamente pastas de código-fonte, configurações locais e ferramentas de build da publicação.

Para publicar uma nova versão:

```sh
# 1. Atualize a versão no package.json
npm version patch   # ou minor / major

# 2. Publique (o build roda automaticamente via prepublishOnly)
npm publish
```

---

## Versionamento

O projeto segue as diretrizes do [Versionamento Semântico (SemVer)](http://semver.org/). Versões com sufixo `-alpha` ou `-beta` indicam releases em fase de testes e podem conter mudanças na API.

---

## Licença

Distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais detalhes.
