const MyBtn = document.querySelector(".MyBtn button")
const RulesBox = document.querySelector(".RulesBox")
const Exitbutton = document.querySelector(".Buttons .ExitButton")
const continueButton = document.querySelector(".Buttons .ContinueButton")
const Questions = document.querySelector(".Questions")
const option_list = document.querySelector(".MyOptions")
const timeline = document.querySelector(".Questions header .TimeLine")
const timeCount = document.querySelector(".TimeCount .Seconds");
const ops = document.querySelector("#ops");

MyBtn.onclick=()=>{
    RulesBox.classList.add("activeInfo")
}

Exitbutton.onclick=()=>{
    RulesBox.classList.remove("activeInfo")
    
}

continueButton.onclick = ()=>{
    RulesBox.classList.remove("activeInfo")
    Questions.classList.add("activeInfo")
    
    showquestions(0)
    StarTimer(4)
    startTimerLine(0)
}

const nextBtn = document.querySelector(".NextBtn")
const result_box = document.querySelector(".result_box")
const restart_quiz = document.querySelector(".buttons .restart1")
const quit_quiz = document.querySelector(".buttons .quit")

quit_quiz.onclick = ()=>{
    window.location.reload();
}

restart_quiz.onclick = ()=>{
    
}

let que_count=0;
let counter;
let TimeValue = 15;
let counterline;
let widthvalue = 0;
let userscore= 0;


nextBtn.onclick=  ()=>{
    if(que_count < questions.length - 1){
        que_count ++
        showquestions(que_count)
        clearInterval(counter)
        StarTimer(TimeValue)
        nextBtn.style.display= "none"
        clearInterval(counterline)
        startTimerLine(TimeValue)
    }else{
        console.log("You have done the work")
        showResultBox()
    }
   

}


function showquestions(index){
    const que_text = document.querySelector(".text");
    const option_list = document.querySelector(".MyOptions")
    let option_tag = "<div class='Options' id='ops'>" + questions[index].options[0]+ "</div>" +
     "<div class='Options'>" + questions[index].options[1]+ "</div>" +
     "<div class='Options'>" + questions[index].options[2]+ "</div>" +
     "<div class='Options'>" + questions[index].options[3]+ "</div>" ;
    let que_tag = "<span>" + questions[index].numb +"." +questions[index].question+ "</span>";
    option_list.innerHTML = option_tag
    que_text.innerHTML = que_tag;
    const total_que =document.querySelector(".total_que")
    let total_queTag = '<p>' + questions[index].numb + ' of 5 </p>'
    total_que.innerHTML= total_queTag  ;

    const option = option_list.querySelectorAll(".Options");
    for(let i=0;i<option.length ; i++){
        option[i].setAttribute("onclick","optionSelected(this)")
    }
}

let tickIcon ='<div class="tick icon"> <i class="fas fa-check"></i></div>'
let crossIcon= '<div class="cross icon"> <i class="fas fa-times"></i></div>'


function optionSelected(answer){
    clearInterval(counter)
    clearInterval(counterline)
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
   let alloptions= option_list.children.length;
    if(userAns === correctAns){
        userscore += 1
        console.log(userscore)
        answer.classList.add("correct")
        console.log("correct")
        answer.insertAdjacentHTML("beforeend",tickIcon)
        
    }else{
        answer.classList.add("wrong")
        console.log("wrong")
        answer.insertAdjacentHTML("beforeend",crossIcon)
        for(let i = 0 ; i<alloptions; i++){
            if(option_list.children[i].textContent ===correctAns){
                option_list.children[i].setAttribute("class", "Options correct")
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon)

            }
        }
        }

        for(let i=0; i<alloptions; i++){
            option_list.children[i].classList.add("disabled")
        }

        nextBtn.style.display= "block"
    }


    function StarTimer(time) {
        counter = setInterval(timer, 1000);
    
        function timer() {
            timeCount.textContent = time;
            time--;
    
            if (time < 0) {
                clearInterval(counter);
                timeCount.textContent = "00";
                nextBtn.style.display = "block";
    
                const optionsss = option_list.querySelectorAll(".Options");
                optionsss.forEach((optionsssy) => {
                    optionsssy.classList.add("disabled");
    
                    const correctAns = questions[que_count].answer;
                    if (optionsssy.textContent === correctAns) {
                        optionsssy.classList.add("correct-bg");
                        optionsssy.insertAdjacentHTML("beforeend", tickIcon);
                    }
                });
            } else if (time < 10) {
                timeCount.innerHTML = "0" + time;
            }
        }
    }
    
function showResultBox() {
    RulesBox.classList.remove("activeInfo");
    Questions.classList.remove("activeInfo");
    result_box.classList.add("activeResult");
    let scoreText = document.querySelector(".score_text");
    let scoreTag = '<span>Carry On 👍 You got <p>' + userscore + '</p> Out of <p>' + questions.length + '</p> </span>';
    scoreText.innerHTML = scoreTag;
    if(userscore > 3){
        
        let scoreTag = '<span>Congratulations🎉✨!!! You got ' + userscore + '  Out of ' + questions.length + ' You are well educated </span>';
        scoreText.innerHTML = scoreTag;
    }else if(userscore >= 2){
        
        let scoreTag = '<span>You got ' + userscore + '  Out of ' + questions.length + ' Shame on you Thu Shamless</span>';
        scoreText.innerHTML = scoreTag;
    }else if(userscore ===0){
        
        let scoreTag = '<span>You got' + userscore + '  Out of ' + questions.length + ' You are not worthy of playing my game just Go away</span>';
        scoreText.innerHTML = scoreTag;
    }
    
}


function startTimerLine(time){
    counterline = setInterval(timer,50)
    function timer(){
        time += 1
        timeline.style.width = time+ "px"
        if(time >320){
            clearInterval(counterline);
        }
    }
}