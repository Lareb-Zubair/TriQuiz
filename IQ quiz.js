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
  q1: "36",
  q2: "5 minutes",
  q3: "Sarah",
  q4: "3 people total",
  q5: "40 and 10",
  q6: "J, J",
  q8: "Nowhere",
  q9: "55%",
  q10: "1",
  q11: "196",
  q12: "Egg",
  q13: "Short",
  q14: "All were married",
  q15: "Letter M"
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

    // Show all question sets
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
      scoreMessage.textContent = "Perfect score! You're IQ master!";
    } else if (score >= totalQuestions * 0.7) {
      scoreMessage.textContent = "Great job!";
    } else if (score >= totalQuestions * 0.4) {
      scoreMessage.textContent = "Not bad, but there's room for improvement.";
    } else {
      scoreMessage.textContent = "Keep learning and try again!";
    }
  });

  restartButton.addEventListener('click', () => {
    document.querySelectorAll('li').forEach(li => {
      li.classList.remove('selected', 'correct', 'incorrect');
    });

    form.reset();
    form.style.display = 'block';
    scoreContainer.classList.remove('show');
    scoreContainer.style.display = 'none';

    
    questionSets.forEach((set, i) => {
      set.style.display = i === 0 ? 'block' : 'none';
      set.classList.toggle('active', i === 0);
    });

    currentSet = 0;
    showSet(currentSet);

    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "0%";

    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
