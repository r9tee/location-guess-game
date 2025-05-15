
let current = 0;
let data = [];

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    showQuestion();
  });

function showQuestion() {
  const q = data[current];
  document.getElementById("location-image").src = q.partial;
  const choicesDiv = document.getElementById("choices");
  const resultDiv = document.getElementById("result");
  const nextBtn = document.getElementById("next-button");
  resultDiv.textContent = "";
  nextBtn.style.display = "none";
  choicesDiv.innerHTML = "";

  shuffle(q.choices).forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choice;
    btn.onclick = () => {
      if (choice === q.answer) {
        document.getElementById("location-image").src = q.full;
        resultDiv.textContent = "✅ Correct! " + q.answer;
      } else {
        resultDiv.textContent = "❌ Try again!";
        return;
      }
      nextBtn.style.display = "inline-block";
    };
    choicesDiv.appendChild(btn);
  });

  nextBtn.onclick = () => {
    current++;
    if (current < data.length) {
      showQuestion();
    } else {
      document.body.innerHTML = "<h1>🎉 You finished the game!</h1>";
    }
  };
}

function shuffle(arr) {
  return arr.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
}
