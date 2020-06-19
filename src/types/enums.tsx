
export enum ScreenOptions {
    MAIN_MENU,
    SINGLE_PLAYER_MENU,
    CHARACTER_SELECT,
    GAME,
}

export enum PlayerOptionNames {
    KNIGHT = "knight",
    KOBOLD = "kobold",
    ORC = "orc"
}

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
    ENEMIES_KILLED = "killed",
}
export enum UnitAttributeNames {
    HEALTH = "health",
    SPEED = "speed",
    ARMOR = "armor",
    ATTACK = "attack",
    JUMP_HEIGHT = "jump_height",
    JUMP_COUNT = "jump_count",
    ATTACK_SPEED = "attack_speed",
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
