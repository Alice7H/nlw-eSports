## AULA 1

Nessa aula construímos as bases para iniciar o nosso projeto: o Find your DUO, fazendo o setup do ambiente de desenvolvimento com Node, React e React Native.

Instrutores: Diego Schell Fernandes e Rodrigo Gonçalves

### NLW SERVER

- Instalar o node.
- Rodar o `npm init -y` para criar o arquivo package.json.
- Instalar o express.
- Criar um arquivo `server.js` dentro da pasta `src`
- Configurar endpoint no arquivo `server.js`.
- Rodar o comando `node src/server.js`.
- Testar em algum client REST.

Clientes REST para testes citados:

- Postman
- Insomnia
- Hoppscotch

O Hoppscotch é um PWA ou (Progressive Web App), ou seja, é a página web ou sites regulares que aparecem como aplicativos aos usuários; combinando os recursos oferecidos pelos navegadores modernos com os benefícios da experiência móvel.

- Modificar o arquivo `server.js` para `server.ts`
- Instalar de Typescript como dependência de Desenvolvedor com o comando `npm i typescript -D`
- Rodar o comando `npx tsc --init` para criar um arquivo de configuração typescript.
- Configurar o package.json para ler o conteúdo em typescript e gerar o arquivo com extensão js:

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

- Configurar o arquivo `tsconfig.json` para especificar o diretório raiz da aplicação, em qual diretórios serão convertidos para a extensão js. e especifico como o TypeScript pesquisa um arquivo de um determinado módulo.

- Instalar o `npm i @types/express -D` pois o express não dá suporte ao typescript.
- Instalar o `npm i ts-node-dev -D`, essa ferramenta compila o projeto com Typescript e reinicia o projeto quando o arquivo é modificado.

### NLW WEB

Usamos o Vite que é uma ferramenta de construção para front-end, ele provê uma ferramenta de criação rápida comparada ao create-react-app (CRA).

Configurações feitas:

- Rodar o comando `npm create vite@latest`.
- Digitar `y` para prosseguir com a instalação.
- Inserir o nome do projeto `web`
- Selecionar a biblioteca `react`.
- Selecionar a variante `typescript`.
- Ir para o diretório do projeto `cd web`
- Instalar as dependências com `npm install`
- Rodar o `npm run dev`

Obs: Troquei a porta que roda o projeto web, configurado no arquivo `vite.config.ts`.

```typescript
export default defineConfig({
  // ...
  server: {
    port: 3000,
  },
});
```

### NLW MOBILE

- Abordagem nativa:

  ```mermaid
  graph LR;
      Android-->Java/Kotlin;
      Java/Kotlin-->.apk;
  ```

  ```mermaid
  graph LR;
      IOS-->Object-c/Swift;
      Object-c/Swift-->.ipa;
  ```

- Abordagem cross platform.

  ```mermaid
  graph LR;
      JavaScript-->Bundle;
      Bundle-->Expo;
      Expo-->Android;
      Expo-->IOS;
  ```

- Usamos Javascript.
- Empacotamos a aplicação em um bundle.
- Carregamos para dispositivos android e IOS.
- Utilizamos a ferramenta Expo.

EXPO é uma plataforma de código aberto para criar aplicativos nativos universais para Android, IOS e Web com Javascript e React.

- Ter o git e o node.js instalado
- Instalar o Expo CLI com o comando `npm i --global expo-cli`
- Verificar se a instalação ocorreu com sucesso, usando o comando `expo --version`.
- Executar o comando `expo init mobile` para criar o projeto.
- Escolher o template blank (Typescript).

## Aula 2

Desenvolvemos parte do nosso projeto, fazendo a interface web e mobile da aplicação.

### Interface Web

- Usamos o [modelo](https://www.figma.com/community/file/1150897317533332617) do [figma](https://www.figma.com/).

- Instalamos o tailwind usando o postcss, seguindo a [documentação do tailwind](https://tailwindcss.com/docs/installation/using-postcss).

- Modificamos o arquivo de configuração do tailwind de acordo com os diretórios desejados.

- Criamos o arquivo de configuração do tailwind e do postcss com o comando `npx tailwindcss init -p`

- Instalamos o phosphor-react para adicionar ícones, usando o comando `npm i phosphor-react`.

- Fizemos a interface do projeto de acordo com o modelo disponibilizado.

- Colocamos a fonte Inter.

### Interface Mobile

- Exportamos os [assets](https://drive.google.com/drive/folders/13kZ1SCasn1ZAKkmznieR0IwodH95XLG9) com as imagens de logo, splash, jogos, configurações de cores e um arquivo com uma lista de jogos.

- Instalamos a extensão RComponent para o VS Code que facilita na criação de blocos de código.

- Adicionamos a fonte Inter com o comando `expo install expo-font @expo-google-fonts/inter`.

- Instalamos a biblioteca react-native-safe-area-context para que os componentes sejam exibidos na área segura da tela, usando o comando `expo install react-native-safe-area-context`.

- Instalação da biblioteca LinearGradient para ter os detalhes de gradiente com o comando `expo install expo-linear-gradient`

- Para importarmos as imagens, usamos a declaração de módulo dos arquivos no formato png.

- Criamos:

  - Componente Background;
  - Tela Home;
  - Componente Loading (caso as fontes ainda não estejam carregadas);
  - Componente Heading (título e subtítulo);
  - Componente de Cards dos games;

- Usamos o componente FlatList para carregar a lista de jogos da pasta utils e passar as informações para os cards.

- Para ver a aplicação no celular, é preciso baixar o Expo Go e escanear o código QR disponibilizado ao executar o comando `npm start` no projeto.

## Aula 3

Criamos o back-end da aplicação.
