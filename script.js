//variables and game constants
let inputDir={x:0 , y:0}
const foodSound= new Audio('food.mp3')
const gameOverSound= new Audio('gameover.mp3')
const moveSound=new Audio('move.mp3')
let speed=5
let score=0
let lastPaintTime=0
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7}

//game functions
function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime-lastPaintTime)/1000<1/speed){
        return
    }
    lastPaintTime = ctime
    gameEngine()
}
function isCollide(snake){
    //if bump into itself
    for(let i=1; i<snakeArr.length ; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true
        }
    }
    //goes outside grid
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
           return true 
        }
    }


function gameEngine(){
    //Updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play()
        inputDir={x:0,y:0}
        alert("Game Over!, Press any key to play again.")
        snakeArr=[{x:13,y:15}]
        score=0
    }

    //if snake ate food ,increment score and regenerate snake
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score+=1
        document.getElementById('score').innerHTML="Score: "+ score;
        foodSound.play()
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a=2
        let b=16
        food={x: Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random()) }
    }

    //moving the snake
    for(let i=snakeArr.length-2 ; i>=0 ; i--){
        snakeArr[i+1]={...snakeArr[i]}

    }
    snakeArr[0].x+=inputDir.x
    snakeArr[0].y+=inputDir.y

    //display snake
    board.innerHTML = ""
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div')
        snakeElement.style.gridRowStart=e.y
        snakeElement.style.gridColumnStart=e.x
        
        if(index==0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

     //display food
        foodElement=document.createElement('div')
        foodElement.style.gridRowStart=food.y
        foodElement.style.gridColumnStart=food.x
        foodElement.classList.add('food')
        board.appendChild(foodElement)

}
 
//logic 
window.requestAnimationFrame(main)
window.addEventListener('keydown',e =>{
    inputDir={x:0,y:1}// start game
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0
            inputDir.y=-1
            break;
        case "ArrowDown":
            inputDir.x=0
            inputDir.y=1
            break;
        case "ArrowLeft":
            inputDir.x=-1
            inputDir.y=0
            break;
        case "ArrowRight":
            inputDir.x=1
            inputDir.y=0
            break;
        default:
            break;
    }
})
