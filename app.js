// Array para guardar os nomes dos amigos
let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    // Pega o campo de entrada onde o usuário digita o nome
    const inputAmigo = document.getElementById('amigo');
    // Pega o valor digitado e remove espaços em branco no início e no fim
    const nomeAmigo = inputAmigo.value.trim();

    // Verifica se o nome não está vazio e se já não foi adicionado
    if (nomeAmigo === "") {
        alert("Por favor, digite um nome!");
    } else if (amigos.includes(nomeAmigo)) {
        alert("Esse nome já foi adicionado!");
    } else {
        // Adiciona o nome ao array de amigos
        amigos.push(nomeAmigo);
        // Atualiza a lista de amigos na tela
        atualizarListaAmigos();
        // Limpa o campo de entrada
        inputAmigo.value = "";
    }
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
    // Pega a lista de amigos no HTML
    const listaAmigos = document.getElementById('listaAmigos');
    // Limpa a lista atual para não duplicar os nomes
    listaAmigos.innerHTML = "";

    // Para cada amigo no array, adiciona um item na lista
    amigos.forEach(function(amigo) {
        const li = document.createElement('li'); // Cria um novo item de lista
        li.textContent = amigo; // Coloca o nome do amigo no item
        listaAmigos.appendChild(li); // Adiciona o item à lista
    });
}

// Função para sortear os amigos secretos
function sortearAmigo() {
    // Verifica se há pelo menos 2 amigos na lista
    if (amigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para sortear!");
        return; // Sai da função se não houver amigos suficientes
    }

    // Cria uma cópia da lista de amigos e embaralha
    const amigosEmbaralhados = amigos.slice(); // Cria uma cópia do array
    embaralharArray(amigosEmbaralhados); // Embaralha a cópia

    // Cria um objeto para guardar quem tirou quem
    const sorteio = {};

    // Atribui a cada pessoa um amigo secreto
    for (let i = 0; i < amigosEmbaralhados.length; i++) {
        const amigoAtual = amigosEmbaralhados[i];
        const amigoSorteado = amigosEmbaralhados[(i + 1) % amigosEmbaralhados.length];
        sorteio[amigoAtual] = amigoSorteado;
    }

    // Mostra o resultado na tela
    exibirResultado(sorteio);
}

// Função para embaralhar um array (algoritmo simples)
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Escolhe um índice aleatório
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de posição
    }
}

// Função para mostrar o resultado na tela
function exibirResultado(sorteio) {
    // Pega a div onde o resultado será exibido
    const resultadoDiv = document.getElementById('resultado');
    // Limpa o conteúdo anterior
    resultadoDiv.innerHTML = "<h2>Resultado do Amigo Secreto:</h2>";

    // Para cada par de amigos, cria um parágrafo e adiciona ao resultado
    for (const [amigo, amigoSorteado] of Object.entries(sorteio)) {
        const p = document.createElement('p');
        p.textContent = `${amigo} ➔ ${amigoSorteado}`;
        resultadoDiv.appendChild(p);
    }
}