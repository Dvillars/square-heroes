import { Component, OnInit } from '@angular/core';
import { GameObject, Enemy } from './game-object.model';
import { Player } from './player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  keyState = {};
  title = 'Square Heroes';
  objectsArray = [];
  canvas = null;
  ctx = null;
  player = null;
  velocityVector: number[] = [0,0];
  playerXCoord = null;
  playerYCoord = null;
  //VARIABLES FOR DICE ROLLS, DAMAGE DONE
  dmgRoll = 0;
  atkRoll = 0;
  damageDone = 0;
  currentEnemy = null;
  hitBool: boolean;

  //ADD SKILL POINTS INTO SKILL FUNCTION
  addSkill(stat: string) {
    if(this.player.skillPoints > 0)
    {
      if(stat === "attack")
      {
        this.player.attackLvl += 1;
        this.player.skillPoints -= 1;
      }else if(stat === "strength")
      {
        this.player.strengthLvl += 1;
        this.player.skillPoints -= 1;
        this.player.damageModifier += 2;
      }else if(stat === "defense")
      {
        this.player.defenseLvl += 1;
        this.player.skillPoints -= 1;
      }
    }
  }

  useInventory(item: Item) {
    if(item.type === "consumable") {
      if(item.name === "Health Potion") {
        this.player.health += 30;
      }
    } else if(item.type === "headSlot") {
      this.player.headSlot = item;
    } else if(item.type === "chestSlot") {
      this.player.chestSlot = item;
    } else if(item.type === "legSlot") {
      this.player.legSlot = item;
    }

  }

  //////INITIALIZATION///////
  ngOnInit() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");

    window.addEventListener('keydown',(e) => {
        this.keyState[e.keyCode || e.which] = true;
    },true);
    window.addEventListener('keyup', (e) => {
        this.keyState[e.keyCode || e.which] = false;
    },true);

    this.player = new Player();
    this.playerXCoord = ((this.canvas.width / 2) - 5);
    this.playerYCoord = ((this.canvas.height / 2) - 5)
    this.generateWorld();
  }

  /////////WORLD GENERATION/////////
  generateWorld() {
    //Trees
    var numberOfTrees = Math.floor(Math.random() * (Math.floor(40) - Math.ceil(20)) + Math.ceil(20));
    for(var i = 0; i < numberOfTrees; i++) {
      this.objectsArray.push(new GameObject("tree"));
    }
    //Enemies
    var numberOfEnemies = Math.floor(Math.random() * (Math.floor(40) - Math.ceil(20)) + Math.ceil(20))

    for(var i = 0; i < numberOfEnemies; i++) {
      this.objectsArray.push(new Enemy("enemy"));
    }
    this.gameLoop();
  }

  //////////ATTACK//////////////
  attack() {
    console.log("Attack at direction " + this.player.direction)
    this.player.getXAttack();
    this.player.getYAttack();
    for(var i = 0; i < this.objectsArray.length; i++) {

      //COLLISION DETETION
      if( this.objectsArray[i].xCoord < (this.canvas.width / 2 - 5) + this.player.xAttack + this.player.xDimension && this.objectsArray[i].xCoord + this.objectsArray[i].xDimension > (this.canvas.width / 2 - 5) + this.player.xAttack && this.objectsArray[i].yCoord < (this.canvas.height / 2 - 5) + this.player.yAttack + this.player.yDimension && this.objectsArray[i].yDimension + this.objectsArray[i].yCoord > (this.canvas.height / 2 - 5) + this.player.yAttack) {
        //COLLISION FOUND
          if(this.objectsArray[i].type === "enemy") {
            this.currentEnemy = this.objectsArray[i];
            //ENEMY IS BEING ATTACKED
            //ATTACK AND DAMAGE ROLLS FOR COMBAT
            //ATTACK ROLL
            this.atkRoll = Math.floor(Math.random() * (Math.floor(100) - Math.ceil(1)) + Math.ceil(1));
            console.log(this.atkRoll + ' atk roll');
            if(this.atkRoll > (50 - this.player.attackLvl))
            {
              this.hitBool = true;
              //DAMAGE ROLL
              this.dmgRoll = Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0)) + Math.ceil(0));
              console.log(this.dmgRoll + ' dmg roll');
              if(this.dmgRoll != 0)
              {
                this.damageDone = this.dmgRoll + (this.player.strengthLvl * 2);
                console.log(this.damageDone + ' damage done');
                this.objectsArray[i].health -= this.damageDone;
                console.log(this.objectsArray[i].health + ' enemy health');
              }
            }
            else{
              this.hitBool = false;
            }
            if(this.objectsArray[i].health <= 0) {
              //EXPERIENCE DROP
              var expDrop = Math.floor(Math.random() * (Math.floor(10) - Math.ceil(5)) + Math.ceil(5));
              console.log(expDrop + ' experience drop');
              this.player.experience += expDrop;
              console.log(this.player.experience + ' player experience before level');
              //LEVEL UP
              //EVERY LEVEL, EXPERIENCE NEEDED TO LEVEL UP IS DOUBLED
              if(this.player.experience >= (this.player.level * 30))
              {
                //LEVEL GAIN
                this.player.level += 1;
                //SKILL POINT GAIN
                this.player.skillPoints += 2;
                console.log(this.player.level + ' player level');
                //RESET EXPERIENCE
                this.player.experience = 0;
                console.log(this.player.experience + ' player experience after level');
                console.log(this.player.skillPoints + ' player skill points');
              }
              this.objectsArray.splice(i, 1);
            }
          } else {
            //TREE IS BEING ATTACKED
            this.objectsArray.splice(i, 1);
          }
      }
    }
  }


  enemyAggro(enemy) {
    var aggroRadius = 100;
      if(enemy.xCoord < (this.canvas.width / 2 - (aggroRadius / 2)) + this.player.xDimension + aggroRadius && enemy.xCoord + enemy.xDimension > (this.canvas.width / 2 - (aggroRadius / 2)) && enemy.yCoord < (this.canvas.height / 2) - (aggroRadius / 2) + this.player.yDimension + aggroRadius && enemy.yDimension + enemy.yCoord > (this.canvas.height / 2) - (aggroRadius / 2)) {
        //MOVE TOWARDS PLAYER
        var vector: number[] = [0, 0];
        if(this.playerXCoord < enemy.xCoord) {
          vector[0] = -.5;
        } else {
          vector[0] = .5;
        }

        if(this.playerYCoord < enemy.yCoord) {
          vector[1] = -.5;
        } else {
          vector[1] = .5;
        }

        if(enemy.xCoord < (this.canvas.width / 2 - 10) + this.player.xDimension + 10 && enemy.xCoord + enemy.xDimension > (this.canvas.width / 2 - 10) && enemy.yCoord < (this.canvas.height / 2 - 10) + this.player.yDimension + 10 && enemy.yDimension + enemy.yCoord > (this.canvas.height / 2 - 10)) {
          //ENEMY IS IN ATTACK RANGE
          vector = [0, 0];
        }
          enemy.move(vector);
        }
    }

  //PLACE OBJECTS FROM ARRAY
  placeObject(gameObject: GameObject) {

    if(gameObject.type === "tree") {

      this.ctx.beginPath();
      this.ctx.moveTo(gameObject.xCoord, gameObject.yCoord + (gameObject.yDimension / 2));
      this.ctx.lineTo(gameObject.xCoord + 10, gameObject.yCoord + (gameObject.yDimension / 2));
      this.ctx.lineTo(gameObject.xCoord + 5, gameObject.yCoord + (gameObject.yDimension / 2) - 5);
      this.ctx.lineTo(gameObject.xCoord, gameObject.yCoord + (gameObject.yDimension / 2));
      this.ctx.fillStyle = "green"
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(gameObject.xCoord, gameObject.yCoord + 2);
      this.ctx.lineTo(gameObject.xCoord + 10, gameObject.yCoord + 2);
      this.ctx.lineTo(gameObject.xCoord + 5, gameObject.yCoord + 2 - 5);
      this.ctx.lineTo(gameObject.xCoord, gameObject.yCoord + 2);
      this.ctx.fillStyle = "green"
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(gameObject.xCoord, gameObject.yCoord + 5);
      this.ctx.lineTo(gameObject.xCoord + 10, gameObject.yCoord + 5);
      this.ctx.lineTo(gameObject.xCoord + 5, gameObject.yCoord);
      this.ctx.lineTo(gameObject.xCoord, gameObject.yCoord + 5);
      this.ctx.fillStyle = "green"
      this.ctx.fill();

    } else {
      this.ctx.beginPath();
      this.ctx.rect(Math.floor(gameObject.xCoord), Math.floor(gameObject.yCoord), Math.floor(gameObject.xDimension), Math.floor(gameObject.yDimension));
      this.ctx.fillStyle = "red";
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  gameLoop() {
    var current = this;
    var attacking: boolean = false;
    var gameTick = setInterval(function(){
      current.velocityVector = [0,0];
      ///////////CONTROLS////////////
      //UP
      if (current.keyState[38] || current.keyState[87]){
        current.velocityVector[1] += 1.5;
        current.player.direction = "north";
      }
      //DOWN
      if (current.keyState[40] || current.keyState[83]){
        current.velocityVector[1] += -1.5;
        current.player.direction = "south";

      }
      //LEFT
      if (current.keyState[37] || current.keyState[65]){
        current.velocityVector[0] += 1.5;
        current.player.direction = "west";

      }
      //RIGHT
      if (current.keyState[39] || current.keyState[68]){
        current.velocityVector[0] += -1.5;
        current.player.direction = "east";
      }
      //ATTACK
      if (current.keyState[32]){
        if(attacking === false) {
          current.attack();
          attacking = true;
          setTimeout(function(){
            attacking = false;
          }, 500);
        }
      }

      //MOVE GAME WORLD
      for(let gameObject of current.objectsArray) {
        gameObject.move(current.velocityVector);
        if(gameObject.type === "enemy") {
          current.enemyAggro(gameObject);
        }
      }
    current.ctx.clearRect(0, 0, current.canvas.width, current.canvas.height);

    for(let object of current.objectsArray){
      current.placeObject(object);
    }

    //Player attack animations(NEEDS REFACTOR)

    if(attacking && current.player.direction === "south") {
        current.ctx.beginPath();
        current.ctx.rect(((current.canvas.width / 2) - 5), ((current.canvas.height / 2) + 5), 3, 8);
        current.ctx.fillStyle = "blue";
        current.ctx.fill();
        current.ctx.closePath();
    }

    if(attacking && current.player.direction === "north") {
        current.ctx.beginPath();
        current.ctx.rect(((current.canvas.width / 2) + 2), ((current.canvas.height / 2) - 10), 3, 8);
        current.ctx.fillStyle = "blue";
        current.ctx.fill();
        current.ctx.closePath();
    }

    if(attacking && current.player.direction === "west") {
        current.ctx.beginPath();
        current.ctx.rect(((current.canvas.width / 2) - 10), ((current.canvas.height / 2) + 2), 8, 3);
        current.ctx.fillStyle = "blue";
        current.ctx.fill();
        current.ctx.closePath();
    }

    if(attacking && current.player.direction === "east") {
        current.ctx.beginPath();
        current.ctx.rect(((current.canvas.width / 2) + 5), ((current.canvas.height / 2) + 2), 8, 3);
        current.ctx.fillStyle = "blue";
        current.ctx.fill();
        current.ctx.closePath();
    }

    // Player rebuild
    current.ctx.beginPath();
    current.ctx.rect(((current.canvas.width / 2) - 5), ((current.canvas.height / 2) - 5), 10, 10);
    current.ctx.fillStyle = "blue";
    current.ctx.fill();
    current.ctx.closePath();
  }, 20);
  }
}
