// Museum Exhibit Studio — learner entrypoint.
//
// APOIO DIDATICO (PT-BR): leia o GUIA-ALUNAS.md no starter Node.js.
// Cliente = conexao com o runtime; sessao = conversa; prompt = tarefa.
// Mensagem de sistema orienta o modelo; ferramentas e permissoes limitam acoes.
// Comece no starter; use finished apenas para conferir a referencia concluida.
// Estes comentarios ficam fora das regioes: preserve-os ao colar os blocos.
//
// HOW TO EDIT THIS FILE
//
// Every place you write code is a named region between two marker lines:
//
//     >>> BEGIN <region> | Step 4: INSERT | Step 6: REPLACE
//     <<< END <region>
//
// The BEGIN line lists every step that touches the region. Each lesson block names its region
// and one of two actions:
//
//     INSERT   The region is empty. Paste the block between the two marker lines.
//     REPLACE  The region already has code. Delete everything between the two marker lines,
//              then paste the block.
//
// A block is always the complete contents of its region. Never edit, move, or delete a marker
// line, and leave the code outside the regions as it is.
//
// The pre-built curator helpers live in src/curator.ts, and the system messages in
// src/system-messages.ts. Do not edit those files: they are the application-owned half of the
// workshop, and they must stay identical to the finished app's copy.

// >>> BEGIN imports | Steps 1-7: REPLACE
import { closeTerminal, describeFailure } from "./curator.js";
// <<< END imports

// ETAPA 4/6: o pedido define como usar as fontes; nao autoriza ferramentas sozinho.
// Pesquisa complementar nao vira fato aprovado pela educadora.
// >>> BEGIN exhibit-prompt | Step 4: INSERT | Step 6: REPLACE
// <<< END exhibit-prompt

// >>> BEGIN html-prompt | Step 7: INSERT
// <<< END html-prompt

// ETAPA 4/6: tools registra funcoes; availableTools expoe as que a sessao pode usar.
// Registrar uma ferramenta nao a chama: confira os eventos durante a execucao.
// >>> BEGIN generation-config | Step 4: INSERT | Step 6: REPLACE
// <<< END generation-config

// ETAPA 6: pesquisa em sessao separada, com busca/leitura MCP e negacao por padrao.
// A geracao recebe uma captura da pesquisa, nao acesso direto a Wikipedia.
// >>> BEGIN research-config | Step 6: INSERT
// <<< END research-config

// ETAPA 7: o handler restringe a escrita a exhibit.html no diretorio da aplicacao.
// Pedir um unico arquivo no prompt nao substitui essa verificacao de permissao.
// >>> BEGIN html-config | Step 7: INSERT
// <<< END html-config

// ETAPA 4: um executor concentra conexao, timeout, resposta nao vazia e limpeza.
// finally encerra recursos mesmo com erro; nao depende de o modelo cooperar.
// >>> BEGIN session-runner | Step 4: INSERT
// <<< END session-runner

async function main(): Promise<void> {
  try {
    // >>> BEGIN banner | Step 1: REPLACE
    console.log("=== Museum Exhibit Studio starter ===");
    console.log("Pre-built curator helpers are ready in src/curator.ts.");
    console.log("Continue with museum step 1 to write your first curator session.");
    // <<< END banner

    // >>> BEGIN choose-facts | Step 4: INSERT
    // <<< END choose-facts

    // >>> BEGIN research | Step 6: INSERT
    // <<< END research

    // ETAPAS 1-6: conecte, converse, receba a resposta e encerre os recursos.
    // A primeira resposta usa memoria do modelo; plausibilidade nao prova verdade.
    // >>> BEGIN generate | Step 1: INSERT | Steps 2-6: REPLACE
    // <<< END generate

    // ETAPA 5: PASS comprova formato, nao verdade historica. Revise as afirmacoes.
    // >>> BEGIN validate | Step 5: INSERT
    // <<< END validate

    // >>> BEGIN sources | Step 6: INSERT
    // <<< END sources

    // >>> BEGIN exhibit-page | Step 7: INSERT
    // <<< END exhibit-page
  } catch (error) {
    console.error(describeFailure(error));
    process.exitCode = 1;
  } finally {
    closeTerminal();
  }
}

void main();
