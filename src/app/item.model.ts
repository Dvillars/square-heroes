export class UserItem extends GameObject {
  public name: string;
  public category: string;

  public static EQUIPMENT = [
    // Potions
    new UserItem('consumable', 'Health Potion', [['health', 30]], [], null, '#ff3f3f', 'highArray', 'A health potion');
    new UserItem('consumable', 'Attack Potion', [['attack', 5]], [], null, '#ff3f3f', 'highArray', 'An attack potion');
    new UserItem('consumable', 'Strength Potion', [['strength', 5]], [], null, '#ff3f3f', 'highArray', 'A strength potion');
    new UserItem('consumable', 'Defense Potion', [['defense', 5]], [], null, '#ff3f3f', 'highArray', 'A defense potion');
    // Low Drops
    new UserItem('armor', 'Iron Helm', [['defense', 20]], ['headSlot'], {trait: 'defense', level: 20}, '#cecece', 'lowGear', 'Defense level needs to be atleast 10 to wear this, noob');
    new UserItem('armor', 'Iron Chestplate', [['defense', 20]], ['chestSlot'], {trait: 'defense', level: 20}, '#cecece', 'lowGear', 'Defense level needs to be atleast 10 to wear this, noob');
    new UserItem('armor', 'Iron Greaves', [['defense', 20]], ['legSlot'], {trait: 'defense', level: 20}, '#cecece', 'lowGear', 'Defense level needs to be atleast 10 to wear this, noob');
    new UserItem('weapon', 'Sword', [['strength', 20], ['attack', 20]], ['mainHand'], null, '#cecece', 'lowGear', 'Even noobs can use this item');
    new UserItem('armor', 'Shield', [['defense', 30]], ['offHand'], null, '#cecece', 'lowGear', 'Even noobs can use this item');
    new UserItem('weapon', 'Claymore', [['strength', 40]], ['mainHand', 'offHand'], {trait: 'strength', level: 20}, '#cecece', 'lowGear', 'You strength expertise must be 20 or greater to wield these, braveheart');
    // Med Drops
    new UserItem('armor', 'Mithril Helm', [['defense', 40]], ['headSlot'], {trait: 'defense', level: 20}, '#cecece', 'medGear', 'Defense level needs to be atleast 20 to wear this, scrub');
    new UserItem('armor', 'Mithril Chestplate', [['defense', 40]], ['chestSlot'], {trait: 'defense', level: 20}, '#cecece', 'medGear', 'Defense level needs to be atleast 20 to wear this, scrub');
    new UserItem('armor', 'Mithril Greaves', [['defense', 40]], ['legSlot'], {trait: 'defense', level: 20}, '#cecece', 'medGear', 'Defense level needs to be atleast 20 to wear this, scrub');
    new UserItem('weapon', 'Katana', [['attack', 10], ['strength', 120]], ['mainHand', 'offHand'], {trait: 'attack', level: 60}, '#7ca0f9', 'medGear', 'You think you can wield the Katana, young one, try again when your attack level is 60');
    new UserItem('weapon', 'Nunchucks', [['attack', 50], ['strength', 50]], ['mainHand', 'offHand'], {trait: 'attack', level: 35}, '#7ca0f9', 'medGear', 'You attack expertise must be 35 or greater to wield these, kneenja');
    new UserItem('weapon', 'Main Hand Scimitar', [['strength', 65]], ['mainHand'], {trait: 'attack', level: 20}, '#7ca0f9', 'medGear', 'You need atleast 20 attack to equip this weapon, scrub');
    new UserItem('weapon', 'Off Hand Scimitar', [['attack', 60]], ['offHand'], {trait: 'attack', level: 20}, '#7ca0f9', 'medGear', 'You need atleast 20 attack to equip this weapon, scrub');
    // High Drops
    new UserItem('armor', 'Robin Hood Hat', [['attack', 150]], ['headSlot'], {trait: 'defense', level: 60}, 'green', 'rareGear', 'Defense level needs to be atleast 60 to wear this, pleeb');
    new UserItem('armor', 'Gladiator Chestplate', [['strength', 150]], ['chestSlot'], {trait: 'defense', level: 100}, '#d575ef', 'rareGear', 'Defense level needs to be atleast 100 to wear this, pleeb');
    new UserItem('weapon', 'Main Hand Kitten Bomb', [['strength', 120], ['attack', 80]], ['mainHand'], {trait: 'attack', level: 60}, '#d575ef', 'rareGear', 'You need at least 60 attack to throw the kitties');
    // Epic Drops
    new UserItem('armor', 'Chad\'s Legs(ULTIMA)', [['attack', 300], ['defense', -100]], ['legSlot'], {trait: 'defense', level: 100}, '#d575ef', 'epicGear', 'Defense level needs to be atleast 100 to wear these bad boys, pleeb');
    new UserItem('weapon', 'Blue Light Saber', [['attack', 200], ['strength', 200]], ['mainHand'], {trait: 'attack', level: 100}, 'blue', 'epicGear', 'You aren\'t strong enough with the force yet, 100 attack level to wield this weapon, you must have, Skywalker');
    new UserItem('weapon', 'Green Light Saber', [['attack', 200], ['strength', 200]], ['offHand'], {trait: 'attack', level: 100}, 'green', 'epicGear', 'You aren\'t strong enough with the force yet, 100 attack level to wield this weapon, you must have, Skywalker');
    new UserItem('weapon', 'Illidan\'s Warglaive', [['attack', 100], ['strength', 400]], ['offHand', 'mainHand'], {trait: 'attack', level: 100}, '#ed8055', 'epicGear', 'Come back when your attack level is at least 100 you stupid demon hunter');
    new UserItem('armor', 'Armour Forged From Sam\'s Crocks', [['defense', 450], ['strength', -100]], ['chestSlot'], null, '#4d843e', 'epicGear', 'These are comfortable and practical');
    new UserItem('armor', 'Minhish Cap(ULTIMA)', [['defense', 100], ['attack', 200]], ['headSlot'], null, '#ed8055', 'epicGear', 'This hat makes you deadly with code');
    new UserItem('armor', 'Derek\'s Spinner', [['strength', 300]], ['mainHand'], null, '#ed8055', 'epicGear', 'It\'s outta control');
    new UserItem('armor', 'Shield of Law-rence', [['defense', 300]], ['offHand'], null, '#ed8055', 'epicGear', 'You are an impenetrable wall of the law');
    // Grave Gear
    new UserItem('weapon', 'Tombstone', [['strength', 200], ['attack', -40]], ['mainHand', 'offHand'], null, '#d575ef', 'graveGear', 'BAM');
    new UserItem('armor', 'Pumpkin Head', [['defense', 70], ['attack', -10]], ['headSlot'], null, '#d575ef', 'graveGear', 'You look like a foo, but it\'s hard to hit you');
    new UserItem('armor', 'Rickety Ribcage', [['defense', 55]], ['chestSlot'], null, '#d575ef', 'graveGear', 'There might still be goop in there');
    new UserItem('weapon', 'Main Hand Bone Dagger', [['strength', 75]], ['mainHand'], null, '#d575ef', 'graveGear', 'Pretty Humourous');
    new UserItem('weapon', 'Off Hand Bone Dagger', [['attack', 75]], ['offHand'], null, '#d575ef', 'graveGear', 'Pretty Humourous');
    // North Gear
    new UserItem('armor', 'Ushanka-hat', [['defense', 120], ['attack', 50]], ['headSlot'], null, 'white', 'northGear', 'It has ear flaps!');
    new UserItem('armor', 'Grizzley Fur Coat', [['defense', 30], ['strength', 150]], ['chestSlot'], null, 'white', 'northGear', 'It has ear flaps!');
    new UserItem('weapon', 'Ice Picks', [['attack', 60], ['strength', 60]], ['offHand', 'mainHand'], null, 'white', 'northGear', 'You could probable climb a mountain');
    new UserItem('weapon', 'LongClaw', [['strength', 200]], ['mainHand'], null, 'white', 'northGear', 'Winter is here');
    // Swamp Gear
    new UserItem('armor', 'Tribal Shield', [['defense', 100]], ['offHand'], null, '#4d843e', 'swampGear', 'It\'s totally authentic');
    new UserItem('weapon', 'Double Hatchets', [['strength', 100], ['attack', -20]], ['mainHand', 'offHand'], null, '#4d843e', 'swampGear', 'It\'s totally authentic');
    new UserItem('weapon', 'Voodoo Machete', [['strength', 100]], ['mainHand'], null, '#4d843e', 'swampGear', 'It\'s totally authentic');
    new UserItem('armor', 'Hex Greaves', [['defense', 70]], ['legSlot'], null, '#4d843e', 'swampGear', 'It\'s totally authentic');
    new UserItem('armor', 'Shrunken Head', [['defense', 80]], ['headSlot'], null, '#4d843e', 'swampGear', 'Grooooooss');
  ]

  constructor(public type: string, public name: string, public modifier, public equipPosition: string[], public requirements, public color: string, public lootTable: string, public alert: string) {
    // alert: the message that appears when you cannot equip the Item
    // modifier: an array of arrays[[health, 0], [strength, 0], [attack, 0], [defense, 0]]
    // equipPosition: array of strings to see where to equip the item: equipPosition ['mainHand', 'offHand']}
    // requirements: array of objects to say what the requirements are: requirements = {trait: 'strength', level: 30}
    // color: the color of the item
    // loot table
  super(type);
  this.collidable = false;
  }
}
