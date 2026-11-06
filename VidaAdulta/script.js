/* =========================================================
   DADOS E ESTADO
   ========================================================= */
let usuarioLogado = null;
let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
let checklist = JSON.parse(localStorage.getItem('checklist') || '{}');

/* =========================================================
   NAVEGAÇÃO
   ========================================================= */
function mostrarSecao(id) {
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function abrirAba(ev, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('ativa'));
    document.querySelectorAll('.aba-conteudo').forEach(a => a.classList.remove('ativa'));
    ev.target.classList.add('ativa');
    document.getElementById(id).classList.add('ativa');
}

/* =========================================================
   AUTENTICAÇÃO 
   ========================================================= */
let modoCadastro = false;

function abrirModal(id) {
    document.getElementById(id).classList.add('ativo');
}
function fecharModal(id) {
    document.getElementById(id).classList.remove('ativo');
}

function alternarAuth() {
    modoCadastro = !modoCadastro;
    document.getElementById('tituloAuth').innerText = modoCadastro ? 'Cadastrar' : 'Entrar';
    document.getElementById('authNome').style.display = modoCadastro ? 'block' : 'none';
    document.getElementById('btnAcaoAuth').innerText = modoCadastro ? 'Cadastrar' : 'Entrar';
    document.getElementById('trocaTexto').innerText = modoCadastro
        ? 'Já tem conta? Entrar'
        : 'Não tem conta? Cadastre-se';
}

