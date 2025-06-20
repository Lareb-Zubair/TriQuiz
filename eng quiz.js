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
  q1: "Unwilling",
  q2: "Neither of them is ready.",
  q3: "Adverb",
  q4: "Begun",
  q5: "She said, 'I am tired.'",
  q6: "The project was completed by her.",
  q7: "Accommodate",
  q8: "Run",
  q9: "Have should be has",
  q10: "Better",
  q11: "If it rains, we will cancel the picnic.",
  q12: "To make people comfortable in a new situation",
  q13: "a",
  q14: "He said he was busy.",
  q15: "Conjunction"
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
