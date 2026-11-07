# Apoio às alunas — curador de museu com Node.js

Este guia acompanha a **versão atual deste repositório**, não os blocos da versão anterior do site cyz. A prática começa no [preflight em português](../../localizations/pt-br/workshop/museum-00-preflight.md); selecione os blocos **Node.js**.

## Seu objetivo

Construir um único aplicativo que transforma fatos escolhidos pela educadora em texto para visitantes de museu. Ao final, ele pode pesquisar contexto citado e gerar uma página interativa.

Você não precisa treinar modelos nem conhecer MCP antes da aula. Vamos adicionar uma ideia por etapa.

## Onde trabalhar

- Edite apenas o [ponto de entrada](src/index.ts).
- Não edite os [auxiliares](src/curator.ts) nem as [mensagens de sistema](src/system-messages.ts): eles já vêm prontos.
- Mantenha o terminal na pasta deste starter.
- **INSERT** preenche uma região vazia. **REPLACE** substitui todo o conteúdo entre `>>> BEGIN` e `<<< END`. Preserve os dois marcadores.
- Aplique todos os blocos da etapa, salve, confira os tipos com `npm run build` e execute com `npm start`.
- No PowerShell com scripts bloqueados, use `npm.cmd run build` e `npm.cmd start`. Para instalar, use o comando fixado do preflight com `npm.cmd` no lugar de `npm`.
- Não execute uma restauração global do Git para corrigir um trecho: ela pode apagar seu exercício. Peça ajuda ou compare só a região que falhou.

## Uma etapa, uma ideia, uma evidência

| Etapa | Ideia | Antes de seguir, confira |
|---|---|---|
| 1 | Cliente conecta; sessão conversa; prompt pede | Resposta no terminal e processo encerrado |
| 2 | Streaming exibe a resposta em partes | Texto chegando ao vivo |
| 3 | Mensagem de sistema orienta papel e tom | Texto para visitantes, não para desenvolvedoras |
| 4 | Ferramenta local entrega fatos; executor cuida de limites e encerramento | Fatos selecionados e evento `approved_fact_lookup` |
| 5 | Código valida o formato | Relatório PASS/FAIL; saiba dizer qual regra foi verificada |
| 6 | Pesquisa tem sessão e permissões próprias | Fontes citadas e duas consultas locais; ou fallback sem Wikipedia |
| 7 | Página tem permissão de escrita restrita | HTML criado no diretório do aplicativo e revisado no navegador |

Os arquivos das lições “06”, “07” e “08” correspondem às etapas **5, 6 e 7**. Não há uma etapa perdida; siga os títulos.

## Como pensar no agente

Imagine uma curadora contratada:

- **Mensagem de sistema:** o briefing de trabalho.
- **Prompt:** a tarefa de hoje.
- **Ferramentas disponíveis:** as chaves que ela recebe.
- **Handler de permissão:** a portaria que autoriza uma ação.
- **Validador:** o checklist de entrega.
- **Revisão humana:** a educadora que confere o conteúdo.

Um briefing não é uma fechadura. Pedir “não escreva outros arquivos” é diferente de impedir a escrita por código.

## Pontos que merecem atenção

1. `tools` registra uma função; `availableTools` expõe quais funções a sessão pode usar. Registrar não significa que ela já foi chamada.
2. `approveAll` aparece no exercício inicial; não o copie para sessões com capacidades amplas. Pesquisa e HTML usam handlers restritos.
3. Fatos aprovados pertencem à educadora. A consulta Wikipedia retorna pesquisa complementar capturada, não fatos automaticamente aprovados por uma pessoa.
4. PASS verifica estrutura: título, seções, narrativa de 100–140 palavras e três perguntas, entre outras regras. **PASS não certifica verdade histórica.**
5. Cada execução pode gerar texto diferente e consumir uso/cota Copilot. Não repita chamadas apenas para imitar palavra por palavra a demonstração.
6. O idioma português da lição não muda automaticamente os prompts em inglês do exercício.

## Se algo falhar

- **Tipos:** confira importações e a região da etapa; não misture versões das lições.
- **Login:** executar o starter vazio não testa Copilot. A primeira sessão exige acesso autenticado.
- **Espera:** confira se o terminal está pedindo uma resposta. Não remova permissões por tentativa e erro.
- **Pesquisa:** sem resumo citado utilizável, o aplicativo continua com fatos aprovados; esse caminho é esperado.
- **Validação:** leia a regra que falhou; erro de formato é diferente de erro de infraestrutura.
- **HTML:** confira o arquivo antes de abrir; revise o resultado antes de compartilhar.

**Ao terminar, explique para uma colega:** qual parte escreve o texto, qual parte controla as ações e qual parte confere o significado?