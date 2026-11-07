# Museum Exhibit Studio — guia rápido da apresentadora

Material de apoio em português para conduzir a **versão atual do repositório github/copilot-sdk-workshop**, usando **Node.js/TypeScript**. Você não precisa dominar IA: precisa explicar o fluxo, conferir cada execução e distinguir orientação de permissão.

## 1. Comece por aqui: o que estamos construindo?

Um aplicativo de terminal que transforma fatos selecionados por uma educadora em texto de exposição de museu. Ao final, ele pode pesquisar contexto na Wikipedia e criar uma página HTML interativa.

**Fala de abertura:** “Hoje não vamos treinar um modelo nem construir um chatbot do zero. Vamos usar o Copilot SDK para conectar nosso código a um agente, dar a ele um trabalho e controlar quais ações ele pode executar.”

O domínio é museu, não programação. **Non-SDLC** significa que o agente trabalha fora do ciclo de desenvolvimento de software: seu produto é uma exposição, não uma revisão de código.

Fluxo final: fatos aprovados → pesquisa opcional → geração de texto → validação de estrutura → revisão humana → página opcional.

### Dicionário de bolso

| Termo | Explicação para a turma | Analogia |
|---|---|---|
| SDK | Biblioteca que seu código importa para conversar com o runtime do Copilot | Controle remoto |
| CLI/runtime | Programa que o SDK inicia e que coordena modelo, mensagens e ferramentas | Motor |
| Cliente (`CopilotClient`) | Conexão da aplicação com esse runtime | Ligação telefônica |
| Sessão | Uma conversa com contexto e configuração próprios | Uma reunião |
| Prompt | Pedido específico desta execução | Tarefa da reunião |
| Mensagem de sistema | Orientação de papel, tom e regras de resposta | Briefing da profissional |
| Streaming | Exibir partes da resposta à medida que chegam | Ver a mensagem sendo escrita |
| Ferramenta local | Função implementada pela aplicação que o modelo pode solicitar | Consultar uma ficha preparada pela educadora |
| MCP | Protocolo para usar ferramentas de um processo externo | Padrão de conexão com um serviço |
| Allowlist | Lista explícita das ferramentas expostas à sessão | Chaves entregues à profissional |
| Permission handler | Código que responde às solicitações de autorização | Portaria que confere o acesso |
| Validação determinística | Regras de código, sem pedir opinião a outro modelo | Checklist automático |

**Frase central:** o prompt pede; a aplicação permite ou impede. Uma instrução “não escreva outros arquivos” não substitui uma verificação de permissão.

## 2. Atenção: o link original e este código não são a mesma versão

