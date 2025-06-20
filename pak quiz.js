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

  // Option selection handler
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
  q1: "Ayub Khan", 
  q2: "To have a separate nation for Muslims", 
  q3: "Karachi", 
  q4: "Speech on Religious Freedom",
  q5: "Arabic-Persian script", 
  q6: "It’s written mostly in Persian words", 
  q7: "1973", 
  q8: "Skardu", 
  q9: "Dr. Abdul Qadeer Khan", 
  q10: "Benazir Bhutto", 
  q11: "It supports the agriculture of the entire country",
  q12: "A crescent and a star", 
  q13: "Hockey", 
  q14: "Larkana", 
  q15: "People of Pakistan" 
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

    // Show all question sets to display full feedback
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

    // 🎉 Confetti and Sound if score >= 10
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
      scoreMessage.textContent = "Perfect score! You're history master!";
    } else if (score >= totalQuestions * 0.7) {
      scoreMessage.textContent = "Great job! You know history very well.";
    } else if (score >= totalQuestions * 0.4) {
      scoreMessage.textContent = "Not bad, but there's room for improvement.";
    } else {
      scoreMessage.textContent = "Keep learning and try again!";
    }
  }); 


  // Restart quiz button
  restartButton.addEventListener('click', () => {
    document.querySelectorAll('li').forEach(li => {
      li.classList.remove('selected', 'correct', 'incorrect');
    });

    form.reset();
    form.style.display = 'block';
    scoreContainer.classList.remove('show');
    scoreContainer.style.display = 'none';

    // Only show first question set again
    questionSets.forEach((set, index) => {
      if (index === 0) {
        set.style.display = 'block';
        set.classList.add('active');
      } else {
        set.style.display = 'none';
        set.classList.remove('active');
      }
    });

    currentSet = 0;
    showSet(currentSet);

    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "0%";
  });
});
