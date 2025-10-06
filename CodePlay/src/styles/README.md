Estrutura de estilos
=====================

Arquivos em `src/styles`:

- `global.css`  -> Importa `index.css` (Tailwind gerado) e inclui estilos globais customizados.
- `theme.css`   -> Tokens de tema (variáveis CSS) e regras base movidas de `globals.css`.
- `login.css`   -> Estilos específicos da página de login.
- `dashboard.css` -> Estilos específicos do dashboard.
- `jogo.css`    -> Estilos específicos da tela do jogo.
- `components/` -> CSS Modules para componentes complexos (ex.: `jogo.module.css`).

Como usar:
- Importe `src/styles/global.css` uma vez em `src/main.jsx` (já configurado).
- Para estilos específicos de página, importe o arquivo CSS no componente da página.
- Para estilos escopados (CSS Modules), coloque o arquivo em `styles/components/` e importe como module.

Se o `index.css` for gerado pelo Tailwind, prefira ajustar `tailwind.config.js` para mudanças de tokens/cores.
