export enum ScreenOptions {
    MAIN_MENU,
    SINGLE_PLAYER_MENU,
    CHARACTER_SELECT,
    GAME,
}

export enum CharacterOptions {
    KNIGHT = "knight",
    KOBOLD = "kobold"
}

export enum ProjectileNames {
    ROCK = "rock",
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

export enum EnemyStateNames {
    WALKING = "walking",
    JUMPING = "jumping",
    FALLING = "falling",
    STANDING = "standing"
}

export enum PlayerStateNames {
    WALKING = "walking",
    JUMPING = "jumping",
    FALLING = "falling",
    STANDING = "standing",
    KNOCKBACK = "knockback"
}

export enum PlayerPartNames {
    HEAD = "head",
    BODY = "body",
    LEGS = "legs"
}

export enum PlayerArmorNames {
    DEFAULT = "default",
    ARMOR1 = "armor1"
}


export enum PlayerStatisticNames {
    PROJECTILES_FIRED = "projectiles",
    DAMAGE_DEALT = "damage",
    ENEMIES_KILLED = "killed",
}