function executarAuth() {
    const nome = document.getElementById('authNome').value.trim();
    const email = document.getElementById('authEmail').value.trim();
    const senha = document.getElementById('authSenha').value;

    if (!email || !senha) return alert('Preencha e-mail e senha.');
    if (modoCadastro && !nome) return alert('Informe seu nome.');

    // Salva usuário localmente (protótipo)
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');

    if (modoCadastro) {
        if (usuarios[email]) return alert('Este e-mail já está cadastrado.');
        usuarios[email] = { nome, senha };
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Cadastro realizado!');
        usuarioLogado = { nome, email };
    } else {
        if (!usuarios[email] || usuarios[email].senha !== senha)
            return alert('Credenciais inválidas.');
        usuarioLogado = { nome: usuarios[email].nome, email };
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    atualizarHeader();
    fecharModal('modalAuth');
}

function atualizarHeader() {
    const btn = document.getElementById('btnLogin');
    if (usuarioLogado) {
        btn.innerText = '👤 ' + usuarioLogado.nome.split(' ')[0];
        btn.onclick = () => {
            if (confirm('Deseja sair?')) {
                usuarioLogado = null;
                localStorage.removeItem('usuarioLogado');
                atualizarHeader();
            }
        };
    } else {
        btn.innerText = 'Entrar';
        btn.onclick = () => abrirModal('modalAuth');
    }
}

/* =========================================================
   TRILHAS EDUCATIVAS COM CONTEÚDO COMPLETO
   ========================================================= */

// Estrutura: cada item tem id único (trilhaItem) para marcar como lido
const trilhas = [
    {
        id: 1,
        titulo: 'Trilha 1: Vida Financeira e Bancária',
        itens: [
            {
                id: '1.1',
                titulo: 'Como escolher e abrir a primeira conta',
                conteudo: `
          <h2>Como escolher e abrir sua primeira conta</h2>
          <p>Abrir conta bancária é o primeiro passo pra organizar sua vida financeira. Não precisa ter medo: hoje dá pra fazer tudo pelo celular.</p>

          <h3>Passo a passo</h3>
          <ol>
            <li>Você precisa ter <strong>18 anos</strong> (ou 16+ com autorização dos responsáveis).</li>
            <li>Separe os documentos: <strong>RG ou CNH</strong>, <strong>CPF</strong> e <strong>comprovante de residência</strong>.</li>
            <li>Escolha o banco: bancos digitais (Nubank, Inter, C6) são gratuitos e ótimos pra começar.</li>
            <li>Baixe o aplicativo e clique em "Abrir conta".</li>
            <li>Preencha seus dados e tire uma selfie com o documento.</li>
            <li>Em até 1 dia útil sua conta é aprovada! </li>
          </ol>

          <h3>O que olhar antes de escolher</h3>
          <ul>
            <li><strong>Tarifa de manutenção:</strong> bancos digitais geralmente são zero.</li>
            <li><strong>Rendimento:</strong> contas digitais rendem automaticamente (100% do CDI).</li>
            <li><strong>Cartão de débito:</strong> prático pro dia a dia.</li>
            <li><strong>Aplicativo:</strong> bom, simples e sem travamento.</li>
          </ul>

          <div class="caixa-dica">
            <strong>Dica:</strong> comece com uma <em>conta digital gratuita</em>. Depois, se precisar, abre uma conta tradicional.
          </div>

          <div class="caixa-alerta">
            <strong>Cuidado:</strong> nunca caia em "gerente" que liga oferecendo crédito fácil por telefone. Banco de verdade não faz isso.
          </div>

          <div class="caixa-info">
            <strong>Onde saber mais:</strong><br>
            Banco Central — <a href="https://www.bcb.gov.br/cidadaniafinanceira" target="_blank">Cidadania Financeira</a>
          </div>
        `
            },
            {
                id: '1.2',
                titulo: 'Diferença entre conta corrente e poupança',
                conteudo: `
          <h2>Conta corrente x Poupança</h2>
          <p>As duas guardam dinheiro, mas funcionam de formas diferentes.</p>

          <h3>Comparação</h3>
          <ul>
            <li><strong>Conta corrente:</strong> usada no dia a dia. Recebe salário, paga boletos, faz PIX. Pode ter tarifas.</li>
            <li><strong>Poupança:</strong> feita pra guardar. Rende pouco (0,5% ao mês + TR). Saque fácil.</li>
          </ul>

          <h3>O que escolher</h3>
          <ul>
            <li>Pra <strong>dia a dia</strong>: conta corrente (ou digital, que acumula as duas funções).</li>
            <li>Pra <strong>guardar dinheiro</strong>: prefira CDB, Tesouro Direto ou conta que rende 100% do CDI.</li>
          </ul>

          <div class="caixa-alerta">
            <strong>Atenção:</strong> a poupança rende MENOS que a inflação em vários anos — você perde poder de compra sem perceber.
          </div>

          <div class="caixa-dica">
            <strong>Dica:</strong> use a regra 50-30-20 (próximo tópico) pra decidir quanto guardar.
          </div>
        `
            },
            {
                id: '1.3',
                titulo: 'O que é PIX e como usar com segurança',
                conteudo: `
          <h2>PIX: rápido, mas exige cuidado</h2>
          <p>PIX é o sistema de transferência instantânea do Banco Central. Funciona 24h, todos os dias, inclusive fins de semana.</p>

          <h3>Tipos de chave</h3>
          <ul>
            <li>CPF/CNPJ</li>
            <li>E-mail</li>
            <li>Telefone</li>
            <li>Chave aleatória (mais segura)</li>
          </ul>

          <h3>Como usar com segurança</h3>
          <ol>
            <li><strong>Sempre confira</strong> o nome do destinatário antes de confirmar.</li>
            <li>Ative a <strong>verificação em duas etapas</strong> no app do banco.</li>
            <li>Nunca passe seu PIX pra desconhecidos que prometem prêmios.</li>
            <li>Desconfie de "comprei, manda o PIX que eu devolvo" — golpe comum.</li>
            <li>Se cair dinheiro por engano, devolva via PIX mesmo (não saque).</li>
          </ol>

          <div class="caixa-alerta">
            <strong>Golpes mais comuns:</strong>
            <ul style="margin-top:8px">
              <li>Falso funcionário de banco pedindo "confirmação de PIX".</li>
              <li>Link falso de "recebimento pendente".</li>
              <li>Perfis clonados no WhatsApp pedindo dinheiro.</li>
            </ul>
          </div>

          <div class="caixa-info">
            <strong>Saiba mais:</strong> <a href="https://www.bcb.gov.br/estabilidadefinanceira/pix" target="_blank">Site oficial do PIX - BCB</a>
          </div>
        `
            },
            {
                id: '1.4',
                titulo: 'Cartão de crédito sem armadilhas',
                conteudo: `
          <h2>Cartão de crédito: aliado ou vilão?</h2>
          <p>O cartão é uma <strong>ferramenta</strong>. Bem usado, ajuda. Mal usado, destrói o orçamento.</p>

          <h3>Termos importantes</h3>
          <ul>
            <li><strong>Limite:</strong> quanto o banco deixa você gastar. NÃO é seu dinheiro.</li>
            <li><strong>Fatura:</strong> a conta mensal de tudo que você gastou.</li>
            <li><strong>Pagamento mínimo:</strong> a pior escolha possível — juros altíssimos.</li>
            <li><strong>Juros rotativos:</strong> cobrados sobre o valor não pago. Passam de 400% ao ano!</li>
          </ul>

          <h3>Regras de ouro</h3>
          <ol>
            <li>Só gaste o que você pode pagar à vista.</li>
            <li>Sempre pague a fatura <strong>integral</strong>.</li>
            <li>Nunca use mais de 30% do limite.</li>
            <li>Nunca pague o "mínimo".</li>
            <li>Trate o cartão como dinheiro, não como renda extra.</li>
          </ol>

          <div class="caixa-alerta">
            <strong>Exemplo real:</strong> R$ 1.000 no rotativo a 15%/mês viram <strong>R$ 2.313 em 6 meses</strong>. Teste na nossa calculadora!
          </div>

          <div class="caixa-dica">
            <strong>Alternativa:</strong> se não conseguir pagar, ligue pro banco e negocie ANTES de virar dívida.
          </div>
        `
            },
            {
                id: '1.5',
                titulo: 'Regra 50-30-20 para orçamento',
                conteudo: `
          <h2>A regra 50-30-20</h2>
          <p>Método simples pra dividir o que você ganha e nunca ficar no vermelho.</p>

          <h3>Como funciona</h3>
          <ul>
            <li><strong>50% — Necessidades:</strong> aluguel, comida, transporte, contas básicas.</li>
            <li><strong>30% — Desejos:</strong> streaming, sair, roupa, jogos, delivery.</li>
            <li><strong>20% — Poupança/Metas:</strong> reserva de emergência, investimentos, curso.</li>
          </ul>

          <h3>Exemplo prático</h3>
          <p>Se você ganha <strong>R$ 1.500 por mês</strong>:</p>
          <ul>
            <li>R$ 750 pra necessidades</li>
            <li>R$ 450 pra desejos</li>
            <li>R$ 300 pra guardar</li>
          </ul>

          <h3>Como aplicar</h3>
          <ol>
            <li>Anote tudo que você gasta por 1 mês (app, caderno, planilha).</li>
            <li>Categorize em N / D / P.</li>
            <li>Compare com as porcentagens ideais.</li>
            <li>Ajuste aos poucos — não precisa ser perfeito de primeira.</li>
          </ol>

          <div class="caixa-dica">
            <strong>Dica:</strong> separe a parte dos 20% assim que receber, não espere "sobrar".
          </div>
        `
            }
        ]
    },
    {
        id: 2,
        titulo: 'Trilha 2: Empregabilidade e Carreira',
        itens: [
            {
                id: '2.1',
                titulo: 'Como montar o primeiro currículo',
                conteudo: `
          <h2>Seu primeiro currículo</h2>
          <p>Sem experiência? Sem problema. Você tem mais pra mostrar do que imagina.</p>

          <h3>Estrutura ideal</h3>
          <ol>
            <li><strong>Dados pessoais:</strong> nome, telefone, e-mail, cidade.</li>
            <li><strong>Objetivo:</strong> 1 ou 2 linhas dizendo o que busca.</li>
            <li><strong>Formação:</strong> escola, curso técnico, faculdade.</li>
            <li><strong>Experiências:</strong> trabalhos voluntários, projetos escolares, freelas, monitorias.</li>
            <li><strong>Habilidades:</strong> Excel, inglês, comunicação, trabalho em equipe.</li>
            <li><strong>Cursos:</strong> qualquer curso livre (online inclusive).</li>
          </ol>

          <h3>Dicas que fazem diferença</h3>
          <ul>
            <li>Máximo <strong>1 página</strong>.</li>
            <li>Fonte simples (Arial, Calibri), tamanho 11-12.</li>
            <li>Sem foto (a não ser que peçam).</li>
            <li>Sem cor de fonte estranha.</li>
            <li>Salve em PDF — nunca Word.</li>
          </ul>

          <div class="caixa-dica">
            <strong>Use nossa ferramenta:</strong> vá em <em>Ferramentas → Gerador de Currículo</em> e monte o seu em minutos.
          </div>
        `
            },
            {
                id: '2.2',
                titulo: 'Simulador de entrevista',
                conteudo: `
          <h2>Preparando-se para a entrevista</h2>
          <p>Entrevista não é interrogatório — é conversa. Prepare-se pra ficar tranquilo.</p>

          <h3>Perguntas clássicas</h3>
          <ul>
            <li><em>"Fale sobre você."</em> → 1 minuto: formação + interesse + motivo.</li>
            <li><em>"Qual seu maior defeito?"</em> → cite um real + como está melhorando.</li>
            <li><em>"Por que devemos te contratar?"</em> → cite 2 habilidades + vontade de aprender.</li>
            <li><em>"Onde se vê em 5 anos?"</em> → mostre ambição realista.</li>
            <li><em>"Por que quer trabalhar aqui?"</em> → pesquise a empresa antes!</li>
          </ul>

          <h3>Antes da entrevista</h3>
          <ol>
            <li>Pesquise sobre a empresa (site, Instagram, notícias).</li>
            <li>Treine em voz alta — sozinho ou com alguém.</li>
            <li>Separe a roupa no dia anterior.</li>
            <li>Chegue 10 min antes.</li>
            <li>Leve uma cópia do currículo impresso.</li>
          </ol>

          <div class="caixa-dica">
            <strong>Use nossa ferramenta:</strong> <em>Ferramentas → Simulador de Entrevista</em>.
          </div>
        `
            },
            {
                id: '2.3',
                titulo: 'Direitos trabalhistas básicos',
                conteudo: `
          <h2>Seus direitos como trabalhador</h2>

          <h3>Tipos de contratação</h3>
          <ul>
            <li><strong>CLT:</strong> carteira assinada. Tem FGTS, 13º, férias, INSS.</li>
            <li><strong>Estágio:</strong> Lei 11.788. Tem bolsa-auxílio, recesso, seguro.</li>
            <li><strong>Jovem Aprendiz:</strong> 14 a 24 anos, contrato especial com formação.</li>
            <li><strong>MEI/PJ:</strong> você é autônomo. Sem direitos CLT, mas paga menos imposto.</li>
          </ul>

          <h3>Direitos garantidos (CLT)</h3>
          <ul>
            <li>13º salário</li>
            <li>Férias de 30 dias + 1/3</li>
            <li>FGTS (8% do salário)</li>
            <li>INSS (aposentadoria)</li>
            <li>Hora extra (50% a mais)</li>
            <li>Aviso prévio em demissão</li>
            <li>Seguro-desemprego (em alguns casos)</li>
          </ul>

          <div class="caixa-info">
            <strong>Carteira digital:</strong> baixe o app <em>CTPS Digital</em> e veja seu histórico de trabalho.
          </div>
        `
            },
            {
                id: '2.4',
                titulo: 'Carteira de trabalho digital',
                conteudo: `
          <h2>Carteira de Trabalho Digital</h2>
          <p>Desde 2019 tudo é digital. Você acessa pelo celular, sem papel.</p>

          <h3>Como acessar</h3>
          <ol>
            <li>Baixe o app <strong>CTPS Digital</strong> (Android/iOS).</li>
            <li>Entre com sua conta <strong>gov.br</strong>.</li>
            <li>Pronto! Todos os contratos aparecem ali.</li>
          </ol>

          <h3>O que dá pra fazer</h3>
          <ul>
            <li>Ver contratos ativos e antigos</li>
            <li>Consultar salário e data de admissão</li>
            <li>Ver benefícios do INSS</li>
            <li>Pedir seguro-desemprego</li>
          </ul>

          <div class="caixa-dica">
            <strong>Dica:</strong> crie sua conta gov.br nível <em>prata</em> ou <em>ouro</em> — dá acesso a todos os serviços públicos.
          </div>
        `
            },
            {
                id: '2.5',
                titulo: 'Soft skills que recrutadores buscam',
                conteudo: `
          <h2>Soft skills que fazem diferença</h2>
          <p>Habilidades técnicas se aprendem. As comportamentais te destacam.</p>

          <h3>As mais pedidas</h3>
          <ul>
            <li><strong>Comunicação:</strong> saber falar, ouvir e escrever e-mails claros.</li>
            <li><strong>Trabalho em equipe:</strong> colaborar sem criar atrito.</li>
            <li><strong>Organização:</strong> cumprir prazos, não perder prazos.</li>
            <li><strong>Proatividade:</strong> não esperar ser mandado pra agir.</li>
            <li><strong>Resiliência:</strong> aceitar feedback sem desabar.</li>
            <li><strong>Curiosidade:</strong> aprender rápido o que não sabe.</li>
          </ul>

          <h3>Como treinar</h3>
          <ol>
            <li>Participe de projetos, grupos, monitorias.</li>
            <li>Pratique escrever e-mails formais.</li>
            <li>Peça feedback a professores e colegas.</li>
            <li>Assista vídeos sobre comunicação corporativa.</li>
          </ol>

          <div class="caixa-info">
            <strong>Fonte:</strong> pesquisas de RH apontam comunicação formal como maior barreira dos jovens no primeiro emprego.
          </div>
        `
            }
        ]
    },
    {
        id: 3,
        titulo: 'Trilha 3: Burocracia e Cidadania',
        itens: [
            {
                id: '3.1',
                titulo: 'CPF, RG e Título de Eleitor',
                conteudo: `
          <h2>Documentos essenciais da vida adulta</h2>

          <h3>CPF</h3>
          <ul>
            <li>Serve pra tudo: trabalhar, abrir conta, comprar, estudar.</li>
            <li>Se perdeu, dá pra tirar 2ª via pelo site da Receita.</li>
            <li>Também dá pra usar o CPF Digital no app gov.br.</li>
          </ul>

          <h3>RG</h3>
          <ul>
            <li>Identidade civil. Emitido no Poupatempo/Detran/SSP do seu estado.</li>
            <li>O novo RG (CIN) usa o CPF como número único.</li>
          </ul>

          <h3>Título de Eleitor</h3>
          <ul>
            <li><strong>Obrigatório a partir dos 18 anos</strong> (facultativo dos 16-18).</li>
            <li>Tire pelo site do TSE — <a href="https://www.tse.jus.br" target="_blank">tse.jus.br</a>.</li>
            <li>Sem ele, você não pode: tirar passaporte, tomar posse em cargo público, se matricular em federal.</li>
          </ul>

          <div class="caixa-dica">
            <strong>Guarde tudo digitalizado</strong> no Google Drive ou gov.br — evita correria.
          </div>
        `
            },
            {
                id: '3.2',
                titulo: 'Declaração de Imposto de Renda desmistificada',
                conteudo: `
          <h2>Imposto de Renda sem medo</h2>

          <h3>Quem precisa declarar?</h3>
          <ul>
            <li>Recebeu acima de <strong>R$ 30.639,90</strong> em 2024 (rendimentos tributáveis).</li>
            <li>Teve ganho de capital (vendeu ações, imóvel).</li>
            <li>Movimentou mais de R$ 800 mil em ações.</li>
            <li>Tem bens acima de R$ 800 mil.</li>
          </ul>

          <h3>Prazo</h3>
          <p>Geralmente entre <strong>março e maio</strong> de cada ano.</p>

          <h3>Como declarar</h3>
          <ol>
            <li>Baixe o app <strong>Meu Imposto de Renda</strong> ou o programa da Receita.</li>
            <li>Reúna informes de rendimento (empresa, banco).</li>
            <li>Preencha os dados — o app puxa muita coisa automaticamente.</li>
            <li>Envie e guarde o recibo.</li>
          </ol>

          <h3>Restituição</h3>
          <p>É o dinheiro que o governo devolve quando você pagou mais imposto do que devia.</p>

          <div class="caixa-alerta">
            <strong>Não declarar quando deveria</strong> gera multa de 1% ao mês sobre o imposto devido.
          </div>

          <div class="caixa-info">
            <strong>Oficial:</strong> <a href="https://www.gov.br/receitafederal" target="_blank">Receita Federal</a>
          </div>
        `
            },
            {
                id: '3.3',
                titulo: 'Contratos do dia a dia',
                conteudo: `
          <h2>Antes de assinar um contrato</h2>
          <p>Contrato é compromisso. Leia TUDO antes — mesmo que seja "padrão".</p>

          <h3>O que SEMPRE olhar</h3>
          <ul>
            <li><strong>Valor:</strong> quanto, como e quando paga.</li>
            <li><strong>Prazo:</strong> por quanto tempo vale.</li>
            <li><strong>Multas:</strong> por quebra de contrato.</li>
            <li><strong>Reajuste:</strong> se o valor pode subir e quando.</li>
            <li><strong>Rescisão:</strong> como sair sem dor de cabeça.</li>
            <li><strong>Responsabilidades:</strong> quem paga o quê.</li>
          </ul>

          <h3>Aluguel de república</h3>
          <ul>
            <li>Veja se o contrato é no seu nome ou no de outra pessoa.</li>
            <li>Confira se tem <strong>fiador</strong> ou <strong>caução</strong>.</li>
            <li>Leia sobre <strong>IPTU, condomínio, luz e água</strong>.</li>
          </ul>

          <h3>Plano de celular</h3>
          <ul>
            <li>Verifique <strong>fidelidade</strong> — sair antes pode gerar multa.</li>
            <li>Confira a franquia de internet.</li>
            <li>Reajuste anual está previsto? Em quanto?</li>
          </ul>

          <div class="caixa-dica">
            <strong>Dica:</strong> tire foto do contrato assinado e guarde por e-mail.
          </div>
        `
            },
            {
                id: '3.4',
                titulo: 'Serviços públicos digitais',
                conteudo: `
          <h2>Resolva tudo pelo celular</h2>
          <p>Hoje quase tudo dá pra fazer sem sair de casa — desde que você tenha conta <strong>gov.br</strong>.</p>

          <h3>App gov.br</h3>
          <ul>
            <li>Consultar CPF, CNIS, INSS</li>
            <li>Agendar RG, Poupatempo, Detran</li>
            <li>Acessar Carteira de Trabalho Digital</li>
            <li>Ver benefícios sociais</li>
            <li>Assinar documentos digitalmente</li>
          </ul>

          <h3>Níveis da conta gov.br</h3>
          <ul>
            <li><strong>Bronze:</strong> acesso básico.</li>
            <li><strong>Prata:</strong> validação por banco ou biometria.</li>
            <li><strong>Ouro:</strong> acesso total, inclusive assinatura digital.</li>
          </ul>

          <div class="caixa-dica">
            <strong>Ative o nível prata</strong> pelo seu banco — desbloqueia quase tudo.
          </div>
        `
            },
            {
                id: '3.5',
                titulo: 'Segurança no PIX',
                conteudo: `
          <h2>PIX seguro é PIX conferido</h2>

          <h3>Checklist antes de transferir</h3>
          <ol>
            <li>Confira o <strong>nome do destinatário</strong> — o app mostra!</li>
            <li>Confirme o valor <strong>duas vezes</strong>.</li>
            <li>Nunca faça PIX "pra receber prêmio".</li>
            <li>Não envie prints do comprovante com dados expostos.</li>
            <li>Desconfie de urgência ("é pra agora!!").</li>
          </ol>

          <h3>Sinais de golpe</h3>
          <ul>
            <li>Pessoa desconhecida pedindo PIX</li>
            <li>"Central do banco" pedindo senha</li>
            <li>Link pra "regularizar sua conta"</li>
            <li>Boleto+PIX juntos "pra adiantar"</li>
          </ul>

          <div class="caixa-alerta">
            <strong>Se cair em golpe:</strong> ligue pro banco IMEDIATAMENTE e registre BOE (Boletim de Ocorrência Eletrônico). O Mecanismo Especial de Devolução (MED) pode reaver o dinheiro.
          </div>
        `
            }
        ]
    }
];

// Controle de itens lidos
let itensLidos = JSON.parse(localStorage.getItem('itensLidos') || '[]');

function salvarLidos() {
    localStorage.setItem('itensLidos', JSON.stringify(itensLidos));
}

/* ---------- Renderização das trilhas ---------- */
function renderizarTrilhas(filtro = '') {
    const container = document.getElementById('listaTrilhas');
    container.innerHTML = '';

    trilhas.forEach(t => {
        const itensFiltrados = t.itens.filter(i =>
            i.titulo.toLowerCase().includes(filtro.toLowerCase())
        );
        if (filtro && itensFiltrados.length === 0) return;

        const favoritado = favoritos.includes(t.id);
        const favIcon = favoritado
            ? `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
            : `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
        
        const div = document.createElement('div');
        div.className = 'trilha';

        div.innerHTML = `
        <button class="btn-fav ${favoritado ? 'ativo' : ''}"
              onclick="toggleFavorito(${t.id})"
              title="${favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
              aria-label="${favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
            ${favIcon}
        </button>
        <h3>${t.titulo}</h3>
        <ul class="conteudo" style="list-style:none; padding-left:0">
        ${itensFiltrados.map(item => {
            const lido = itensLidos.includes(item.id);
            return `
            <li class="item-conteudo ${lido ? 'lido' : ''}"
                onclick="abrirConteudo('${item.id}')">
              <span>${lido ? '✅' : '📖'} ${item.titulo}</span>
              <span class="badge-lido">${lido ? 'lido' : 'abrir →'}</span>
            </li>
          `;
        }).join('')}
        </ul>
    `;
        container.appendChild(div);
    });

    renderizarProgresso();
}

/* ---------- Abrir conteúdo no modal ---------- */
function abrirConteudo(idItem) {
    // Encontra o item
    let itemEncontrado = null;
    trilhas.forEach(t => {
        const it = t.itens.find(i => i.id === idItem);
        if (it) itemEncontrado = it;
    });
    if (!itemEncontrado) return;

    const box = document.getElementById('conteudoTrilha');
    box.innerHTML = `<div class="conteudo-trilha">${itemEncontrado.conteudo}</div>`;

    // Marca como lido
    if (!itensLidos.includes(idItem)) {
        itensLidos.push(idItem);
        salvarLidos();
        renderizarTrilhas(document.getElementById('busca').value);
    }

    abrirModal('modalConteudo');
}

/* ---------- Barra de progresso geral ---------- */
function renderizarProgresso() {
    const total = trilhas.reduce((acc, t) => acc + t.itens.length, 0);
    const lidos = itensLidos.length;
    const pct = total ? Math.round((lidos / total) * 100) : 0;

    const container = document.getElementById('progressoTrilhas');
    if (!container) return;

    container.innerHTML =
        'Progresso geral: ' + lidos + '/' + total +
        ' conteúdos (' + pct + '%)' +
        '<div class="barra-progresso">' +
        '<div class="preenchido" style="width:' + pct + '%"></div>' +
        '</div>';
}

/* =========================================================
   FAVORITOS 
   ========================================================= */
function toggleFavorito(id) {
    const idx = favoritos.indexOf(id);
    if (idx > -1) favoritos.splice(idx, 1);
    else favoritos.push(id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderizarTrilhas(document.getElementById('busca').value);
    renderizarFavoritos();
}

function renderizarFavoritos() {
    const container = document.getElementById('listaFavoritos');

    if (favoritos.length === 0) {
        container.innerHTML = '<p>Nenhum conteúdo favoritado ainda.</p>';
        return;
    }

    container.innerHTML = favoritos.map(id => {
        const t = trilhas.find(x => x.id === id);
        if (!t) return '';

        // Agora cada item é um OBJETO → usamos i.titulo e i.id
        const itensHTML = t.itens.map(item => {
            const lido = itensLidos.includes(item.id);
            return `
        <li class="item-conteudo ${lido ? 'lido' : ''}"
            onclick="abrirConteudo('${item.id}')">
          <span>${lido ? '✅' : '📖'} ${item.titulo}</span>
          <span class="badge-lido">${lido ? 'lido' : 'abrir →'}</span>
        </li>
      `;
        }).join('');

        return `
      <div class="trilha">
        <h3>${t.titulo}</h3>
        <ul class="conteudo" style="list-style:none; padding-left:0">
          ${itensHTML}
        </ul>
      </div>
    `;
    }).join('');
}

/* =========================================================
   GLOSSÁRIO 
   ========================================================= */
const glossario = [
    { termo: 'SELIC', def: 'É a taxa básica de juros do Brasil. Pense nela como o "preço do dinheiro" no país.' },
    { termo: 'FGTS', def: 'Fundo de Garantia do Tempo de Serviço. É como uma poupança que seu patrão deposita pra você todo mês.' },
    { termo: 'CNPJ', def: 'É o "CPF" das empresas. Cada negócio tem um número único de identificação.' },
    { termo: 'INSS', def: 'É o desconto do salário que garante sua aposentadoria no futuro.' },
    { termo: 'IRRF', def: 'Imposto de Renda Retido na Fonte. É o imposto que já vem descontado do salário.' },
    { termo: 'PIX', def: 'Sistema de transferência instantânea do Banco Central. Funciona 24h, todos os dias.' },
    { termo: 'CLT', def: 'Consolidação das Leis do Trabalho. É o conjunto de regras que protegem o trabalhador com carteira assinada.' },
    { termo: 'Carnê-leão', def: 'Imposto que autônomos pagam mensalmente sobre o que recebem.' },
    { termo: 'Restituição', def: 'Dinheiro que o governo devolve quando você pagou mais imposto do que devia.' },
    { termo: 'Juros rotativos', def: 'Juros altíssimos cobrados quando você não paga a fatura do cartão inteira.' }
];

function renderizarGlossario(filtro = '') {
    const container = document.getElementById('listaGlossario');
    container.innerHTML = glossario
        .filter(g => g.termo.toLowerCase().includes(filtro.toLowerCase()) ||
            g.def.toLowerCase().includes(filtro.toLowerCase()))
        .map(g => `<div class="termo"><strong>${g.termo}:</strong> ${g.def}</div>`)
        .join('') || '<p>Nenhum termo encontrado.</p>';
}

function filtrarGlossario() {
    renderizarGlossario(document.getElementById('buscaGlossario').value);
}

/* =========================================================
   CHECKLIST 
   ========================================================= */

const tarefasPadrao = [
    'Abrir conta no banco',
    'Entender o Imposto de Renda',
    'Fazer o primeiro currículo',
    'Tirar ou regularizar o Título de Eleitor',
    'Aprender a usar o PIX com segurança',
    'Criar um orçamento mensal',
    'Entender o que é CLT e estágio',
    'Conhecer meus direitos trabalhistas',
    'Saber usar o app da Receita Federal',
    'Ler um contrato antes de assinar'
];

// Carrega do localStorage ou usa o padrão
let tarefas = JSON.parse(localStorage.getItem('tarefasChecklist'));
if (!tarefas || tarefas.length === 0) {
    tarefas = tarefasPadrao.map(t => ({ texto: t, feito: false }));
}

function salvarChecklist() {
    localStorage.setItem('tarefasChecklist', JSON.stringify(tarefas));
}

function renderizarChecklist() {
    const container = document.getElementById('listaChecklist');
    if (tarefas.length === 0) {
        container.innerHTML = '<p style="color:#6b7280">Nenhuma tarefa. Adicione uma acima </p>';
        document.getElementById('progressoChecklist').innerText = 'Progresso: 0/0';
        return;
    }

    container.innerHTML = tarefas.map((t, i) => `
    <div class="item-check ${t.feito ? 'feito' : ''}">
      <input type="checkbox" ${t.feito ? 'checked' : ''}
             onchange="toggleCheck(${i})">
      <label onclick="toggleCheck(${i})">${t.texto}</label>
      <div class="item-acoes">
        <button class="btn-icone" title="Editar" onclick="editarTarefa(${i})">✏️</button>
        <button class="btn-icone remover" title="Remover" onclick="removerTarefa(${i})">🗑️</button>
      </div>
    </div>
  `).join('');

    const feitos = tarefas.filter(t => t.feito).length;
    document.getElementById('progressoChecklist').innerText =
        `Progresso: ${feitos}/${tarefas.length} concluídos`;
}

function toggleCheck(i) {
    tarefas[i].feito = !tarefas[i].feito;
    salvarChecklist();
    renderizarChecklist();
}

function adicionarTarefa() {
    const input = document.getElementById('novaTarefa');
    const texto = input.value.trim();
    if (!texto) return alert('Digite uma tarefa!');
    if (tarefas.some(t => t.texto.toLowerCase() === texto.toLowerCase()))
        return alert('Essa tarefa já existe.');

    tarefas.push({ texto, feito: false });
    input.value = '';
    salvarChecklist();
    renderizarChecklist();
}

function removerTarefa(i) {
    if (!confirm(`Remover "${tarefas[i].texto}"?`)) return;
    tarefas.splice(i, 1);
    salvarChecklist();
    renderizarChecklist();
}

function editarTarefa(i) {
    const container = document.getElementById('listaChecklist');
    const item = container.children[i];
    const label = item.querySelector('label');
    const textoOriginal = tarefas[i].texto;

    // Substitui label por input
    label.outerHTML = `<input class="input-edicao" id="edit-${i}" value="${textoOriginal}">`;

    const input = document.getElementById(`edit-${i}`);
    input.focus();
    input.select();

    const finalizar = (salvar) => {
        if (salvar) {
            const novo = input.value.trim();
            if (novo && novo !== textoOriginal) {
                tarefas[i].texto = novo;
                salvarChecklist();
            }
        }
        renderizarChecklist();
    };

    input.addEventListener('blur', () => finalizar(true));
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); finalizar(true); }
        if (e.key === 'Escape') { finalizar(false); }
    });
}

