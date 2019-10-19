//question database
const STORE = [
    {
        number: 1,
        question:
            'What national park reaches into three states?',
        answers: [
            'Great Smoky Mountains',
            'Yellowstone',
            'Grand Canyon',
            'Death Valley'
        ],
        correctAnswer:
            'Yellowstone'
    },
    {
        number: 2,
        question:
            'Which president signed legislation to establish the first national park?',
        answers: [
            'Franklin Roosevelt',
            'Woodrow Wilson',
            'Abraham Lincoln',
            'Ulysses S. Grant'
        ],
        correctAnswer:
            'Ulysses S. Grant'
    },
    {
        number: 3,
        question:
            'Which state has the most national parks?',
        answers: [
            'California',
            'Washington',
            'Arizona',
            'Wyoming'
        ],
        correctAnswer:
            'California'
    },
    {
        number: 4,
        question:
            'Which is NOT in California?',
        answers: [
            'Channel Islands National Park',
            'Joshua Tree National Park',
            'Isle Royale National Park',
            'Kings Canyon National Park'
        ],
        correctAnswer:
            'Isle Royale National Park'
    },
    {
        number: 5,
        question:
            'Which national park contains the highest mountain in North America?',
        answers: [
            'North Cascades National Park, Washington',
            'Mount Lassen Volcanic National Park, California',
            'Rocky Mountain National Park, Colorado',
            'Denali National Park, Alaska'
        ],
        correctAnswer:
            'Denali National Park, Alaska'
    },
    {
        number: 6,
        question:
            'What Western U.S. national park is a regular destination for large cruise ships?',
        answers: [
            'Glacier Bay',
            'Glacier',
            'Great Basin',
            'Great Sand Dunes'
        ],
        correctAnswer:
            'Glacier Bay'
    },
    {
        number: 7,
        question:
            'What was the first National Park in the U.S.?',
        answers: [
            'Yellowstone National Park',
            'Sequoia National Park',
            'Yosemite National Park',
            'Grand Canyon National Park'
        ],
        correctAnswer:
            'Yellowstone National Park'
    },
    {
        number: 8,
        question:
            'Which is the largest national park?',
        answers: [
            'Redwood National Park',
            'Great Smoky Mountains National Park',
            'Wrangell-St. Elias National Park and Preserve',
            'Yellowstone National Park'
        ],
        correctAnswer:
            'Wrangell-St. Elias National Park and Preserve'
    },
    {
        number: 9,
        question:
            'Where is the Everglades National Park located?',
        answers: [
            'Georgia',
            'California',
            'Florida',
            'Washington'
        ],
        correctAnswer:
            'Florida'
    },
    {
        number: 10,
        question:
            'Which national park has an average elevation of just six feet above sea level?',
        answers: [
            'Shenandoah National Park',
            'Death Valley National Park',
            'Everglades National Park',
            'Grand Canyon National Park'
        ],
        correctAnswer:
            'Death Valley National Park'
    }

];

var imagesArray = ['pic1.jpeg', 'pic2.jpeg', 'pic3.jpeg', 'pic4.jpeg', 'pic5.jpeg', 'pic6.jpeg', 'pic7.jpeg', 'pic8.jpeg', 'pic9.jpeg', 'pic10.jpeg'];

let questionNumber = 0;
let currentQuestion = STORE[questionNumber].question;
var qid = 0;
var score = 0;

//generate random image
function randomImage() {
    var num = Math.floor(Math.random() * (imagesArray.length+1));
    $('.randomPic').attr('src', `images/${imagesArray[num]}`);
};

//update question number
function updateQuesNum() {
    if (questionNumber < 10) {
        $('#qNum').html('<p>Current Question: ' + (qid + 1) + '/10</p>')
    }
}

//updates score
function updateScore() {
    score++;
    $('#score').html('<p>Score: ' + `${score}` + '/10</p>');
}

//display current score 
function currentScore() {
    $('#score').text(`Your score is: ${score}/10`);
}

//start quiz
function startQuiz() {
    $('#start').on('click', function (event) {
        event.preventDefault();
        randomImage();
        askQuestion();
        $('.container1').hide();
        $('.start-button').hide();
        updateQuesNum();
    });
};

