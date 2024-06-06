document.addEventListener("DOMContentLoaded", () => {
    const game = document.getElementById('game');
    const buttonPlay = document.getElementById('buttonPlay');
    let gameInterval;
    buttonPlay.addEventListener('click', startGame);
    function createGrid() {
        // Create 400 cells
        for (let i = 0; i < 400; i++) {
            const cell = document.createElement('div');
            cell.id = 'e' + i;
            cell.className = 'item';
            game.appendChild(cell);
        }
    }
    let cells;
    let snake;
    let direction;
    let score;
    let foodIndex;
    let timer
    function startGame() {
        game.innerHTML = '';
        createGrid();
        cells = document.querySelectorAll('.item');
        snake = [42, 41, 40]; // Initial position of the snake
        direction = 1; // Initially move right
        score = 0;
        foodIndex = 0;
        drawSnake();
        document.getElementById('score').innerHTML = score;
        placeFood();  
        let time = 0


        timer =  setInterval(() => {
            time = time + 1
            document.getElementById('time').innerHTML = time
            
        }, 1000);
        
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(moveSnake, 120);
    }
    function drawSnake() {
        snake.forEach(index => cells[index].classList.add('snake'));
    }
    function removeSnake() {
        snake.forEach(index => cells[index].classList.remove('snake'));
    }
    function moveSnake() {
        const head = snake[0];
        const tail = snake.pop();
        cells[tail].classList.remove('snake');
        const newHead = head + direction;
        // Check for collisions with walls or itself
        if (
            newHead < 0 ||
            newHead >= 400 ||
            (direction === 1 && newHead % 20 === 0) ||
            (direction === -1 && head % 20 === 0) ||
            cells[newHead].classList.contains('snake')
        ) {
            alert(`Game over! Your score is ${score}`);
            let username=localStorage.getItem("username")
            let user=localStorage.getItem(username)
            user=JSON.parse(user)
            let highScore=user.highScore;
            console.log(user)
            if(!highScore ||highScore < score ){
              
                user.highScore = score;
                user = JSON.stringify(user)
                localStorage.setItem(username,user)
                localStorage.getItem(username)
            }
           
            clearInterval(gameInterval);
            clearInterval(timer)
            document.getElementById('score').innerHTML = score
            return;
        }
        snake.unshift(newHead);
        cells[newHead].classList.add('snake');
        if (newHead === foodIndex) {
            score++;
            snake.push(tail); // Add the tail back to the snake
            cells[tail].classList.add('snake');
            placeFood();
            document.getElementById('score').innerHTML = score
        }
    }
    function placeFood() {
        do {
            foodIndex = Math.floor(Math.random() * 400);
        } while (cells[foodIndex].classList.contains('snake'));
        cells.forEach(cell => cell.classList.remove('food'));
        cells[foodIndex].classList.add('food');
    }
    function control(e) {
        console.log(e)
        if (e.keyCode === 39 && direction !== -1) {
            direction = 1; // Right arrow
        } else if (e.keyCode === 37 && direction !== 1) {
            direction = -1; // Left arrow
        } else if (e.keyCode === 38 && direction !== 20) {
            direction = -20; // Up arrow
        } else if (e.keyCode === 40 && direction !== -20) {
            direction = 20; // Down arrow
        }
    }
    
    document.addEventListener('keydown', control);

    document.getElementById('controlD').onclick = function(){
        control({keyCode:40})
    }
    document.getElementById('controlR').onclick = function(){
        control({keyCode:39})
    }
    document.getElementById('controlL').onclick = function(){
        control({keyCode:37})
    }
    document.getElementById('controlU').onclick = function(){
        control({keyCode:38})
    }
    createGrid();
});

function startGame() {
  
    const storedHighScore = localStorage.getItem('highScore');
    highScore = storedHighScore ? parseInt(storedHighScore) : 0; // Handle potential parsing errors
    document.getElementById('highScore').innerHTML = highScore; // Display high score
    
}

