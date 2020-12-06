
export enum ScreenOptions {
    MAIN_MENU,
    CHARACTER_SELECT,
    GAME,
    STAGE_BUILDER
}

export enum PlayerOptionNames {
    KNIGHT = "knight",
    KOBOLD = "kobold",
    ORC = "orc"
}

export enum TabOptions {
    armor = "armor",
    spells = "spells",
    projectiles = "projectiles"
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
