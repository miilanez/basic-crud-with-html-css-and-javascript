window.addEventListener('load', start);

//Declaração de variáveis globais
var options = ['Um', 'Dois', 'Três'];
var names = document.querySelector('#names');
var ul = document.createElement('ul');
var Input = document.getElementById('Input');
var form = document.getElementById('Formulario');
var isEditing = false;
var posicao;

function start() {
    PrevenirComportamentoDefault(form);
    AplicarFoco(Input);
    CapturarValoresDigitados(Input);
    ExibirVetor();
}

function PrevenirComportamentoDefault(Objeto) {
    Objeto.addEventListener('submit', function (event) {
        event.preventDefault();
    });
}

function AplicarFoco(Objeto) {
    Objeto.focus();
}

function CapturarValoresDigitados(Objeto) {
    Objeto.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            var valorDigitado = event.target.value; // obtendo conteudo digitado

            //se algum valor tiver sido digitado, então editar ou inserir
            if (valorDigitado) {
                if(isEditing) {
                    //editando valores
                    options.splice(posicao, 1, valorDigitado);
                    isEditing = false;
                } else {
                    //inserindo valores
                    options.push(valorDigitado); //inserindo no array options
                }
            }

            ExibirVetor(); //atualizar site e exibir vetor com novo valor
        }

    });
}

function ExibirVetor() {
    //limpando conteudo da ul e input para receber novos valores
    ul.innerHTML = '';
    Input.value = '';

    //para cada posição do vetor, executar a função PercorrerVetor
    options.forEach(PercorrerVetor);
    names.appendChild(ul); // adicionar ul na div names para ser exibida no site
}

function PercorrerVetor(item) {
    var li = document.createElement('li');

    li.appendChild(criarBotao()); //cria e adiciona o botão x na li
    li.appendChild(criarSpan(item)); //cria e adiciona o span na li
    ul.appendChild(li); // adicionando li na ul
}

function criarBotao() {
    var botao = document.createElement('button');
    //adicionando classe deleteButton
    botao.classList.add('deleteButton');
    botao.textContent = 'x'; // adicionando conteúdo do botão

    //retornando botão criado ao ponto de chamada dessa função
    return botao;
}

function criarSpan(valor) {
    var span = document.createElement('span');
    span.textContent = valor; //adicionando o valor do span dentro do span
    span.classList.add("clicavel");
    span.addEventListener('click', EditarItem);
    //retornando valor dentro do span
    return span;
}

function EditarItem(event) {
    //capturando valor dentro do elemento clicado
    var valor = event.target.innerHTML;

    var index = options.indexOf(valor); //identificando indice
    Input.value = options[index];
    AplicarFoco(Input);//aplicando foco no input
    isEditing = true;
    posicao = index;
}

//deletando elementos da lista que forem criados
ul.addEventListener('click', function (event) {
    //realizar evento apenas quando o usuario clicar no botão
    if (event.target.localName === 'button') {
        //capturando o valor do elemento clicado
        var valor = event.srcElement.nextElementSibling.innerHTML;

        //deletando elemento de options
        var index = options.indexOf(valor); //identificando indice
        options.splice(index, 1);

        var ancestral = event.target.parentElement;
        ancestral.remove(); //removendo elemento do site
        ExibirVetor(); //atualizar site e exibir vetor com novo valor
    }
});