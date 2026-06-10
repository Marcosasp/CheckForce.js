<div align="center">
  <img src="examples/logo.svg" width="96" alt="CheckForce.js logo" />
  <h1>CheckForce.js</h1>
  <p><strong>Biblioteca JavaScript para validação e análise de força de senha em tempo real</strong></p>
  <p>
    <img src="https://img.shields.io/badge/versão-3.0.0--alpha1-7c3aed?style=flat-square" alt="versão">
    <img src="https://img.shields.io/badge/licença-MIT-22c55e?style=flat-square" alt="licença">
    <img src="https://img.shields.io/badge/Webpack-5-2563eb?style=flat-square" alt="webpack 5">
    <img src="https://img.shields.io/badge/testes-Karma%2FMocha-f59e0b?style=flat-square" alt="testes">
    <img src="https://img.shields.io/badge/zxcvbn-4.4.2-0ea5e9?style=flat-square" alt="zxcvbn">
    <img src="https://img.shields.io/badge/Popper.js-2-f97316?style=flat-square" alt="popper.js">
  </p>
</div>

---

## Sobre o Projeto

O **CheckForce.js** é uma biblioteca JavaScript leve para validação e análise de força de senhas em tempo real. A versão 3 entrega o arquivo bundle completamente **autossuficiente** — ele traz embutidas todas as dependências necessárias: [Popper.js](https://popper.js.org/) para posicionamento de tooltips e [Zxcvbn](https://github.com/dropbox/zxcvbn) para análise estatística de entropia. Nenhuma dependência extra é necessária para uso do bundle.

O projeto inclui também uma **página de demonstração premium** (`index.html`) que apresenta um formulário de cadastro completo com validação em tempo real, efeitos glassmorphism e transição de estado de sucesso.

---

## Demo

![CheckForce.js Demo](examples/images/home.png)

|              Tooltip — acima               |               Tooltip — direita                |                 Tooltip — abaixo                 |              Tooltip — esquerda              |
| :----------------------------------------: | :--------------------------------------------: | :----------------------------------------------: | :------------------------------------------: |
| ![top](examples/images/checkforce-top.png) | ![right](examples/images/checkforce-right.png) | ![bottom](examples/images/checkforce-bottom.png) | ![left](examples/images/checkforce-left.png) |

---

## Funcionalidades

### Biblioteca

- **Análise em tempo real** — escuta o evento `keyup` e atualiza o indicador a cada tecla digitada
- **Motor de entropia** — integração com `zxcvbn` para estimativa de tempo de quebra por força bruta
- **Tooltip posicionável** — posicionamento via Popper.js com suporte a `top`, `bottom`, `left`, `right` e `auto`
- **Quatro níveis de força** — Fraca, Média, Forte e Muito Forte, com cores e textos distintos
- **API simples** — um constructor e um método público; nenhuma configuração obrigatória
- **UMD** — compatível com browsers, CommonJS e AMD sem configuração extra

### Página de Demonstração (`index.html`)

- **Formulário de cadastro completo** — campos Nome, E-mail e Senha com validação individual por campo
- **Glassmorphism** — card com `backdrop-filter: blur`, fundo escuro (#080818) e orbs animados em gradiente roxo/azul
- **Barra de força dinâmica** — cresce e muda de cor com transição suave entre quatro níveis
- **Estimativa de quebra** — exibe em tempo real o tempo estimado para quebrar a senha (ex: _"3 séculos"_)
- **Gerador de senha** — cria automaticamente uma senha de 12 caracteres satisfazendo todos os requisitos
- **Copiar para clipboard** — feedback visual animado com fallback para `document.execCommand()`
- **Checklist de requisitos** — quatro blocos com contadores individuais e animação de micro-interação
- **Nível "Muito Forte"** — ativado quando todos os 4 requisitos são atendidos **e** `zxcvbn` retorna `score === 4`
- **Estado de sucesso** — ao submeter o formulário válido, o card transiciona com animação para uma tela de confirmação centralizada

---

## Critérios de Validação

| Critério                          | Mínimo exigido |
| --------------------------------- | -------------- |
| Letras maiúsculas (A–Z)           | **1**          |
| Letras minúsculas (a–z)           | **1**          |
| Números (0–9)                     | **2**          |
| Caracteres especiais (`!@#$%...`) | **1**          |

O método `checkPasswordOnlyTest()` retorna as **contagens brutas** de cada categoria, permitindo que você aplique seus próprios limiares na interface.

---

## Instalação

### Via NPM

```sh
npm install checkforce.js --save
```

> Se houver conflitos de `peerDependencies` ao instalar dependências de desenvolvimento localmente, use:
>
> ```sh
> npm install --legacy-peer-deps
> ```

### Via CDN (browser direto)

```html
<script src="https://unpkg.com/checkforce.js/dist/checkforce.bundle.min.js"></script>
```

### Via arquivo local

Copie o arquivo `dist/checkforce.bundle.min.js` para o seu projeto e referencie no HTML.

---

## Uso

### Bundle autossuficiente (recomendado)

Inclua um único arquivo — Popper.js e Zxcvbn já estão embutidos:

```html
<!-- Produção (recomendado) -->
<script src="dist/checkforce.bundle.min.js"></script>

<!-- Desenvolvimento (com source maps) -->
<script src="dist/checkforce.bundle.js"></script>
```

### Versão standalone (dependências externas)

Use quando preferir gerenciar as versões de Popper.js e Zxcvbn separadamente:

```html
<script src="path/to/popper.min.js"></script>
<script src="path/to/zxcvbn.js"></script>
<script src="dist/checkforce.min.js"></script>
```

### Inicialização básica

```html
<input type="password" id="minha-senha" placeholder="Digite sua senha..." />

<script src="dist/checkforce.bundle.min.js"></script>
<script>
  const checker = new CheckForce("#minha-senha");
</script>
```

O tooltip de força aparece automaticamente ao focar no campo e se atualiza a cada tecla.

### Com configuração personalizada

```html
<script>
  const checker = new CheckForce("#minha-senha", {
    placement: "right", // posição do tooltip: top | bottom | left | right | auto
    minPasswordLength: 10, // comprimento mínimo considerado na validação
  });
</script>
```

### Lendo os resultados manualmente

```js
const checker = new CheckForce("#minha-senha");

document.getElementById("minha-senha").addEventListener("input", () => {
  const res = checker.checkPasswordOnlyTest();

  console.log(res.uppercaseCheck.lengthUppercase); // ex: 2
  console.log(res.lowercaseCheck.lengthLowercase); // ex: 4
  console.log(res.numberCheck.lengthNumber); // ex: 3
  console.log(res.charsSpecialCheck.lengthChars); // ex: 1
});
```

---

## API

### Constructor

```js
new CheckForce(element, config?)
```

| Parâmetro | Tipo                      | Obrigatório | Descrição                                              |
| --------- | ------------------------- | ----------- | ------------------------------------------------------ |
| `element` | `string` \| `HTMLElement` | Sim         | Seletor CSS ou referência direta ao `<input>` de senha |
| `config`  | `object`                  | Não         | Opções de configuração (ver tabela abaixo)             |

### Opções de configuração

| Opção               | Tipo     | Padrão                 | Descrição                                                                                 |
| ------------------- | -------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| `placement`         | `string` | `"top"`                | Posição do tooltip em relação ao input. Valores: `top`, `bottom`, `left`, `right`, `auto` |
| `containerId`       | `string` | `"checkforce-tooltip"` | ID do elemento container do tooltip criado no DOM                                         |
| `minPasswordLength` | `number` | `8`                    | Comprimento mínimo da senha para que o critério de tamanho seja satisfeito                |
| `template`          | `string` | HTML padrão            | HTML completo do tooltip; substitui o template interno se informado                       |

### Métodos públicos

#### `checkPasswordOnlyTest()`

Retorna um objeto com as contagens brutas dos caracteres da senha atual. Não depende de nenhum evento — pode ser chamado a qualquer momento.

```js
const resultado = checker.checkPasswordOnlyTest();
```

**Retorno:**

```js
{
  uppercaseCheck: {
    lengthUppercase: Number,  // total de letras maiúsculas (A–Z)
    haveUppercase:   Boolean  // true se houver ao menos uma
  },
  lowercaseCheck: {
    lengthLowercase: Number,  // total de letras minúsculas (a–z)
    haveLowercase:   Boolean  // true se houver ao menos uma
  },
  numberCheck: {
    lengthNumber: Number      // total de dígitos (0–9)
  },
  charsSpecialCheck: {
    lengthChars: Number       // total de caracteres especiais
  }
}
```

### Eventos vinculados automaticamente

| Evento  | Comportamento                                                       |
| ------- | ------------------------------------------------------------------- |
| `focus` | Exibe o tooltip de força                                            |
| `blur`  | Oculta o tooltip                                                    |
| `keyup` | Reavalia a força da senha e atualiza o tooltip (espaço é bloqueado) |

---

## Níveis de Força

| Nível           | Cor                    | Critério (zxcvbn)                                |
| --------------- | ---------------------- | ------------------------------------------------ |
| **Fraca**       | Vermelho `#ef4444`     | score 0 ou 1, ou score 2 com `guesses_log10 < 8` |
| **Média**       | Âmbar `#f59e0b`        | score 2 com `guesses_log10 ≥ 8`, ou score 3      |
| **Forte**       | Verde `#22c55e`        | score 4                                          |
| **Muito Forte** | Azul celeste `#38bdf8` | score 4 **e** todos os 4 requisitos satisfeitos  |

---

## Arquivos de Distribuição

| Arquivo                    | Popper.js | Zxcvbn   | Indicado para                                       |
| -------------------------- | --------- | -------- | --------------------------------------------------- |
| `checkforce.bundle.min.js` | Incluído  | Incluído | **Produção** — arquivo principal do NPM             |
| `checkforce.bundle.js`     | Incluído  | Incluído | Desenvolvimento com todas as deps embutidas         |
| `checkforce.min.js`        | Externo   | Externo  | Produção com deps gerenciadas pelo projeto          |
| `checkforce.js`            | Externo   | Externo  | Desenvolvimento com bundler próprio (Webpack, Vite) |

> O campo `"main"` do `package.json` aponta para `dist/checkforce.bundle.min.js`.

---

## Exemplos Incluídos

O projeto inclui três exemplos prontos na pasta `examples/`:

| Arquivo                     | Descrição                                     | Posição do tooltip |
| --------------------------- | --------------------------------------------- | ------------------ |
| `examples/index.html`       | Formulário Bootstrap com Nome, E-mail e Senha | `top` (padrão)     |
| `examples/basic/form.html`  | Formulário com floating labels Bootstrap      | `right`            |
| `examples/basic/input.html` | Campo de senha isolado                        | `auto`             |

Para rodar os exemplos localmente, inicie o servidor de desenvolvimento:

```sh
npm start
```

Acesse `http://localhost:9000`.

---

## Estrutura do Projeto

```
checkforce.js/
├── src/
│   ├── index.js          # Classe principal CheckForce
│   ├── wrapper.js        # PwdStrengthWrapper — lógica da barra de progresso
│   └── helpers.js        # Utilitários: qs() e $on()
├── dist/                 # Arquivos compilados (gerados pelo build)
│   ├── checkforce.bundle.min.js
│   ├── checkforce.bundle.js
│   ├── checkforce.min.js
│   └── checkforce.js
├── examples/
│   ├── index.html        # Demo Bootstrap
│   ├── logo.svg          # Logotipo CF
│   ├── images/           # Screenshots dos exemplos
│   └── basic/
│       ├── form.html     # Exemplo com floating labels
│       ├── input.html    # Exemplo com campo único
│       ├── _root.css
│       ├── _popover.css  # Estilos do tooltip nativo
│       └── _style.css
├── test/
│   └── checkforce.spec.js  # Testes unitários (Karma + Mocha + Chai)
├── index.html            # Página de demonstração premium
├── webpack.config.js
├── karma.conf.js
└── package.json
```

---

## Desenvolvimento

### Pré-requisitos

- Node.js 14+
- npm 7+

### Instalação

```sh
git clone https://github.com/dejaneves/checkforce.js.git
cd checkforce.js
npm install --legacy-peer-deps
```

### Comandos disponíveis

| Comando                           | Descrição                                                    |
| --------------------------------- | ------------------------------------------------------------ |
| `npm start`                       | Inicia o servidor de desenvolvimento Webpack na porta `9000` |
| `npm test`                        | Executa a suíte de testes com Karma + Mocha no Chrome        |
| `npm run build`                   | Compila o bundle de desenvolvimento (com source maps)        |
| `npm run build-minify`            | Compila o bundle de **produção** minificado                  |
| `npm run build-standalone`        | Compila a versão sem dependências embutidas                  |
| `npm run build-minify-standalone` | Compila a versão standalone minificada                       |

---

## Testes

A suíte de testes usa **Karma** como runner, **Mocha** como framework e **Chai** para asserções. Os testes cobrem o método `checkPasswordOnlyTest()` com a senha de referência `Aa12!`:

```sh
npm test
```

| Caso de teste       | Resultado esperado |
| ------------------- | ------------------ |
| Total de maiúsculas | `1`                |
| Total de minúsculas | `1`                |
| `haveUppercase`     | `true`             |
| `haveLowercase`     | `true`             |
| Total de números    | `2`                |
| Total de especiais  | `1`                |

---

## Publicação no NPM

O projeto está configurado para publicação segura e automatizada:

- **`prepublishOnly`** — executa `npm run build-minify` automaticamente antes de qualquer `npm publish`, garantindo que o `dist/` esteja sempre atualizado
- **`"files": ["dist/"]`** — apenas a pasta `dist/` é enviada ao registro; `src/`, `test/`, configs e exemplos ficam fora do pacote
- **`.npmignore`** — camada adicional que exclui explicitamente arquivos de desenvolvimento

```sh
# 1. Atualize a versão
npm version patch   # ou minor / major

# 2. Publique (o build roda automaticamente)
npm publish
```

---

## Versionamento

O projeto segue as diretrizes do [Versionamento Semântico (SemVer)](http://semver.org/). Versões com sufixo `-alpha` ou `-beta` indicam releases em fase de testes e podem conter mudanças na API pública.

---

## Licença

Distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais detalhes.

---

<div align="center">
  <p>Desenvolvido por <a href="https://github.com/dejaneves">Jaime Neves</a></p>
</div>
