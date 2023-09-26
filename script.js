const quizData = [
    {
      question: 'What is jq primarily used for?',
      options: ['Parsing and reading XML data', 'Parsing and reading JSON data', 'Parsing and reading YAML data', 'Parsing and reading CSV data'],
      answer: 'Parsing and reading JSON data',
    },
    {
      question: ' In JavaScript, which method is used to parse a JSON string into a JavaScript object?',
      options: ['JSON.stringify()', 'JSON.parse()', 'JSON.decode()', 'JSON.toJS()'],
      answer: 'JSON.parse()',
    },
    {
      question: 'What is the purpose of the JSON.stringify() method in JavaScript?',
      options: ['To parse a JSON string into a JavaScript object.', 'To convert a JavaScript object or value into a JSON string.', 'To check if a key exists in a JSON object.', 'To access the value of a specific key in a JSON object.'],
      answer: 'To convert a JavaScript object or value into a JSON string.',
    },
    {
      question: 'What is the purpose of the jq filter expression select(condition)?',
      options: ['It selects all elements in the JSON data.', 'It filters elements based on a specified condition.', ' It converts elements to uppercase.', ' It calculates the average of elements.'],
      answer: 'It filters elements based on a specified condition.',
    },
    {
      question: ' What is the purpose of the jq filter expression .field when applied to JSON data?',
      options: [
        ' It extracts the value of the "field" key.',
        'It filters out the "field" key from the JSON data.',
        ' It calculates the sum of all values in the "field" key.',
        'It formats the "field" key as a string.',
      ],
      answer: 'It extracts the value of the "field" key.',
    },
    {
      question: 'What is the purpose of JSON parsing in programming?',
      options: [' To convert JSON data into a string.', 'To convert a string into JSON data.', 'To execute JavaScript code.', 'To format data for printing.'],
      answer: 'To convert a string into JSON data.',
    },
    {
      question: 'If a JSON string contains a syntax error, what will happen when you try to parse it using JSON.parse()?',
      options: [
        ' It will silently ignore the error and parse the string.',
        'It will throw an error.',
        ' It will return an empty object.',
        ' It will return undefined.',
      ],
      answer: 'It will throw an error.',
    },
    {
      question: 'What is JSON linting?',
      options: ['A process of converting JSON data to XML format.', 'A process of checking JSON data for errors and ensuring it conforms to the JSON syntax rules.', ' A process of optimizing JSON data for faster parsing.', 'A process of compressing JSON data.'],
      answer: 'A process of checking JSON data for errors and ensuring it conforms to the JSON syntax rules.',
    },
    {
      question: 'What is the primary purpose of JSON linting tools?',
      options: [
        'To convert JSON to XML.',
        ' To beautify JSON data.',
        'To minify JSON data.',
        ' To validate JSON data.',
      ],
      answer: 'To validate JSON data.',
    },
    {
      question: 'Which of the following issues can JSON linting detect?',
      options: [' Incorrect data types in JSON.', 'Missing commas between JSON objects.', ' Incorrectly formatted JSON keys.', 'All of the above.'],
      answer: 'All of the above.',
    },
    {
        question: 'What is a common online tool or service for JSON linting?',
        options: [
          'JSON Validator',
          '  JSON Formatter',
          ' JSON Beautifier',
          ' JSON Minifier',
        ],
        answer: 'JSON Validator.',
    },
    {
        question: ' What is the purpose of linting options or configurations in JSON linting tools?',
        options: [
          ' To convert JSON data to other formats.',
          '  To specify which JSON keys to validate.',
          ' To customize the linting rules and behavior.',
          ' To encrypt JSON data.',
        ],
        answer: 'To customize the linting rules and behavior.',
    },
    {
        question: 'Which of the following linting errors would JSON linting tools typically detect?',
        options: [
          'Logical errors in code.',
          '  Missing semicolons in JavaScript.',
          '  Incorrectly formatted JSON data.',
          '  Syntax errors in HTML.',
        ],
        answer: ' Incorrectly formatted JSON data..',
    },
    {
        question: 'JSON linting can be particularly helpful when dealing with JSON data received from:',
        options: [
          'Trusted sources.',
          '  Any source, as its not necessary to validate JSON.',
          '  Untrusted or external sources.',
          '  Only when dealing with XML data.',
        ],
        answer: '  Untrusted or external sources.',
    },
    {
        question: 'Which command-line tool can be used for JSON linting in a terminal or shell?',
        options: [
          'json-validate',
          '  json-lint',
          ' json-check',
          ' json-parser',
        ],
        answer: 'json-lint ',
    },
  ];

  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();