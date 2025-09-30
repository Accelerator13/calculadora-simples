let numeroAtual = '';
let numeroAnterior = '';
let operador = null;
const visor = document.getElementById('visor');

function atualizarVisor() {
    visor.textContent = numeroAtual || '0';
}

function adicionarNumero(numero) {
    if (numeroAtual.length >= 10) return;
    numeroAtual += numero;
    atualizarVisor();
}

function adicionarPonto() {
    if (numeroAtual.includes('.')) return;
    numeroAtual += '.';
    atualizarVisor();
}

function definirOperador(op) {
    if (numeroAtual === '') return;
    if (numeroAnterior !== '') {
        calcular();
    }
    operador = op;
    numeroAnterior = numeroAtual;
    numeroAtual = '';
}

function calcular() {
    if (numeroAnterior === '' || numeroAtual === '') return;
    let resultado;
    const num1 = parseFloat(numeroAnterior);
    const num2 = parseFloat(numeroAtual);

    switch (operador) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                resultado = 'Erro';
            } else {
                resultado = num1 / num2;
            }
            break;
        default:
            return;
    }

    numeroAtual = resultado.toString();
    operador = null;
    numeroAnterior = '';
    atualizarVisor();
}

function limpar() {
    numeroAtual = '';
    numeroAnterior = '';
    operador = null;
    atualizarVisor();
}

function apagar() {
    numeroAtual = numeroAtual.slice(0, -1);
    atualizarVisor();
}

atualizarVisor();
