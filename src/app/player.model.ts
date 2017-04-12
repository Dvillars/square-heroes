export class Player {
  public yDimension: number = 10;
  public xDimension: number = 10;
  public direction: string = "south";
  public xAttack = 0;
  public yAttack = 0;
  //EXPERIENCE & LEVEL
  public experience = 0;
  public level = 1;
  public skillPoints = 0;
  //STATS
  public strengthLvl = 10;
  public attackLvl = 40;
  public defenseLvl = 1;
  public health = 50;
  public damageModifier = (this.strengthLvl * 2);
  //GEAR
  public mainHand: UserItem = new UserItem("Nothing", "Nothing", [0], ["Nothing"]);
  public offHand: UserItem = new UserItem("Nothing", "Nothing", [0], ["Nothing"]);
  public headSlot: UserItem = new UserItem("Nothing", "Nothing", [0], ["Nothing"]);
  public chestSlot: UserItem = new UserItem("Nothing", "Nothing", [0], ["Nothing"]);
  public legSlot: UserItem = new UserItem("Nothing", "Nothing", [0], ["Nothing"]);

  public inventory: UserItem[] = [new UserItem("Bear Knuckles", "duoSet", [5], ["attack"]), new UserItem("Cap", "headSlot", [1], ["defense"]), new UserItem("Tabard", "chestSlot", [1], ["defense"]), new UserItem("Torn skirt", "legSlot", [1], ["defense"]), new UserItem("Health Potion", "UserItem", [30], ["health"]), new UserItem("God Sword", "twoHander", [5000], ["strength"]), new UserItem("Off Hand Scimitar", "offHand", [500, 300], ["attack", "strength"]), new UserItem("Main Hand Scimitar", "mainHand", [500, 300], ["attack", "strength"])];
  public healthPotions = 1;

  godMode(strength: number, attack: number, defense: number, health: number) {
    this.strengthLvl = strength;
    this.defenseLvl = defense;
    this.attackLvl = attack;
    this.health = health;
  }

  getXAttack() {
    if(this.direction === "west") {
      this.xAttack = -1 * this.xDimension;
    } else if(this.direction === "east") {
      this.xAttack = 1 * this.xDimension;
    } else {
      this.xAttack = 0;
    }
  }

  getYAttack() {
    if(this.direction === "south") {
      this.yAttack =  1 * this.yDimension;
    } else if(this.direction === "north") {
      this.yAttack =  -1 * this.yDimension;
    } else {
      this.yAttack = 0;
    }
  }
}

export class UserItem {


  constructor(public name: string, public type: string, public bonus: number[], public stat: string[]){  }
}
