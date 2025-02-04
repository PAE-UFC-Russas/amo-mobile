## Projeto

Aplicativo para auxiliar as monitorias, onde seria possível marcar monitoria, ver hórarios, visualizar conteúdo  postados e solucionar dúvidas dos alunos da UFC - Campus Russas.

## Dependencias

Para instalá-los, siga os passos abaixo:

Expo
```bash
$ npm install --global expo-cli
```

NodeJs
https://nodejs.org/en/download/

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/PAE-UFC-Russas/amo-mobile.git
$ cd amo-mobile
```

Para iniciá-lo, siga os passos abaixo:
```bash
# Instalar as dependências
$ npm install

#caso de erro no build, apagar a pasta node-modules e instalar o normalize-css-color com o seguinte comando 
$ npm install normalize-css-color

# Iniciar o projeto
$ expo start
```
O app pode ser acessado pelo o aplicativo do expo ao ler o qrcode do terminal.

</br>Criar build do projeto</br>
</br>-Primeiro passo: 
 </br>. Instalar dependencia EAS CLI 
  ```bash
  $ npm install -g eas-cli
  ```
  
-Segundo passo:</br>
  .Logar na conta
  ```bash
  $ eas login
  ```
  
-Terceiro passo:</br>
  .Criar build apk
  ```bash
  $ eas build -p android --profile preview
  ```

-Terceiro passo:</br>
  .Criar build aab (playStore)
  ```bash
  $ eas build -p android
  ```

-Quarto passo:</br>
  .Instalar entrando no link que vai ser gerado.
