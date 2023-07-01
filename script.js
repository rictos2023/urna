// Dados dos candidatos
const candidates = [
  { name: "Candidato 1", img: "candidato1.jpg", votes: 0 },
  { name: "Candidato 2", img: "candidato2.jpg", votes: 0 },
  { name: "Candidato 3", img: "candidato3.jpg", votes: 0 }
];

// Função para registrar o voto
function vote(candidateIndex) {
  candidates[candidateIndex].votes++;
  showThankYouMessage();
}

// Função para exibir a mensagem de agradecimento e reiniciar a página após 3 segundos
function showThankYouMessage() {
  const messageElement = document.getElementById("thank-you-message");
  messageElement.style.display = "block";
  setTimeout(function() {
    location.reload();
  }, 3000);
}

// Função para exibir os resultados
function showResults() {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.style.display = "block";

  const voteCountsElement = document.getElementById("vote-counts");
  voteCountsElement.innerHTML = "";

  let totalVotes = 0;
  candidates.forEach(function(candidate) {
    totalVotes += candidate.votes;
  });

  candidates.forEach(function(candidate) {
    const percentage = (candidate.votes / totalVotes) * 100;
    const voteCountText = `${candidate.name}: ${candidate.votes} votos (${percentage.toFixed(2)}%)`;

    const candidateElement = document.createElement("div");
    candidateElement.textContent = voteCountText;

    if (candidate.votes === getMaxVotes()) {
      candidateElement.classList.add("winner");
    }

    voteCountsElement.appendChild(candidateElement);
  });

  drawChart();
}

// Função para obter o candidato com o maior número de votos
function getMaxVotes() {
  let maxVotes = 0;

  candidates.forEach(function(candidate) {
    if (candidate.votes > maxVotes) {
      maxVotes = candidate.votes;
    }
  });

  return maxVotes;
}

// Função para desenhar o gráfico
function drawChart() {
  const chartContainer = document.getElementById("chart-container");
  chartContainer.innerHTML = "";

  candidates.forEach(function(candidate) {
    const percentage = (candidate.votes / getMaxVotes()) * 100;

    const candidateBar = document.createElement("div");
    candidateBar.style.width = `${percentage}%`;
    candidateBar.style.height = "30px";
    candidateBar.style.backgroundColor = "green";
    candidateBar.style.marginBottom = "5px";

    chartContainer.appendChild(candidateBar);
  });
}

// Adiciona os eventos de voto para as imagens dos candidatos
const candidateImages = document.getElementsByClassName("candidate-img");

for (let i = 0; i < candidateImages.length; i++) {
  candidateImages[i].addEventListener("dblclick", function() {
    vote(i);
  });
}

// Adiciona o evento para exibir os resultados
const resultsButton = document.getElementById("results-button");
resultsButton.addEventListener("click", function() {
  showResults();
});
