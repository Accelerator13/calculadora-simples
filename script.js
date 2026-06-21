let numeroAtual = '';
let numeroAnterior = '';
let operador = null;
let resetarVisor = false; // Indica se o próximo número deve limpar o visor (pós-cálculo)

const visor = document.getElementById('visor');

function atualizarVisor() {
    // Se o visor estiver vazio, mostra '0'
    visor.textContent = numeroAtual || '0';
}

function adicionarNumero(numero) {
    // Se o último botão clicado foi '=', começa um número novo
    if (resetarVisor) {
        numeroAtual = '';
        resetarVisor = false;
    }

    // Se o visor já tem a string 'Erro', limpa antes de digitar
    if (numeroAtual === 'Erro') numeroAtual = '';

    if (numeroAtual.length >= 10) return; // Limite de dígitos
    numeroAtual += numero;
    atualizarVisor();
}

function adicionarPonto() {
    if (resetarVisor) {
        numeroAtual = '0';
        resetarVisor = false;
    }
    if (numeroAtual === 'Erro') numeroAtual = '0';
    if (numeroAtual === '') numeroAtual = '0';
    if (numeroAtual.includes('.')) return;

    numeroAtual += '.';
    atualizarVisor();
}

function definirOperador(op) {
    if (numeroAtual === 'Erro') return;

    // Se o usuário quer apenas mudar o operador escolhido
    if (numeroAtual === '' && numeroAnterior !== '') {
        operador = op;
        return;
    }

    if (numeroAnterior !== '') {
        calcular();
    }

    operador = op;
    numeroAnterior = numeroAtual || '0';
    numeroAtual = '';
}

function calcular() {
    if (numeroAnterior === '' || numeroAtual === '' || operador === null) return;
    if (numeroAtual === 'Erro') return;

    let resultado;
    const num1 = parseFloat(numeroAnterior);
    const num2 = parseFloat(numeroAtual);

    switch (operador) {
        case '+': resultado = num1 + num2; break;
        case '-': resultado = num1 - num2; break;
        case '*': resultado = num1 * num2; break;
        case '/': 
            if (num2 === 0) {
                resultado = 'Erro';
            } else {
                resultado = num1 / num2;
            }
            break;
        default: return;
    }

    // Trata números decimais muito longos para não quebrar o layout
    if (typeof resultado === 'number' && !Number.isInteger(resultado)) {
        resultado = Math.round(resultado * 100000) / 100000; 
    }

    numeroAtual = resultado.toString();
    operador = null;
    numeroAnterior = '';
    resetarVisor = true; // Próximo número digitado vai sobrescrever o resultado
    atualizarVisor();
}

function limpar() {
    numeroAtual = '';
    numeroAnterior = '';
    operador = null;
    resetarVisor = false;
    atualizarVisor();
}

function apagar() {
    if (numeroAtual === 'Erro' || resetarVisor) {
        limpar();
        return;
    }
    numeroAtual = numeroAtual.slice(0, -1);
    atualizarVisor();
}

// --- MELHORIA: Suporte ao Teclado Físico ---
document.addEventListener('keydown', (event) => {
    const tecla = event.key;

    if (tecla >= '0' && tecla <= '9') adicionarNumero(tecla);
    if (tecla === '.' || tecla === ',') adicionarPonto();
    if (tecla === '+' || tecla === '-' || tecla === '*' || tecla === '/') definirOperador(tecla);
    if (tecla === 'Enter' || tecla === '=') {
        event.preventDefault(); // Evita comportamento padrão do Enter
        calcular();
    }
    if (tecla === 'Escape' || tecla === 'c' || tecla === 'C') limpar();
    if (tecla === 'Backspace') apagar();
});

// Inicializa o visor
atualizarVisor();