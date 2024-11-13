/*Declaração de variáveis:
menuLinks = armazena a interação dos links de navegação
linkLogin = armazena a interação dos links para login
page = recebe o atributo data page
url = recebe a página a ser carregada
contentElement = recebe uma referência a um elemento HTML
tabcontent = recebe elementos com a classe form
tablinks = recebe elementos com a classe tab
email = recebe o email informado para login
password = recebe a senha informada para o login
nome = recebe o nome informado para login
senhaCriada = recebe a senha informada no cadastro de novo usuário
senhaConfirmada = recebe a senha informada no cadastro de novo usuário campo confirmar senha
registroEfetuadoDiv = exibição de mensagem para cadastro realizado ou senhas incorretas
passwordInput = permite o o acesso e manipulção do elemento input referente a senha pelo id
mostrarPasswordImg = exibe a imagem de senha visível
esconderPasswordImg = exibe a imagem de senha invisível
cep = recebe o número de cep informado pelo usuário
cepFormatado = recebe o valor de *cep somente com caracteres numéricos
cepInput = recebe a referência do campo cep pelo seu ID
input = recebe o elemento CPF pelo seu ID
cpf = recebe o valor do elemento input
i = recebe o controle contador de todos loops "for"*/

//código para carregar páginas na página principal

document.addEventListener('DOMContentLoaded', function () { //executa a função abaixo quando o DOM é totalmente carregado
  var menuLinks = document.getElementsByClassName('menu-link');//seleciona os elementos com a classe menu-link que são armazenados na variável menuLinks
  var linkLogin = document.getElementsByClassName('link-login');//seleciona os elementos com a classe link-login que são armazenados na variável linkLogin

  for (var i = 0; i < menuLinks.length; i++) { //loop para execução do código para todos os elementos contidos na variável menuLinks
    menuLinks[i].addEventListener('click', function (e) {//adiciona o evento click para a execução da função
      e.preventDefault(); //evita o redirecionamento 

      var page = this.getAttribute('data-page'); //adiciona a variável page o valor do atributo data page
      loadPage(page);
    });
  }
  for (var i = 0; i < linkLogin.length; i++) {//mesma função da função acima, porém para elementos armazenados na variável linkLogin
    linkLogin[i].addEventListener('click', function (e) {
      e.preventDefault();

      var page = this.getAttribute('data-page'); //adiciona a variável page o valor do atributo data page
      loadPage(page);
    });
  }
});

function loadPage(page) {//função para carregamento das páginas conforme o valor de page
  var url = page + ".html"; //variável para armazenar e a url com o valor de page + ".html"

  fetch(url) //busca o conteúdo da variável url da página correspondente via http
    .then(function (response) {//recebe a resposta da requisição como argumento (response).
      if (!response.ok) { //verifica se a resposta da requisição foi bem-sucedida. Se não for, uma exceção é lançada com a mensagem de erro correspondente.
        throw new Error('Ocorreu um erro na requisição.');
      }
      return response.text();//retorna o conteúdo da resposta como texto
    })
    .then(function (data) { // recebe o conteúdo da página como texto (data).
      var contentElement = document.getElementById('content'); // var contentElement armazena o elemento 'content'. Se esse elemento não existir, o próximo elemento com o ID "content-estoque" é selecionado.
      if (!contentElement) {
        contentElement = document.getElementById('content-estoque');
      }
      contentElement.innerHTML = data;//o conteúdo da página é carregado e exibido dentro desse elemento
    })
    .catch(function (error) {
      console.error('Erro:', error); //Se ocorrer algum erro na requisição, o erro é impresso no console
    });
}

//javascript formulário login e registro

