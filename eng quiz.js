document.addEventListener('DOMContentLoaded', () => {
  const nextButton = document.getElementById('nextBtn');
  const prevButton = document.getElementById('prevBtn');
  const submitButton = document.getElementById('submitBtn');
  const questionSets = document.querySelectorAll('.question-set');
  const form = document.getElementById('quizForm');
  const scoreContainer = document.getElementById('score-container');
  const finalScore = document.getElementById('final-score');
  const totalQuestionsDisplay = document.getElementById('total-questions-display');
  const scoreMessage = document.getElementById('score-message');
  const restartButton = document.getElementById('restart-quiz');

  let currentSet = 0;
  const totalSets = questionSets.length;
  const totalQuestions = document.querySelectorAll('.question').length;
  totalQuestionsDisplay.textContent = totalQuestions;

  showSet(currentSet);

  function showSet(index) {
    questionSets.forEach((set, i) => {
      set.classList.toggle('active', i === index);
      set.style.display = i === index ? 'block' : 'none';
    });

    prevButton.style.display = index === 0 ? 'none' : 'inline-block';
    nextButton.style.display = index === totalSets - 1 ? 'none' : 'inline-block';
    submitButton.style.display = index === totalSets - 1 ? 'inline-block' : 'none';
  }

  nextButton.addEventListener('click', () => {
    if (currentSet < totalSets - 1) {
      currentSet++;
      showSet(currentSet);
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentSet > 0) {
      currentSet--;
      showSet(currentSet);
    }
  });

  // Handle option selection
  document.querySelectorAll('.question ul li').forEach(option => {
    option.addEventListener('click', function () {
      const siblings = this.parentElement.querySelectorAll('li');
      siblings.forEach(sib => sib.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let score = 0;

    const correctAnswers = {
      q1: "Plentiful",
      q2: "Receive",
      q3: "Mean",
      q4: "for",
      q5: "She doesn't like chocolate.",
      q6: "I had finished my homework before the game.",
      q7: "Timid",
      q8: "I saw him yesterday.",
      q9: "Barked",
      q10: "Enthusiastic",
      q11: "Quickly",
      q12: "on",
      q13: "And",
      q14: "She walks to school every day.",
      q15: "Children"
    };

    document.querySelectorAll('.question').forEach(question => {
      const qid = question.dataset.questionId;
      const selectedOption = question.querySelector('li.selected');
      if (selectedOption && selectedOption.dataset.option === correctAnswers[qid]) {
        score++;
        selectedOption.classList.add('correct');
      } else if (selectedOption) {
        selectedOption.classList.add('incorrect');
      }
    });

    // Show all sets for review
    questionSets.forEach(set => {
      set.style.display = 'block';
      set.classList.add('active');
    });

    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
    submitButton.style.display = 'none';

    finalScore.textContent = score;
    scoreContainer.style.display = 'block';
    scoreContainer.classList.add('show');
    finalScore.classList.add('bouncing');
    if (score >= 10) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }

    setTimeout(() => {
      finalScore.classList.remove('bouncing');
    }, 1000);

    const percentage = (score / totalQuestions) * 100;
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = percentage + "%";

    if (score === totalQuestions) {
      scoreMessage.textContent = "Perfect score! You're genius!";
    } else if (score >= totalQuestions * 0.7) {
      scoreMessage.textContent = "Great job! You know English grammar well.";
    } else if (score >= totalQuestions * 0.4) {
      scoreMessage.textContent = "Not bad, but there's room for improvement.";
    } else {
      scoreMessage.textContent = "Keep learning and try again!";
    }
  });

  restartButton.addEventListener('click', () => {
    // Remove selected, correct, incorrect styles
    document.querySelectorAll('li').forEach(li => {
      li.classList.remove('selected', 'correct', 'incorrect');
    });

    form.reset();
    form.style.display = 'block';
    scoreContainer.classList.remove('show');
    scoreContainer.style.display = 'none';

    // Show only the first set again
    currentSet = 0;
    showSet(currentSet);

    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "0%";

    // Optional: scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
