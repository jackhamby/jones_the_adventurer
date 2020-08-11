// import { CharacterSelectWrapper } from "../areas/player_select/player_select_wrapper";
import { Knight } from "../classes/players/knight";
import { Orc } from "../classes/players/orc";
import { Kobold } from "../classes/players/kobold";

export enum ScreenOptions {
    MAIN_MENU,
    CHARACTER_SELECT,
    GAME,
}

export enum PlayerOptionNames {
    KNIGHT = "knight",
    KOBOLD = "kobold",
    ORC = "orc"
}

// export class PlayerOptions {
//     static KNIGHT = typeof Knight;
//     static ORC = typeof Orc;
//     static KOBOLD = typeof Kobold;
// }

// export enum PlayerOptionNames {
//     // KNIGHT = typeof CharacterSelectWrapper,
//     // KOBOLD = "kobold",
//     // ORC = "orc"
// }

export enum Attributes {
    HEALTH = "health",
    SPEED = "speed",
}

export enum ProjectileStateNames {
    FLYING = "flying",
    FALLING = "falling",
    STANDING = "standing",
    ROLLING = "rolling"
}

export enum UnitStateNames {
    WALKING = "walking",
    JUMPING = "jumping",
    FALLING = "falling",
    STANDING = "standing",
    KNOCKBACK = "knockback",
    DEAD = "dead",

    // Enemy specific
    PATROLLING = 'patrolling',
    ATTACKING = 'attacking'
}

export enum UnitPartNames {
    HEAD = "head",
    BODY = "body",
    LEGS = "legs"
}

export enum UnitArmorNames {
    DEFAULT = "default",
    ARMOR1 = "armor1",
    ARMOR2 = "armor2",
    ARMOR3 = "armor3",
}

export enum UnitStatisticNames {
    PROJECTILES_FIRED = "projectiles",
    DAMAGE_DEALT = "damage",
    ENEMIES_KILLED = "enemies",
}
export enum UnitAttributeNames {
    health = "HEALTH",
    speed = "SPEED",
    armor = "ARMOR",
    attack = "ATTACK",
    jump_height = "JUMP_HEIGHT",
    jump_count = "JUMP_COUNT",
    attack_speed = "ATTACK_SPEED",
}

export enum ProjectileNames {
    ROCK = 'rock',
}

export enum ProjectileAttributeNames {
    DAMAGE = "damage",
    SPEED = "speed",
}

export enum Directions {
    UP = 'up',
    DOWN = 'down',
    RIGHT = 'right',
    LEFT = 'left'
}
