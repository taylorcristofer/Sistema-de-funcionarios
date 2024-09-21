class Funcionario{
    constructor(nome, idade, cargo){
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    };

    seApresentar(){
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.cargo}.`;
    };

    trabalhar(){
        return `${this.nome} está trabalhando.`;
    };
};

class Gerente extends Funcionario{
    constructor(nome, idade, cargo, departamento){
        super(nome, idade, cargo);
        this.departamento = departamento;
    };

    gerenciar(){
        return `${this.nome} está gerenciando o departamento de ${this.departamento}.`;
    };
};

class Desenvolvedor extends Funcionario{
    constructor(nome, idade, cargo, linguagem){
        super(nome, idade, cargo);
        this.linguagem = linguagem;
    };

    programar(){
        return `${this.nome} está programando em ${this.linguagem}.`;
    };
};

function exibirErro(mensagem){
    const erroDiv = document.getElementById('erro');
    erroDiv.textContent = mensagem;
};

document.getElementById('funcionarioForm').addEventListener('submit', function(event) {
    event.preventDefault();

    try{
        const nome = document.getElementById('nome').value.trim();
        const idade = parseInt(document.getElementById('idade').value.trim());
        const cargo = document.getElementById('cargo').value.trim();
        const departamento = document.getElementById('departamento').value.trim();
        const linguagem = document.getElementById('linguagem').value.trim();

        if(!nome || isNaN(idade) || !cargo){
            throw new Error("Por favor, preencha todos os campos obrigatórios corretamente.");   
        };

        let funcionario;
        if(cargo.toLowerCase() === 'gerente'){
            if(!departamento) throw new Error("Departamento é obrigatório para gerentes");
            funcionario = new Gerente(nome, idade, cargo, departamento);
        } else if(cargo.toLowerCase() === 'desenvolvedor'){
            if(!linguagem) throw new Error("Linguagem é obrigatório para desenvolvedores.");
            funcionario =  new Desenvolvedor(nome, idade, cargo, linguagem);
        } else {
            throw new Error("Cargo inválido. Por favor, insira 'Gerente' ou 'Desenvolvedor'.");
        };

        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `<p>${funcionario.seApresentar()}</p>
        <p>${funcionario.trabalhar()}</p>
        <p>${cargo.toLowerCase() === 'gerente' ? funcionario.gerenciar() : funcionario.programar()}</p>`;

        document.getElementById('funcionarioForm').reset();
        document.getElementById('erro').textContent = '';

    } catch(error){
        exibirErro(error.message);
    };
});