function Pessoa(altura, peso) {
  if (!altura || !peso) {
    throw new Error("Altura e peso são obrigatórios");
  }

  this.altura = altura;
  this.peso = peso;
}

function Nutricionista(altura, peso) {
  Pessoa.call(this, altura, peso);
  this.imc = function () {
    return this.peso / (this.altura * this.altura);
  };

  this.classificaIMC = function () {
    var imc = this.imc();

    var magreza = document.getElementById("magreza");
    var normal = document.getElementById("normal");
    var sobrepeso = document.getElementById("sobrepeso");
    var obesidade = document.getElementById("obesidade");

    magreza.style.backgroundColor = "transparent";
    normal.style.backgroundColor = "transparent";
    sobrepeso.style.backgroundColor = "transparent";
    obesidade.style.backgroundColor = "transparent";

    if (imc < 18.5) {
      magreza.style.backgroundColor = "yellow";
      return "Abaixo do peso";
    }
    if (imc >= 18.5 && imc < 24.9) {
      normal.style.backgroundColor = "yellow";
      return "Peso normal";
    }
    if (imc >= 25 && imc < 29.9) {
      sobrepeso.style.backgroundColor = "yellow";
      return "Sobrepeso";
    }

    obesidade.style.backgroundColor = "yellow";
    return "Obesidade";
  };
}
Nutricionista.prototype = Object.create(Pessoa.prototype);
Nutricionista.prototype.constructor = Nutricionista;

function renderizaResultadoIMC(nutricionista) {
  document.getElementById("imc").innerText =
    nutricionista.imc().toFixed(2) + " - " + nutricionista.classificaIMC();
}

function actionCalcularIMCBuilder() {
  var alturaEl = document.getElementById("altura");
  var pesoEl = document.getElementById("peso");

  return function actionCalcularIMC(evt) {
    evt.preventDefault();

    var nutricionista = new Nutricionista(
      parseFloat(alturaEl.value),
      parseFloat(pesoEl.value)
    );
    console.log(Nutricionista.prototype.constructor);
    console.log(nutricionista instanceof Pessoa);

    renderizaResultadoIMC(nutricionista);
  };
}

window.onload = function () {
  document
    .getElementById("calcular")
    .addEventListener("click", actionCalcularIMCBuilder());
};
