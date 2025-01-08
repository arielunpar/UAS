const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

finalScore.innerText = mostRecentScore;

// agar tidak bisa di submit ketika username tidak ada isi
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

// akan diambil most recent score dari quiz (nilai quiz yang baru saja dimainkan)
function saveHighScore (e) {
    e.preventDefault();

    // akan disimpan username dan score dan dimasukkan ke high score
    const userScore = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(userScore);

    // sort dari paling besar terkecil
    highScores.sort((a, b) => b.score - a.score);

    // delete yang kelima (agar menyimpan hanya lima)
    highScores.splice(5); 

    // menyimpan high score baru pada local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('quizHome.html');
};