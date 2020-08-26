/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'How many people from one team are on the court during play?',
      answers: [
        '4',
        '5',
        '6',
        '7'
      ],
      correctAnswer: '6'
    },
    {
      question: 'What are the last three steps a right-handed hitter should take for their approach before attacking a volleyball?',
      answers: [
        'Right-left-right',
        'Left-right-left',
        'Right-left-left',
        'Left-right-right'
      ],
      correctAnswer: 'Left-right-left'
    },
    {
      question: "About how tall is the regulation net for men's volleyball? (round to the nearest foot)",
      answers: [
        `7 feet`,
        `8 feet`,
        `9 feet`,
        `10 feet`
      ],
      correctAnswer: `8 feet`
    },
    {
      question: 'How many volleyball touches (not including blocks) does a team have to return the volleyball to the other team?',
      answers: [
        '1',
        '2',
        '3',
        '4'
      ],
      correctAnswer: '3'
    },
    {
      question: 'When is a ball not considered out?',
      answers: [
        'When the ball lands on the boundary lines',
        'When the ball touches the antenna',
        'When the ball lands outside the boundary lines',
        'When the ball touches any part of the net outside of the antennas'
      ],
      correctAnswer: 'When the ball lands on the boundary lines'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

function render() {
  //three different views: start (option to start quiz), the questions (store), and results
  //regenerates the view each time the store is updated.
  if (store.quizStarted === false) {
    displayStart();
  }
  else if (store.quizStarted === true && store.questionNumber >= store["questions"].length) {
    displayResults();
  }
  else {
    displayQuestions();
  }
}

function displayStart() {
  $('main').empty().append(
    `<div class="start">
      <p>This quiz will assess your knowledge of indoor volleyball rules and gameplay.</p>
      <br>
      <form>
        <button class="js-start-quiz">Start</button>
      </form>
    </div>`
  );
}

function startQuiz() {
  //This will start the quiz
  $('main').on('click', `.js-start-quiz`, function(event) {
    event.preventDefault();
    store.quizStarted = true;
    render();
  })
}

function showCorrect(answer) {
  $('input[name=answer]', 'form').attr('disabled', true);
  if (answer === store["questions"][store.questionNumber].correctAnswer) {
    $(`input[value="${answer}"]`, 'form').next('label').after(`
      <div class="correct">
        <p>That is the correct answer!</p>
      </div>`
    );
    store.score += 1;
  }
  else {
    $(`input[value="${answer}"]`, 'form').next('label').after (
      `<div class="incorrect">
        <p>Incorrect. The correct answer is ${store["questions"][store.questionNumber].correctAnswer}.</p>
      </div>`
    );
  }
}

function submitAnswer() {
  //Checks to see if answer is wrong or right. Should display correct answer then give the option to go to the next question.
  //If right, it should update the score count by 1.
  //Checks for right or wrong
  $('main').on('click', `.js-submit-answer`, function(event) {
    event.preventDefault();
    const userAnswer = $('input[name=answer]:checked', 'form').val();
    if (userAnswer) {
      showCorrect(userAnswer);
      $('button').replaceWith(
        `<button class="js-next-question">Next</button>`
      );
    }
  })
}

function nextQuestion() {
  $('main').on('click', `.js-next-question`, function(event) {
    event.preventDefault();
    store.questionNumber += 1;
    render();
  })
}

function displayQuestions() {
  //render questions
  const questionNumber = store.questionNumber + 1;
  const question = store["questions"][store.questionNumber].question;
  const answer = store["questions"][store.questionNumber].answers;
  $('main').empty().append (
    `<div class="score">
      <div class="item">
        <p>Question number: ${questionNumber}</div></p>
      <div class="item">
        <p>Score: ${store.score}/5</div></p>
    </div>
    
    <div class="questions">
      <div>
        <h2>${question}</h2>
      </div>
      <div>
        <form>
          <div>
            <input name="answer" type="radio" value="${answer[0]}">
            <label for="${answer[0]}">${answer[0]}</label>
          </div>
          <div>
            <input name="answer" type="radio" value="${answer[1]}">
            <label for="${answer[1]}">${answer[1]}</label>
          </div>
          <div>
            <input name="answer" type="radio" value="${answer[2]}">
            <label for="${answer[2]}">${answer[2]}</label>
          </div>
          <div>
            <input name="answer" type="radio" value="${answer[3]}">
            <label for="${answer[3]}">${answer[3]}</label>
          </div>
          <br>
          <button class="js-submit-answer">Submit</button>
        </form>
      </div>
    </div>`
  );
}

function displayResults() {
  //Displays the final results with the score with the option to play again
  //Should appear when the questionNumber is a certain number
  $('main').empty().append(
    `<div class="results">
      <p><b>Your Score: ${store.score}/5</b></p>
      <br>
      <form>
        <button class="js-restart-quiz">Restart Quiz</button>
      </form>
    </div>`
  );
}

function resetQuiz() {
  //Resets the score and re-render the quiz to be taken again
  $('main').on('click', `.js-restart-quiz`, function(event) {
    event.preventDefault();
    store.score = 0;
    store.questionNumber = 0;
    render();
  })
}

function handleEvents() {
  startQuiz();
  submitAnswer();
  nextQuestion();
  resetQuiz();
}

function handleQuiz() {
  render();
  handleEvents();
}

$(handleQuiz);

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)