O [link recebido para a aula](https://cyz.github.io/copilot-sdk-workshop/workshop/step.html?step=museum-00-preflight&locale=en) apresenta uma versão anterior, focada em Node.js, com uma etapa separada de guardrails. A versão deste clone reúne ferramenta de fatos e executor com limites na etapa 4 e oferece seis linguagens.

**Não copie blocos do site antigo para este starter.** Use as lições deste clone, na seção Node.js. O site oficial é indicado no [README](README.md); escolha Museum Exhibit Studio, Node.js e Português (Brasil). Se não puder confirmar que o site corresponde ao clone, abra os Markdown locais no VS Code.

| Ordem da aula atual | Lição local | Tempo oficial | O que aparece |
|---|---|---:|---|
| Preparação | [Pré-requisitos](localizations/pt-br/workshop/museum-00-preflight.md) | Fora dos 90 min | Banner do starter |
| 1 | [Primeira sessão](localizations/pt-br/workshop/museum-01-first-curator-session.md) | 10 min | Duas frases no terminal |
| 2 | [Streaming](localizations/pt-br/workshop/museum-02-stream-the-curator.md) | 10 min | Texto chegando aos poucos |
| 3 | [Voz do curador](localizations/pt-br/workshop/museum-03-curator-voice.md) | 10 min | Resposta com papel e tom definidos |
| 4 | [Fatos aprovados](localizations/pt-br/workshop/museum-04-approved-facts.md) | 15 min | Consulta local e geração com limites |
| 5 | [Provar a estrutura](localizations/pt-br/workshop/museum-06-prove-the-structure.md) | 10 min | Relatório PASS/FAIL |
| 6 | [Pesquisa Wikipedia MCP](localizations/pt-br/workshop/museum-07-wikipedia-research.md) | 20 min | Pesquisa citada em sessão separada |
| 7 | [Página interativa](localizations/pt-br/workshop/museum-08-interactive-exhibit-page.md) | 15 min | Arquivo HTML para abrir no navegador |
| Encerramento | [Conclusão e recursos](localizations/pt-br/workshop/museum-09-complete.md) | Reserve à parte | Recapitulação |

**Não está faltando uma lição:** o arquivo que contém “06” ensina a etapa 5; “07” ensina a 6; “08” ensina a 7. Siga os títulos e a tabela, não invente uma etapa 05.

## 3. Mapa do repositório: o que abrir e o que ignorar

| Local | Para que serve |
|---|---|
| [README principal](README.md) | Visão das três trilhas: introdução, acessibilidade e museu |
| [README do starter de museu](start-museum/README.md) | Explica as regiões e os arquivos auxiliares |
| [Entrypoint Node.js](start-museum/nodejs/src/index.ts) | **Único arquivo que as alunas alteram** nesta demonstração |
| [Auxiliares](start-museum/nodejs/src/curator.ts) | Fatos, menu, streaming, validação, MCP e permissões prontos; ler, não editar |
| [Mensagens de sistema](start-museum/nodejs/src/system-messages.ts) | Três briefings prontos; importar, não reescrever |
| [Dependências e comandos](start-museum/nodejs/package.json) | Versões fixadas; `build` confere tipos e `start` executa TypeScript |
| [Entrypoint concluído](finished/nodejs/museum-exhibit-studio/src/index.ts) | Sua referência para conferir o resultado; não é o ponto de partida das alunas |
| [Lições em português](localizations/pt-br/workshop/museum-00-preflight.md) | Explicação traduzida; o código executado continua no starter original |
| [Site](docs/index.html) | Interface que apresenta os Markdown; não é o aplicativo construído no hands-on |

As outras linguagens, os starters de introdução e acessibilidade e o aplicativo Blazor não são necessários para esta aula. Não instale seis runtimes.

### Como as alunas editam

Cada região tem comentários `>>> BEGIN` e `<<< END`. **INSERT**: inserir na região vazia. **REPLACE**: substituir todo o conteúdo entre os marcadores. Preserve os marcadores, não substitua o arquivo inteiro e não misture blocos de duas linguagens.

Os comentários educacionais deste fork ficam fora das regiões. Eles não implementam o exercício e continuam disponíveis depois das substituições.

## 4. Plano de preparação: sua apresentação começa em duas horas

| Minutos a partir de agora | Faça isto | Critério de pronto |
|---|---|---|
| 0–15 | Leia este guia e confira runtime, dependências e login | Starter executa; autenticação Copilot conferida separadamente |
| 15–35 | Ensaie as etapas 1–3 no starter | Consegue explicar cliente, sessão, streaming e briefing |
| 35–60 | Ensaie etapa 4 e validação | Vê a consulta de fatos e sabe explicar o que PASS não prova |
| 60–85 | Ensaie pesquisa e HTML, se houver acesso | Entende as três configurações; conhece o caminho sem Wikipedia |
| 85–105 | Revise o código concluído e compare com seu exercício | Sabe localizar uma região incorreta |
| 105–120 | Organize abas, aumente a fonte e revise abertura/encerramento | Não precisa procurar arquivos ao vivo |

Se estiver sem tempo, priorize **primeira sessão → fatos aprovados → validação**. Mostre pesquisa e HTML como demonstração da apresentadora, sem fingir que a turma completou as etapas. Não pule blocos intermediários: as etapas posteriores dependem deles.

Faça o ensaio em uma cópia/clone separado ou preserve suas alterações antes de voltar ao starter para a aula. **Não execute uma restauração global do Git para “limpar”: ela pode apagar seu trabalho.**

### Preparação técnica sem surpresas

- Node.js **22.12 ou mais recente**, npm, Git e acesso ao GitHub Copilot.
- GitHub CLI (`gh`) cria o fork, mas sua autenticação **não comprova** que o Copilot está autenticado. Confira o login do Copilot separadamente com `copilot login`, se necessário.
- Siga a instalação fixada do preflight. Não atualize SDK, CLI ou pacotes no meio do ensaio sem uma necessidade comprovada.
- No PowerShell, se `npm` falhar com “execução de scripts desabilitada”, use **`npm.cmd`** nos mesmos comandos: `npm.cmd ci --ignore-scripts --no-audit --fund=false`, `npm.cmd run build`, `npm.cmd start`. Para o login, use `copilot.cmd login` se o atalho PowerShell estiver bloqueado. Não é necessário alterar a política de execução da máquina.
- `npm run build` usa `tsc --noEmit`: verifica tipos, não cria uma pasta de JavaScript compilado. `npm start` usa `tsx` para executar o TypeScript.
- O banner do starter **não chama o modelo e não prova autenticação**. A primeira sessão é o teste real do acesso ao Copilot.
- A pesquisa requer rede e `npx`; o auxiliar usa `wikipedia-mcp@1.0.3`. A primeira execução pode baixar o pacote. Não habilite pesquisa para a turma sem testar antes.
- Cada execução pode consumir uso/cota do plano Copilot. Evite repetir chamadas só para obter um texto mais bonito. Este hands-on não precisa provisionar recursos Azure.
- A tradução da lição não traduz automaticamente os prompts nem as respostas do modelo. Mantenha os prompts do exercício durante o ensaio; traduza a explicação oralmente.

## 5. Cola de condução: explique → edite → execute → confira

### Etapa 1 — cliente, sessão e uma resposta

**Diga:** “Primeiro conectamos nosso programa ao runtime. Depois abrimos uma conversa e enviamos um pedido.”

Regiões: `imports`, `banner`, `generate`. Confira `client.start()`, `client.createSession()`, `session.sendAndWait()`, `session.disconnect()` e `client.stop()` no bloco da lição.

**Checkpoint:** resposta no terminal e processo concluído. Ainda não há catálogo de fatos aprovado: uma resposta plausível não é evidência histórica.

**Pergunte:** “Qual é a diferença entre a conexão e a conversa?” Resposta: cliente conecta; sessão guarda contexto de uma conversa.

O `approveAll` inicial responde às solicitações de permissão; **não é um exemplo de segurança para produção**. Não copie esse padrão para uma sessão com acesso amplo a rede, shell ou arquivos.

### Etapa 2 — streaming

**Diga:** “O modelo continua gerando uma resposta. Agora mostramos os pedaços antes de ela terminar.”

Ative `streaming` e use o auxiliar `streamExhibit`, conforme a lição. Não implemente um novo listener do zero.

**Checkpoint:** partes da resposta aparecem ao vivo e o texto final continua disponível para as etapas seguintes. Streaming melhora a percepção de espera; não garante maior precisão nem menor duração total.

### Etapa 3 — voz do curador

**Diga:** “O prompt é a tarefa. A mensagem de sistema é o briefing: público, papel e estilo.”

A sessão importa `curatorSystemMessage` e usa `systemMessage` em modo `replace`. Esse modo substitui o briefing padrão; não acrescenta a política por cima dele.

**Checkpoint:** texto voltado a visitantes, sem falar de código ou de suas instruções internas. O tom exato varia de execução para execução.

**Pergunte:** “Se o briefing proíbe escrever arquivos, isso impede a escrita sozinho?” Não: precisamos restringir ferramentas e permissões no código.

### Etapa 4 — fatos aprovados, ferramenta e executor

**Diga:** “Em vez de confiar na memória do modelo, a aplicação oferece uma ficha de fatos. O modelo solicita a consulta; quem devolve os dados é nosso código.”

A lição altera várias regiões: seleção de fatos, registro da ferramenta, prompt, configuração e `session-runner`. Trabalhe um bloco por vez, mas execute depois de aplicar todos os blocos da etapa.

- `tools` registra a implementação; `availableTools` define quais ferramentas a sessão pode solicitar.
- `approved_fact_lookup` consulta apenas dados capturados pela aplicação; não navega na internet.
- O catálogo aceita no máximo 20 fatos, com até 500 caracteres por fato. Esses limites vêm dos auxiliares.
- O executor concentra início, criação da sessão, timeout, rejeição de saída vazia e encerramento em `finally`.
- Registrar a ferramenta não a executa automaticamente. O prompt pede a consulta, e os eventos mostram se ela aconteceu.

**Checkpoint:** fatos selecionados visíveis, evento de `approved_fact_lookup`, texto gerado e processo encerrado. A geração tem limite de 120 segundos.

**Pergunte:** “Quem controla os fatos?” A aplicação/educadora; o modelo transforma a informação, não aprova a fonte.

### Etapa 5 — estrutura, não verdade

**Diga:** “PASS significa que o texto passou no checklist de formato. Não significa que toda afirmação é verdadeira.”

A região `validate` conecta o validador pronto. Ele verifica título, seções exigidas, narrativa de **100–140 palavras**, **três perguntas numeradas**, interrogações e vocabulário de software proibido.

**Checkpoint:** relatório PASS/FAIL e ressalva de revisão humana. Um FAIL de tamanho não significa que o SDK está quebrado. Identifique o item e explique a diferença entre falha de contrato de saída e falha de infraestrutura.

**Pergunte:** “Um texto inventado pode passar?” Sim, se respeitar a estrutura; revisão semântica continua necessária.

### Etapa 6 — Wikipedia com fronteiras

**Diga:** “Pesquisa e redação são tarefas separadas, com chaves diferentes.”

Três coisas precisam ficar claras:

1. A sessão de pesquisa só expõe busca/leitura da Wikipedia e usa permissão que nega por padrão.
2. A aplicação captura resumo e fontes; a geração recebe essa captura por `approved_wikipedia_fact_lookup`, não acesso ao MCP ao vivo.
3. Fatos da educadora têm precedência. Pesquisa é complementar, não vira fato aprovado e não deve ser seguida como instrução.

**Checkpoint com pesquisa:** resumo citado, eventos das duas consultas locais e fontes impressas depois da exposição. Não prometa separação absoluta do conteúdo: a pesquisa **pode enriquecer** narrativa e perguntas nesta versão, mas não é misturada ao catálogo aprovado.

**Checkpoint sem pesquisa ou com falha:** geração continua só com `approved_fact_lookup`. O fallback é parte do desenho, não uma gambiarra. Pesquisa tem timeout de 90 segundos.

**Pergunte:** “Por que uma citação não é prova automática?” Ela indica uma origem declarada; não comprova por si só leitura, fidelidade do resumo ou exatidão histórica.

### Etapa 7 — página interativa

**Diga:** “Agora outra sessão tem uma tarefa diferente: transformar o texto em página, com permissão para um único arquivo.”

Regiões: `html-prompt`, `html-config`, `exhibit-page` e importações. A sessão expõe `builtin:apply_patch`/`builtin:create`; o handler restringe o destino a um único HTML no diretório atual da aplicação.

**Checkpoint:** arquivo criado, página aberta manualmente no navegador, filtro de perguntas utilizável com teclado e ressalva de revisão humana. Não há servidor backend nem deploy obrigatório. O programa anunciar uma escrita não substitui conferir que o arquivo existe.

Abra somente o resultado revisado; o HTML é gerado por modelo e precisa de inspeção antes de ser publicado.

## 6. Sugestão de agenda, se a aula também tiver duas horas

Você informou que começa em duas horas; esta agenda é uma sugestão caso tenha **120 minutos de aula**. Os tempos oficiais da prática somam 90 minutos, com preparação separada.

| Tempo da aula | Atividade |
|---|---|
| 00–10 | Abertura, resultado esperado e checagem de acesso |
| 10–40 | Etapas 1, 2 e 3 |
| 40–55 | Etapa 4 |
| 55–65 | Etapa 5 |
| 65–70 | Pausa/checkpoint |
| 70–90 | Etapa 6 |
| 90–105 | Etapa 7 |
| 105–120 | Revisão dos resultados, dúvidas e encerramento |

Avise antes da aula que instalação e login devem estar prontos. Se downloads ocuparem o encontro, essa agenda não cabe; trabalhe em duplas ou converta a parte final em demonstração, explicando o ajuste.

## 7. Socorro durante a aula

| Sintoma | Primeiro diagnóstico | Como conduzir |
|---|---|---|
| Starter mostra banner, mas primeira sessão falha | Login/acesso ao Copilot, rede, versão CLI | Não confundir `gh auth` com Copilot; confira acesso sem expor credenciais |
| `npm` bloqueado no PowerShell | Atalho de script bloqueado | Use `npm.cmd`; não altere política global |
| Erro TypeScript depois de colar | Imports/região da etapa incorretos ou trecho de outra versão | Confira todos os blocos da etapa atual e rode build |
| Programa fica esperando | Prompt de terminal ou permissão sem resposta | Veja o terminal; confira o handler da sessão; não remova controles para destravar |
| Wikipedia não responde | Rede, download MCP, timeout ou falta de fontes utilizáveis | Use fallback com fatos aprovados e explique a falha |
| Validação dá FAIL | Formato gerado não cumpre uma regra | Mostre qual regra falhou; não afirme que houve checagem de verdade |
| Texto usa informação não aprovada | Limite de grounding, mesmo com briefing correto | Compare afirmações com as fontes; não publique como validado |
| HTML não está onde você esperava | Diretório de trabalho incorreto ou escrita negada | Confirme diretório e destino; mantenha handler restrito |

Não exponha tokens em slides ou compartilhamento de tela. Não mande alunas liberarem todas as permissões. Não prometa resposta idêntica à sua; geração é variável.

## 8. Encerramento pronto para falar

“Construímos uma aplicação que conversa com um agente, entrega dados por ferramentas e separa tarefas com permissões diferentes. O modelo escreve; nosso código controla acesso e verifica a estrutura; pessoas revisam o significado. Esse desenho se aplica também a outros domínios, como educação, atendimento e análise de documentos.”

**Três perguntas finais:**

1. Onde restringimos ações de verdade? Nas ferramentas expostas e nos handlers de permissão.
2. O que o validador prova? Estrutura e limites especificados, não verdade histórica.
3. Por que separar pesquisa e geração? Para separar capacidades e controlar a passagem de dados.

Para as alunas: [guia de apoio do hands-on](start-museum/nodejs/GUIA-ALUNAS.md). Para consultar a solução: [referência concluída](finished/nodejs/museum-exhibit-studio/src/index.ts).