function limparConcluidas() {
    const qtd = tarefas.filter(t => t.feito).length;
    if (qtd === 0) return alert('Nenhuma tarefa concluída.');
    if (!confirm(`Remover ${qtd} tarefa(s) concluída(s)?`)) return;
    tarefas = tarefas.filter(t => !t.feito);
    salvarChecklist();
    renderizarChecklist();
}

function resetarChecklist() {
    if (!confirm('Restaurar o checklist padrão? Suas tarefas personalizadas serão perdidas.')) return;
    tarefas = tarefasPadrao.map(t => ({ texto: t, feito: false }));
    salvarChecklist();
    renderizarChecklist();
}

/* =========================================================
   GERADOR DE CURRÍCULO 
   ========================================================= */
function gerarCurriculo() {
    const nome = document.getElementById('cvNome').value;
    const email = document.getElementById('cvEmail').value;
    const telefone = document.getElementById('cvTelefone').value;
    const objetivo = document.getElementById('cvObjetivo').value;
    const experiencia = document.getElementById('cvExperiencia').value;
    const formacao = document.getElementById('cvFormacao').value;
    const skills = document.getElementById('cvSkills').value;

    if (!nome || !email) return alert('Preencha pelo menos nome e e-mail.');

    const preview = document.getElementById('cvPreview');
    preview.style.display = 'block';
    preview.innerHTML = `
    <h3>${nome}</h3>
    <p>${email} | ${telefone}</p>
    <div class="sec"><h4>Objetivo</h4><p>${objetivo}</p></div>
    <div class="sec"><h4>Experiência</h4><p>${experiencia.replace(/\n/g, '<br>')}</p></div>
    <div class="sec"><h4>Formação</h4><p>${formacao.replace(/\n/g, '<br>')}</p></div>
    <div class="sec"><h4>Habilidades</h4><p>${skills}</p></div>
  `;
    window.scrollTo({ top: preview.offsetTop, behavior: 'smooth' });
}