//create HTML for question
function generateQ(qid) {
    var letQHtml = ` 
<h2>${STORE[qid].question}</h2>
<form class="answers"> 
<label> 
<input class="answers" type="radio" name="selection" value="${STORE[qid].answers[0]}" checked>
${STORE[qid].answers[0]}
</label>
<label> 
<input class="answers" type="radio" name="selection" value="${STORE[qid].answers[1]}" >
${STORE[qid].answers[1]}
</label>
<label> 
<input class="answers" type="radio" name="selection" value="${STORE[qid].answers[2]}" >
${STORE[qid].answers[2]}
</label>
<label id="bottom"> 
<input class="answers" type="radio" name="selection" value="${STORE[qid].answers[3]}" >
${STORE[qid].answers[3]}
</label>
<br>
<button type="submit" id="subAns">Submit</button>
</form>
`;
    return letQHtml;
};

//present question
function askQuestion() {
    let htmlForQuestion = generateQ(qid);
    $('#question').html(htmlForQuestion);
};

//user selects answer & correct/incorrect screen presents
function submitAnswer() {
    $('#question').on('click', '#subAns', function (event) {
        event.preventDefault();
        let selectedVal = $('input:checked');
        let answer = selectedVal.val();
        let correctSelect = STORE[qid].correctAnswer;
        if (answer === correctSelect) {
            $('#question').hide();
            $('#answer').show();
            correctAns();
        } else {
            $('#question').hide();
            $('#answer').show();
            incorrectAns();
        }
    });
};


//displays if user answers correctly
function correctAns() {
    $('.randomPic').hide();
    if (qid <= 8) {
        $('#answer').html(
            `<h2>You got it!</h2>
    <img class="prettyPic" src="images/thumbsup.jpeg" alt="hiker giving a thumbs up" class="images" width="200px">
    <section>
      <button type="button" class="nextButton button">Next Question</button>
    </section>`
        );
        updateScore();
    } else {
        $('#answer').html(
            `<h2>You got it!</h2>
    <img class="prettyPic" src="images/thumbsup.jpeg" alt="" class="images" name="canvas" width="200px">
    <section>
      <button type="button" class="restartQuiz">Retake Quiz</button>
    </section>`);
      currentScore();
    }
}

//displays if user answers incorrectly
function incorrectAns() {
    $('.randomPic').hide();
    if (qid <= 8) {
        $('#answer').html(
            `<h2>Oops, not quite...</h2>
    <img class="prettyPic" src="images/sadHiker.jpg" alt="Horseshoe Bend, AZ" width="200px">
    <p class="rightAns">The correct answer is:</p>
    <p class="rightAns">${STORE[qid].correctAnswer}</p>
    <section>
    <button type="button" class="nextButton">Next Question</button>
    </section>`
        );
        currentScore();
    } else {
        $('#answer').html(
            `<h2>Oops, not quite...</h2>
    <img class="prettyPic" src="images/sadHiker.jpg" alt="Horseshoe Bend, AZ" width="200px">
    <p class="rightAns">The correct answer is:</p>
    <p class="rightAns">${STORE[qid].correctAnswer}</p>
    <section>
    <button type="button" class="restartQuiz">Retake Quiz</button>
    </section>`
        );
        currentScore();
    }
};

//displays next question
function nextQuestion() {
    $('#answer').on('click', '.nextButton', function (event) {
        event.preventDefault();
        $('.randomPic').show();
        randomImage();
        qid++;
        let newHTML = generateQ(qid);
        $('#question').html(newHTML);
        $('#question').show();
        updateQuesNum();
        $('#answer').hide();
        
    });
};

//restartQuiz
function restartQuiz() {
    $('#answer').on('click', '.restartQuiz', function (event) {
        event.preventDefault();
        questionNumber = 0;
        currentQuestion = STORE[questionNumber].question;
        qid = 0;
        score = 0;
        let newHTML = generateQ(qid);
        $('#question').html(newHTML);
        $('#answer').hide();
        $('#question').show();
        updateQuesNum();
        updateScore();
        randomImage();
    });
}

function launchQuiz() {
    startQuiz();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

$(launchQuiz);