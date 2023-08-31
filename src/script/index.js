// import fetch from 'node-fetch';

// trae los elementos que vamos a modificar utilizando el DOM
const questionSection = document.querySelector('#question-conteinor');
const firstButton = document.querySelector('#firstButton');
const secondButton = document.querySelector('#secondButton');
const thirdButton = document.querySelector('#thirdButton');
const fourthButton = document.querySelector('#fourthButton');

//Creamos los textos de las opciones que modificaremos más adelante
const firstOption = document.createElement('p');
const secondOption = document.createElement('p');
const thirdOption = document.createElement('p');
const fourthOption = document.createElement('p');

// Se declaran las variables que utilizaremos a lo largo del programa 
//La url de la api
const API = 'https://opentdb.com/api.php?amount=10&type=multiple';
//Indica el número de la pregunta
let questionNumber = 0;
let correctAnswer = '';
//Almacena el arreglo de las opciones
let array = [];
//El puntaje
let score = 0;

//Funcion para traer la información de la api y transformarla a un archivo json
async function fetchData(urlAPI){
    const response = await fetch(urlAPI);
    const data = await response.json();
    return data;
};


//Traemos las preguntas de la api
async function getQuestions(urlAPI, number){
    try{
        const questions = await fetchData(urlAPI);
        return questions.results[number];
    }
    catch(error){
        console.error(error);
    }
};

//Imprime la pregunta

function printQuestion(section, list){
    const text = list.question;
    const element = document.createElement('p');
    element.innerText = text;
    section.appendChild(element);
};

//Imprime las opciones de las respuestas
function printOptions(list){

    array = [];

    array.push(list.correct_answer);
    correctAnswer = list.correct_answer;
    for(option of list.incorrect_answers){
        array.push(option);
    };

    array = array.sort( (a,b) => {return (Math.random()-0.5)})

    firstOption.innerText = array[0];
    secondOption.innerText = array[1];
    thirdOption.innerText = array[2];
    fourthOption.innerText = array[3];

    firstButton.appendChild(firstOption);
    secondButton.appendChild(secondOption);
    thirdButton.appendChild(thirdOption);
    fourthButton.appendChild(fourthOption);
}

//Las siguientes dos funciones eliminan el texto de las preguntas y respuestas

function removeQuestion(){
    questionSection.removeChild(questionSection.firstChild);
}

function removeOptions(){
    firstButton.removeChild(firstButton.firstChild);
    secondButton.removeChild(secondButton.firstChild);
    thirdButton.removeChild(thirdButton.firstChild);
    fourthButton.removeChild(fourthButton.firstChild);
}

//Imprime el puntaje obtenido

function printFinalScore(section){
    const finalScore = score;
    const element = document.createElement('p');
    element.innerText = `Your final score is ${finalScore}`;
    section.appendChild(element);
}


//Es la funcion que llama a las demás funciones y controla la cantidad de preguntas que se han mostrado
async function main(){
    if (questionNumber<10){
        const infoQuestion = await getQuestions(API, questionNumber);
        printQuestion(questionSection, infoQuestion);
        printOptions(infoQuestion);
    }
    else printFinalScore(questionSection);
}


/*-----------------------------------------------------------------------------------*/
//Son los listener de cada una de las opciones y valida si es la respuesta correcta
firstButton.addEventListener('click',()=>{
    if(array[0] == correctAnswer){
        score +=100;
        console.log(score)
    } 
    else{
        console.log(score)
    }
    questionNumber += 1; 
    removeQuestion();
    removeOptions()
    main();
})

secondButton.addEventListener('click',()=>{
    if(array[1] == correctAnswer) {
        score +=100;
        console.log(score)
    } 
    else{
        console.log(score)
    }
    questionNumber += 1; 
    removeQuestion();
    removeOptions()
    main();
});

thirdButton.addEventListener('click',()=>{
    if(array[2] == correctAnswer) {
        score +=100;
        console.log(score)
    } 
    else{
        console.log(score)
    }
    questionNumber += 1; 
    removeQuestion();
    removeOptions()
    main();
});

fourthButton.addEventListener('click',()=>{
    if(array[3] == correctAnswer) {
        score +=100;
        console.log(score)
    } 
    else{
        console.log(score)
    }
    questionNumber += 1; 
    removeQuestion();
    removeOptions()
    main();
});

main();