function exportarPDF() {
    const preview = document.getElementById('cvPreview');
    if (!preview.innerHTML.trim()) {
        return alert('Gere o currículo primeiro.');
    }
    window.print();
}

function limparCurriculo() {
   
    const preview = document.getElementById('cvPreview');
    const temPreview = preview.innerHTML.trim() !== '';

    if (temPreview) {
        if (!confirm('Tem certeza que deseja limpar todos os campos e o currículo gerado?')) return;
    }
  
    document.getElementById('cvNome').value = '';
    document.getElementById('cvEmail').value = '';
    document.getElementById('cvTelefone').value = '';
    document.getElementById('cvObjetivo').value = '';
    document.getElementById('cvExperiencia').value = '';
    document.getElementById('cvFormacao').value = '';
    document.getElementById('cvSkills').value = '';

    preview.innerHTML = '';
    preview.style.display = 'none';

    document.getElementById('cvNome').focus();
}

/* =========================================================
   SIMULADOR DE SALÁRIO LÍQUIDO 
   ========================================================= */
function toggleHoras() {
    const box = document.getElementById('boxHoras');
    box.style.display = document.getElementById('temHorasExtras').checked ? 'flex' : 'none';
}

function calcularSalario() {
    const bruto = parseFloat(document.getElementById('salBruto').value) || 0;
    if (bruto <= 0) return alert('Informe um salário bruto válido.');

    const outros = parseFloat(document.getElementById('outrosDescontos').value) || 0;
    const temExtras = document.getElementById('temHorasExtras').checked;
    const qtdHoras = temExtras ? (parseFloat(document.getElementById('qtdHoras').value) || 0) : 0;

    // Horas extras: 50% sobre o valor-hora (jornada 220h/mês)
    const valorHora = bruto / 220;
    const valorExtras = qtdHoras * valorHora * 1.5;
    const salarioBase = bruto + valorExtras;

    let inss = 0;
    const faixasINSS = [
        { ate: 1621.00, aliq: 0.075 },
        { ate: 2902.84, aliq: 0.09 },
        { ate: 4354.27, aliq: 0.12 },
        { ate: 8475.55, aliq: 0.14 }
    ];
    let restante = salarioBase;
    let anterior = 0;
    for (const f of faixasINSS) {
        if (restante <= 0) break;
        const base = Math.min(restante, f.ate - anterior);
        inss += base * f.aliq;
        restante -= base;
        anterior = f.ate;
    }

    const baseIR = salarioBase - inss;

    let irrf = 0;
    if (baseIR <= 2428.80) {
        irrf = 0;
    } else if (baseIR <= 2826.65) {
        irrf = baseIR * 0.075 - 182.16;
    } else if (baseIR <= 3751.05) {
        irrf = baseIR * 0.15 - 394.16;
    } else if (baseIR <= 4664.68) {
        irrf = baseIR * 0.225 - 675.49;
    } else {
        irrf = baseIR * 0.275 - 908.73;
    }

    // Redução IRRF 2026 (isenção até R$ 5.000)
    let reducao = 0;
    if (salarioBase <= 5000) {
        reducao = Math.min(irrf, 312.89);
    } else if (salarioBase <= 7350) {
        reducao = Math.max(0, 978.62 - (0.133145 * salarioBase));
        reducao = Math.min(reducao, irrf);
    }
    irrf = Math.max(0, irrf - reducao);

    // ---------- Totais ----------
    const totalDescontos = inss + irrf + outros;
    const liquido = salarioBase - totalDescontos;

    // ---------- Topo ----------
    document.getElementById('resSalarioTop').innerText =
        'Salário líquido: R$ ' + liquido.toFixed(2).replace('.', ',');

    // ---------- Legenda ----------
    document.getElementById('legProventos').innerText =
        'R$ ' + salarioBase.toFixed(2).replace('.', ',');
    document.getElementById('legDescontos').innerText =
        'R$ ' + totalDescontos.toFixed(2).replace('.', ',');

    // ---------- Gráfico (azul = proventos, rosa = descontos) ----------
    const totalGeral = salarioBase + totalDescontos;
    const pctProventos = totalGeral > 0 ? (salarioBase / totalGeral) : 0;
    const pctDescontos = totalGeral > 0 ? (totalDescontos / totalGeral) : 0;
    const circunferencia = 2 * Math.PI * 50; // ~314.16

    const arcoAzul = pctProventos * circunferencia;
    const arcoRosa = pctDescontos * circunferencia;

    // Arco azul: começa no topo (dashoffset 0)
    const elAzul = document.getElementById('arcoProventos');
    elAzul.setAttribute('stroke-dasharray', arcoAzul + ' ' + circunferencia);
    elAzul.setAttribute('stroke-dashoffset', 0);

    // Arco rosa: começa onde o azul termina (offset negativo)
    const elRosa = document.getElementById('arcoDescontos');
    elRosa.setAttribute('stroke-dasharray', arcoRosa + ' ' + circunferencia);
    elRosa.setAttribute('stroke-dashoffset', -arcoAzul);

    // Texto no centro
    document.getElementById('graficoCentro').innerHTML =
        Math.round(pctProventos * 100) + '%<br><small style="font-size:0.7rem;color:#6b7280">líquido</small>';

    // ---------- Detalhamento ----------
    const det = document.getElementById('resSalarioDetalhe');
    det.classList.add('ativo');
    det.innerHTML =
        '<h4>Detalhamento do cálculo (2026)</h4>' +
        '<p><strong>Salário bruto:</strong> R$ ' + bruto.toFixed(2).replace('.', ',') + '</p>' +
        (valorExtras > 0
            ? '<p><strong>Horas extras (' + qtdHoras + 'h):</strong> + R$ ' + valorExtras.toFixed(2).replace('.', ',') + '</p>'
            : '') +
        '<p><strong>INSS (2026):</strong> - R$ ' + inss.toFixed(2).replace('.', ',') + '</p>' +
        '<p><strong>IRRF (2026):</strong> - R$ ' + irrf.toFixed(2).replace('.', ',') + '</p>' +
        (reducao > 0
            ? '<p><em>Redução do IRRF aplicada: R$ ' + reducao.toFixed(2).replace('.', ',') + '</em></p>'
            : '') +
        (outros > 0
            ? '<p><strong>Outros descontos:</strong> - R$ ' + outros.toFixed(2).replace('.', ',') + '</p>'
            : '') +
        '<hr>' +
        '<p style="font-size:1.1rem"><strong>💵 Salário líquido: R$ ' +
        liquido.toFixed(2).replace('.', ',') + '</strong></p>' +
        '<small style="color:#6b7280">*Estimativa baseada nas tabelas de INSS e IRRF de 2026. O valor real pode variar conforme a situação de cada trabalhador.</small>';
}

