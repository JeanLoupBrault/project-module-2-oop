// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time


class Entity {
    render(root, image, xPos, yPos) {
        console.log(image);
        this.domElement = document.createElement("img");
        this.domElement.src = `images/${image}.png`;
        this.domElement.src = `images/${image}.jpg`;
//        this.domElement.src = `sounds/${sound}.mp3`;
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${xPos}px`;
        this.domElement.style.top =` ${yPos}px`;
        this.domElement.style.zIndex = '10'; // player
        this.domElement.style.zIndex = '5';  // enemy
        root.appendChild(this.domElement);}
        
}

class Engine {
    // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
    // You need to provide the DOM node when you create an instance of the class
    constructor(theRoot) {
        // We need the DOM element every time we create a new enemy so we
        // store a reference to it in a property of the instance.
        this.root = theRoot;
        // We create our hamburger.
        // Please refer to Player.js for more information about what happens when you create a player
        this.player = new Player(this.root, 'starShip', this.x, this.y);
        console.log(this.x);
        console.log(this.y);
        // Initially, we have no enemies in the game. The enemies property refers to an array
        // that contains instances of the Enemy class
        this.enemies = [];
        // We add the background image to the game
        addBackground(this.root);
    }
    
    // The gameLoop will run every few milliseconds. It does several things
    //  - Updates the enemy positions
    //  - Detects a collision between the player and any enemy
    //  - Removes enemies that are too low from the enemies array
    
    gameLoop = () => {
        // This code is to see how much time, in milliseconds, has elapsed since the last
        // time this method was called.
        // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
        if (this.lastFrame === undefined) this.lastFrame = new Date().getTime();
        let timeDiff = new Date().getTime() - this.lastFrame;
        this.lastFrame = new Date().getTime();
        // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
        // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
        this.enemies.forEach(enemy => {
            enemy.update(timeDiff);
        });
        // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
        // We use filter to accomplish this.
        // Remember: this.enemies only contains instances of the Enemy class.
        this.enemies = this.enemies.filter(enemy => {
            return !enemy.destroyed;
        });
        // We need to perform the addition of enemies until we have enough enemies.
        while (this.enemies.length < MAX_ENEMIES) {
            // We find the next available spot and, using this spot, we create an enemy.
            // We add this enemy to the enemies array
            const spot = nextEnemySpot(this.enemies);
//            const bonusSpot = nextEnemySpot(this.enemies);
            this.enemies.push(new Enemy(this.root, spot, 'starTrooper', this.x, this.y));
        }
        // We check if the player is dead. If he is, we alert the user
        // and return from the method (Why is the return statement important?)
        
        if (this.isPlayerDead()) {
            window.alert("Game over");
//            this.root.style.backgroundImage = "images/game_over.png";

            console.log('Play Sad_Trombone');
                let audio = new Audio('sounds/Sad_Trombone.mp3');
                audio.loop = false;
                audio.play();   

            return;
            
        }
        // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
        setTimeout(this.gameLoop, 20);
    };
    // This method is not implemented correctly, which is why
    // the burger never dies. In your exercises you will fix this method.
    
    isPlayerDead = () => {
        
        let scoreCount = 0;
        let level = 0;
        let isDead = false;
        this.enemies.forEach(enemy => {
            
            if (
                this.player.x === enemy.x &&
                enemy.y + ENEMY_HEIGHT > 486 &&
                enemy.y < 460
                             
            ) {
                isDead = true;
                console.log("Player dead");
                
//                this.document.txt("Player is dead");
//                const addBackground = root => {
//                  const bg = document.createElement("img");
//                  bg.src = 'images/game_over.png';
//                  bg.style.height = `${GAME_HEIGHT}px`;
//                  bg.style.width = `${GAME_WIDTH}px`;
//                  root.append(bg);
//                }
//                document.querySelector("quit-game", quitTheGame(){ alert("QUIT game!"); });
//                document.getElementById("new-game", function(){ console.log("Start new game!"); });
//                document.addEventListener("onclick", function(){ console.log("Game over. See you soon!"); }); 
            }
            

//            let c = document.getElementById("myCanvas");
//            let ctx = c.getContext("2d");
//            let score = 0;

            });
            scoreCount++; 
//            function drawScore() {
//            ctx.font = "16px Arial";
//            ctx.fillStyle = "#0095DD";
//            ctx.fillText("Score: "+score, 8, 20);
//        }

        console.log(`Total score: ${scoreCount}`);
         
        
        return isDead;
              
    };
    
}