document.getElementById("login").style.display = "block"; // define o formulário com o ID "login" como visível
function openTab(evt, tabName) { //função openTab com 2 parâmetros: (nome da guia/formulário a ser exibido)
  var i, tabcontent, tablinks; //i (contador) tabcontent (elementos com a classe form) tab(elementos com a classe tab)
  tabcontent = document.getElementsByClassName("form"); // variável atribuída a elementos que possuem a classe "form".
  for (i = 0; i < tabcontent.length; i++) {//loop que percorre todos os elementos tabcontent
    tabcontent[i].style.display = "none";// Define o estilo dos elementos tabcontent como invisíveis
  }
  tablinks = document.getElementsByClassName("tab");//gatilho para alternar entre as abas ao clicar
  for (i = 0; i < tablinks.length; i++) { //Remove a classe "active"
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";//Define o formulário como visível (display: block;)
  evt.currentTarget.className += " active";//adiciona a classe active ao elemento ativo
}

function login() { //função de login para o formulário login
  var email = document.getElementById("email").value; //armazena o elemento com ID email
  var password = document.getElementById("password").value; //armazena o elemento com ID password
  var nome = document.getElementById("nome").value; //armazena o elemento com ID nome

  if (password === "1234") { //se a senha for === 1234 e e-mail terminar com @auaupet.com.br, redireciona para a página dashboardadm, incluindo na url o valor da variável nome 
    if (email.endsWith("@auaupet.com.br")) {
      window.location.href = "dashboardadm.html?nome=" + encodeURIComponent(nome);
    } else { ////se a senha for === 1234 e o e-mail não terminar com @auaupet.com.br, redireciona para a página clientelogado, incluindo na url o valor da variável nome 
      window.location.href = "clientelogado.html?nome=" + encodeURIComponent(nome);
    }
  } else {
    var senhaErradaDiv = document.querySelector(".senha-errada"); //variável senhaErradaDiv, seleciona o elemento de classe .senha-errada e imprime a informação de que a senha digitada não confere coma senha obrigatória 1234 para a exibição e simulação do funcionamento da verificação
    senhaErradaDiv.innerHTML = "<br>A senha não confere com o e-mail de cadastro!<br>";
  }

  return false; //impede a continuação do envio do formulário padrão
}

function registro() { //função para registro de usuário
  var senhaCriada = document.getElementById("criar-senha").value; //variável para armazenar valor do input com ID criar senha
  var senhaConfirmada = document.getElementById("confirmar-senha").value; //variável para armazenar valor do input com ID confirmar senha

  if (senhaCriada === senhaConfirmada) { // se senhaCriada for igual a senhaConfirmada
    var registroEfetuadoDiv = document.querySelector(".registro-efetuado");
    registroEfetuadoDiv.innerHTML = "<br>Registro realizado com sucesso!<br>Clique em acessar conta e faça seu login<br>"; //registroEfetuadodiv - variável criada para imprimir resposta na div .registro-efetuado
  } else {
    var registroEfetuadoDiv = document.querySelector(".registro-efetuado");
    registroEfetuadoDiv.innerHTML = "<br>As senhas não conferem!<br>";
  }

  return false; //impede a continuação do envio do formulário padrão
}

function senhaVisivel(inputId, mostrarImgClass, esconderImgClass) { //função para alterar a visibilidade da senha com os parâmetros do id do campo da senha, classe da imagem que mostra a senha e classe da imagem que oculta a senha
  var passwordInput = document.getElementById(inputId); // variável para acessar e manipular o elemento input da senha pelo id
  var mostrarPasswordImg = document.querySelector("." + mostrarImgClass); // variável para acessar e manipular a imagem do botão de mostrar senha pela classe
  var esconderPasswordImg = document.querySelector("." + esconderImgClass); // variável para acessar e manipular a imagem do botão de ocultar pela classe

  if (passwordInput.type === "password") { // verifica se o input da senha é === password, se for verdade, a senha está oculta
    passwordInput.type = "text"; // Altera o tipo do input da senha para "text", para que o texto digitado seja exibido na forma de texto legível
    mostrarPasswordImg.style.display = "none"; //Define a imagem do botão de mostrar senha como "display: none", para que fique invisível
    esconderPasswordImg.style.display = "inline"; //Define a imagem do botão de ocultar senha como "display: inline", para que fique visível.
  } else { // se o if for falso a senha está sendo exibida
    passwordInput.type = "password"; //volta a ser lido de forma oculta como password
    mostrarPasswordImg.style.display = "inline"; //Define a imagem do botão de mostrar senha como "display: inline", para que fique visível.
    esconderPasswordImg.style.display = "none"; //Define a imagem do botão de mostrar senha como "display: inline", para que fique visível.
  }

}

// Função para formatar o CEP
function formatarCEP(cep) {
  // Remove todos os caracteres não numéricos do valor do CEP
  cep = cep.replace(/\D/g, '');

  // Verifica se o CEP possui mais de 5 dígitos e adiciona o hífen
  if (cep.length > 5) {
    cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);//armazena o valor formatado do campo
  }

  return cep;
}

