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
        'What president signed legislation to establish the first national park?', 
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
            'Glacer', 
            'Great Basin', 
            'Great Sand Dunes'
        ], 
        correctAnswer: 
        'Glacer Bay'
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

let questionNumber = 0;
let currentQuestion = STORE[questionNumber].question;
var qid = 0;
var score = 0;

//update question number
function updateQuesNum() {
    if (questionNumber < 10) {
        $('#qNum').text('<p>Current Question: '+ (qid + 1)+'</p>')
    }
}

//start quiz!
function startQuiz() {
    $('#start').on('click', function(event) {
        askQuestion();
        $('.container2').hide();
    });
};

//create HTML for question
function generateQ(qid) {
    var letQHtml = ` 
<div class="question"> 
    <h2>${STORE[qid].question}</h2> 
</div> 
<div class="answers">  
<input class="answers" type="radio"  value=${STORE[qid].answers[0]} >
${STORE[qid].answers[0]}
<input class="answers" type="radio"  value=${STORE[qid].answers[1]} >
${STORE[qid].answers[1]}
<input class="answers" type="radio"  value=${STORE[qid].answers[2]} >
${STORE[qid].answers[2]}
<input class="answers" type="radio"  value=${STORE[qid].answers[3]} >
${STORE[qid].answers[3]}
<br>
<button type="submit" id="subAns" onclick="saveResult()">Submit</button>
</div>
`;
    return letQHtml;
}; 

//present question
function askQuestion() {
    let htmlForQuestion = generateQ(qid);         
    $('#question').html(htmlForQuestion);
};

//user selects answer & correct/incorrect
function submitAnswer() {
    $('#subAns').on('click', function(event) {
        let selectedVal = $('input:checked');
        let answer = selectedVal.val();
        let correctAns = STORE[qid].correctAnswer;
        if (answer === correctAns) {
            correctAns();
        } else {
            incorrectAns();
        }
    });
};

function correctAns() {
    $('#answer').html(
        `<h3>Correct!</h3>
    <img src="thumbsup.jpeg" alt="hiker giving a thumbs up" class="images" width="200px">
      <button type="button" class="nextButton button">Next Quetion</button>`
    );
    updateScore();
}

function incorrectAns() {
    $('#answer').html(
        `<h3>Incorrect!</h3>
    <img src="sadHiker.jpeg" alt="sad hiker" width="200px">
    <p class="rightAns">The correct answer is:</p>
    <p class="rightAns">${STORE[qid].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
    );
};

function nextQuestion() {
    $('#answer').on('click', '.nextButton', function(event) {
        qid++;
        let newHTML = generateQ(qid);
        $('#question').html(newHTML);
    });
};

function restartQuiz() {

}

function launchQuiz() {
    startQuiz();
    submitAnswer();
    nextQuestion();
}

$(launchQuiz);