/* =========================================================
   SIMULADOR DE JUROS DO CARTÃO (RF11)
   ========================================================= */
function calcularJuros() {
    const valor = parseFloat(document.getElementById('valorDivida').value);
    const taxa = parseFloat(document.getElementById('taxaJuros').value) / 100;
    const meses = parseInt(document.getElementById('meses').value);

    if (!valor || !taxa || !meses) return alert('Preencha todos os campos.');

    const total = valor * Math.pow(1 + taxa, meses);
    const juros = total - valor;

    document.getElementById('resJuros').innerHTML = `
    <p>Dívida inicial: R$ ${valor.toFixed(2)}</p>
    <p>Após <strong>${meses} meses</strong> com juros de ${(taxa * 100).toFixed(1)}% ao mês:</p>
    <p style="color:#dc2626; font-size:1.2rem;">
      💸 Total a pagar: <strong>R$ ${total.toFixed(2)}</strong>
    </p>
    <p>Juros acumulados: <strong>R$ ${juros.toFixed(2)}</strong></p>
    <small>Isso mostra o perigo do crédito rotativo!</small>
  `;
}

function limparJuros() {
    const resultado = document.getElementById('resJuros');
    const temResultado = resultado.innerHTML.trim() !== '';

    if (temResultado) {
        if (!confirm('Tem certeza que deseja limpar os campos e o resultado?')) return;
    }

    document.getElementById('valorDivida').value = '';
    document.getElementById('taxaJuros').value = '';  
    document.getElementById('meses').value = '';       

    resultado.innerHTML = '';

    document.getElementById('valorDivida').focus();
}