// Função para buscar o endereço com base no CEP informado
function buscarEndereco() {
  // Obtém o valor do CEP e remove todos os caracteres não numéricos
  var cep = document.getElementById('cep').value.replace(/\D/g, '');

  if (cep.length === 8) {
    // Formata o CEP
    var cepFormatado = formatarCEP(cep);

    // Atualiza o valor do campo de input do CEP com a versão formatada
    document.getElementById('cep').value = cepFormatado;

    // Realiza uma requisição para a API ViaCEP para obter os dados do endereço
    fetch('https://viacep.com.br/ws/' + cep + '/json/')
      .then(function(response) {
        // Verifica se a resposta da requisição foi bem-sucedida
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro na requisição. Status do erro: ' + response.status);
        }
      })
      .then(function(dados) {
        // Verifica se não houve erro no retorno da API e preenche os campos de input com os dados do endereço
        if (!dados.erro) { //se não for um erro, carrega os valores nos respectivos elementos 
          document.getElementById('rua').value = dados.logradouro;
          document.getElementById('bairro').value = dados.bairro;
          document.getElementById('cidade').value = dados.localidade;
          document.getElementById('uf').value = dados.uf;
          document.querySelector('.resposta-cep').textContent = '';
        } else { //caso não o cep não exista, retornara o texto no elemento de classe .resposta-cep
          document.getElementById('rua').value = '';
          document.getElementById('bairro').value = '';
          document.getElementById('cidade').value = '';
          document.getElementById('uf').value = '';
          document.querySelector('.resposta-cep').textContent = 'O CEP informado não existe.';
        }
      })
      .catch(function(error) { //caso ocorra um erro na requisição, captura e apresenta a mensagem de erro no elemento de classe .resposta-cep
        document.getElementById('rua').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('uf').value = '';
        document.querySelector('.resposta-cep').textContent = 'Erro na requisição: ' + error.message;
      });
  } else {
    // Limpa a resposta do CEP
    document.querySelector('.resposta-cep').textContent = '';
  }
}

// Aguarda o carregamento completo do documento HTML antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
  
  var cepInput = document.getElementById('cep');//var cepInput seleciona o elemento com id cep

  // executa a função no input quando o input CEP enquanto preenchido
  cepInput.addEventListener('input', function() {
    
    var cep = this.value; // var cep atribui o valor atual do CEP

    
    var cepFormatado = formatarCEP(cep); // armazena o valor do cep já formatado antes de atualizar no input

    // Atualiza o valor do campo de input do CEP com a versão formatada
    this.value = cepFormatado;
  });

  // buscar o endereço quando o campo de input do CEP perde o foco e insere nos campos correspondentes
  cepInput.addEventListener('blur', buscarEndereco);
});


//máscara cpf

function formatarCPF() {
  var input = document.getElementById("cpf");//var input seleciona o elemento com id cpf
  var cpf = input.value.replace(/\D/g, '');//substitui a formatação conforme a expreção abaixo, formatando o conteúdo exibido
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  input.value = cpf;
}

function formatarTEL() { //função para formatar o campo telefone
  var input = document.getElementById("tel"); // Seleciona o elemento com id "tel"
  var telefone = input.value.replace(/\D/g, ""); // Remove os caracteres não numéricos

  if (telefone.length === 11) { //se a quantidade de dígitos for === 11
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"); //formata com o retorno da expressão regular acima
  } else if (telefone.length === 10) { //senão, se a quantidade de digitos for === 10
    telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");//formata com o retorno da expressão regular acima
  }

  input.value = telefone; // formata o valor do campo de telefone
}










