# Mouse Robot
Cliente desktop para ser utilizado em conjunto com o aplicativo [Mouse Robot](https://github.com/diegorkalschne/mouse_robot_app), o mesmo recebe os dados enviados pelo o aplicativo e utiliza a biblioteca `robotjs` para controlar o mouse do computador.

## Debug
1. `git clone`
2. `npm i`
3. `./node_modules/.bin/electron-builder.cmd` para buildar corretamente os módulos nativos do `robotjs`
4. `npx electron .`

## Criar executável (.exe)
1. Executar `./node_modules/.bin/electron-packager.cmd <sourcedir> <name> --platform=<platform> --arch=<arch>`
    1. Exemplo: `./node_modules/.bin/electron-packager.cmd <sourcedir> "Mouse Robot" --platform=win32 --arch=x64`

## Sobre
Node.js versão 20.18.0