/* =========================================================
   SIMULADOR DE ENTREVISTA (RF17)
   ========================================================= */
const perguntas = [
    { p: 'Fale sobre você.', d: 'Resuma em 1 min: formação, interesses e o que te motiva.' },
    { p: 'Qual seu maior defeito?', d: 'Cite um defeito real e diga como você tem trabalhado para melhorar.' },
    { p: 'Por que devemos te contratar?', d: 'Fale das suas habilidades e do que você pode agregar à empresa.' },
    { p: 'Onde você se vê em 5 anos?', d: 'Mostre ambição realista e alinhada com a vaga.' },
    { p: 'Por que quer trabalhar aqui?', d: 'Pesquise sobre a empresa e cite algo específico.' }
];
let idxPergunta = 0;

function proximaPergunta() {
    const box = document.getElementById('perguntaBox');
    const q = perguntas[idxPergunta];
    box.innerHTML = `
    <div class="trilha">
      <h3>❓ ${q.p}</h3>
      <p><strong>💡 Dica:</strong> ${q.d}</p>
    </div>
  `;
    idxPergunta = (idxPergunta + 1) % perguntas.length;
}

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */
window.onload = () => {
    const u = localStorage.getItem('usuarioLogado');
    if (u) usuarioLogado = JSON.parse(u);
    atualizarHeader();
    renderizarTrilhas();
    renderizarGlossario();
    renderizarChecklist();
    renderizarFavoritos();
    proximaPergunta();
};