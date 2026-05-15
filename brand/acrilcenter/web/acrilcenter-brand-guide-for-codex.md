# Acrilcenter - Manual rápido para aplicar no site

Este pacote contém os logos separados, a paleta oficial, tokens de CSS e um prompt pronto para enviar ao Codex.

## Arquivos principais

- `logo/acrilcenter-logo-horizontal-color.svg` - logo principal para fundos claros.
- `logo/acrilcenter-logo-horizontal-white.svg` - logo para fundos escuros.
- `logo/acrilcenter-icon-color.svg` - símbolo AC isolado.
- `logo/acrilcenter-favicon.ico` - favicon pronto.
- `web/brand-tokens.css` - variáveis de cor, fonte, gradiente e componentes base.
- `manual/manual-da-marca-acrilcenter.pdf` - manual visual da marca.

## Paleta oficial

| Token | Hex | Uso recomendado |
|---|---:|---|
| Cristal | #F8FAFC | fundos claros, áreas de respiro, cards limpos |
| Azul Gelo | #C9EDFF | fundos suaves, highlights, bordas translúcidas |
| Ciano Acrílico | #18CFFF | cor de energia, luz, links e detalhes principais |
| Violeta Luminoso | #7B63FF | profundidade, tecnologia, hover e acentos |
| Magenta Acrílico | #D64CFF | impacto visual e destaques premium |
| Âmbar Luz | #FFB347 | chamadas especiais, calor humano e efeitos de luz |
| Chumbo | #202833 | textos, fundos escuros e contraste |
| Grafite | #171C24 | base premium para seções escuras |

## Direção visual

A identidade deve passar: acrílico premium, transparência, leveza, luz, precisão e modernidade. No site, priorizar fundos limpos, cards com efeito vidro, cantos arredondados, bastante respiro, bordas luminosas discretas e chamadas com gradiente ciano-violeta.

## Regras rápidas de uso do logo

1. Usar o logo colorido em fundos claros.
2. Usar o logo branco/colorido em fundos grafite ou escuros.
3. Não esticar, rotacionar, distorcer, aplicar sombras pesadas ou trocar as cores do símbolo.
4. Manter área de respiro de pelo menos 1/2 da altura do símbolo ao redor do logo.
5. Em navegação web, usar altura entre 40px e 56px para o logo horizontal.

## Prompt pronto para Codex

```text
Aplique a identidade visual da Acrilcenter neste site usando o kit de marca fornecido.

1. Copie a pasta `acrilcenter_brand_kit` para `public/brand/acrilcenter` ou adapte os caminhos conforme o projeto.
2. Importe `web/brand-tokens.css` no CSS global.
3. Use `logo/acrilcenter-logo-horizontal-color.svg` em fundos claros e `logo/acrilcenter-logo-horizontal-white.svg` em fundos escuros.
4. Configure o favicon com `logo/acrilcenter-favicon.ico`.
5. Ajuste o visual do site para transmitir acrílico premium: fundos cristalinos, transparência, cards com efeito glass, bordas luminosas, gradientes ciano/violeta e seções escuras em grafite.
6. Tipografia: usar Inter/Inter Display como primeira opção, com fallback sans-serif.
7. Criar botões primários com `--acril-gradient-luz`, cards com `.acril-card-glass` e títulos com `.acril-title`.
8. Preserve contraste e legibilidade. Não distorça o logo e não altere a paleta oficial.
```
