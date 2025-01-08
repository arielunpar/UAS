const highScoreList = document.getElementById("highScoreList");

// mengambil high score dari local storage
const highScore = JSON.parse(localStorage.getItem("highScores")) || [];

// menampilkan high score
highScoreList.innerHTML = 
highScore.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");