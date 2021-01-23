import { Buff } from "../buffs/buff";
import { Enemy } from "../enemies/enemy";
import { Player } from "../players/player";
import { Projectile } from "../projectiles/projectile";
import { Sprite } from "../sprite";
import { Stage } from "./stage";
import { Treasure } from "../treasures/treasure";
import { Unit } from "../unit";
import { ProjectileStateNames, UnitStateNames } from "../../types/enums";

export class CollisionHelper {
    stage: Stage;

    constructor(stage){
        this.stage = stage;
    };

    // ================================== Player collisions ===========================================================
    // ================================================================================================================
    checkPlayerXCollisions() {
        if(this.stage.player.state === UnitStateNames.DEAD){
            return;
        }
        const collidePlatform = this.collideAny(this.stage.player, this.stage.platforms);
        const collideTreasures = this.collideAny(this.stage.player, this.stage.treasures);
        const collideEnemies = this.collideAny(this.stage.player, this.stage.enemies);

        if (collideEnemies){
            this.handlePlayerEnemyCollisionX(this.stage.player, collideEnemies);
        }
         
        if (collideTreasures){
            this.handlePlayerTreasureCollisionX(this.stage.player, collideTreasures);
        }
        if (collidePlatform){
            this.handlePlayerPlatformCollisionX(this.stage.player, collidePlatform);
        }
    }

    checkPlayerYCollisions(){
        if(this.stage.player.state === UnitStateNames.DEAD){
            return;
        }
        const collidePlatform = this.collideAny(this.stage.player, this.stage.platforms); 
        const collideTreasures = this.collideAny(this.stage.player, this.stage.treasures);
        const collideEnemies = this.collideAny(this.stage.player, this.stage.enemies);

        if (collideEnemies){
            this.handlePlayerEnemyCollisionY(this.stage.player, collideEnemies);
        }

        if (collidePlatform){
            this.handlePlayerPlatformCollisionY(this.stage.player, collidePlatform);
        }

        if (collideTreasures){
            this.handlePlayerTreasureCollisionY(this.stage.player, collideTreasures);
        }

        if (this.isFalling(this.stage.player)){
            this.stage.player.setState(UnitStateNames.FALLING);
        }
        else if (this.stage.player.state === UnitStateNames.FALLING){
            this.stage.player.setState(UnitStateNames.STANDING);
        }
    }

    handlePlayerTreasureCollisionX(player: Player, treasure: Treasure){
        player.pickupTreasure(treasure);
        treasure.remove();
    }

    handlePlayerTreasureCollisionY(player: Player, treasure: Treasure){
        player.pickupTreasure(treasure);
        treasure.remove();
    }

    handlePlayerEnemyCollisionX(player: Unit, collider: Enemy){
        if (collider.state === UnitStateNames.DEAD){
            return;
        }
        player.yVelocity = -3;
        // Set knockback right
        if (collider.xVelocity > 0){
            player.xVelocity = 3;
        }
        // Set kockback left
        if (collider.xVelocity < 0){
            player.xVelocity = -3;
        }
        collider.dealDamage(player, collider.projectile);
        player.inKnockBack =  true;
    }

    handlePlayerEnemyCollisionY(player: Unit, collider: Enemy){
        // TODO
    }


    handlePlayerPlatformCollisionY(player: Unit, collider: Sprite){
        if (player.yVelocity > 0){
            player.setY(collider.top() - player.height);
        }
        else if(player.yVelocity < 0){
            player.setY(collider.bottom());
        }
        player.yVelocity = 0;
    }

    handlePlayerPlatformCollisionX(player: Unit, collider: Sprite){
        if (player.xVelocity > 0){
            player.setX(collider.left() - player.width);
        }
        else if (player.xVelocity < 0){
            player.setX(collider.right());
        }
        player.xVelocity = 0;
    }

    // ================================== Enemy collisions ===========================================================
    // ===============================================================================================================
    checkEnemyXCollisions(enemy: Enemy){
        const collidePlatform = this.collideAny(enemy, this.stage.platforms);

        if (collidePlatform){
            this.handleEnemyPlatformCollisionX(enemy, collidePlatform);
        }
    }

    checkEnemyYCollisions(enemy: Enemy){
        const collidePlatform = this.collideAny(enemy, this.stage.platforms); 

        if (collidePlatform){
            this.handleEnemyPlatformCollisionY(enemy, collidePlatform);
        }

        if (this.isFallingEnemy(enemy)){
            enemy.setState(UnitStateNames.FALLING);
        }
        else if (enemy.state == UnitStateNames.FALLING){
            enemy.setState(UnitStateNames.WALKING);
        }
    }

    handleEnemyPlatformCollisionY(enemy: Enemy, collider: Sprite){
        // Set at the top
        if (enemy.yVelocity > 0){
            
            enemy.setY(collider.top() - enemy.height);
        }
        else if(enemy.yVelocity < 0){
            enemy.setY(collider.bottom());
        }
        enemy.yVelocity = 0;
    }

    handleEnemyPlatformCollisionX(enemy: Enemy, collider: Sprite){
        if (enemy.xVelocity > 0){
            enemy.setX(collider.left() - enemy.width);
        }
        else if (enemy.xVelocity < 0){
            enemy.setX(collider.right());
        }

        if (enemy.state === UnitStateNames.PATROLLING){
            enemy.xVelocity *= -1;

        } else {
            enemy.xVelocity = 0;
        }
    }

    // ================================== Projectile collisions ===========================================================
    // ====================================================================================================================
    checkProjectileXCollisions(projectile: Projectile){
        const collidePlatform = this.collideAny(projectile, this.stage.platforms);
        const collideEnemy = this.collideAny(projectile, this.stage.enemies);
        const collidePlayer = this.collide(projectile, this.stage.player);

        if (collidePlatform){
            this.handleProjectilePlatformCollisionX(projectile, collidePlatform);
        }
        if (collideEnemy){
            this.handleProjectileEnemyCollisionX(projectile, collideEnemy)
        }
        if (collidePlayer){
            this.handleProjectilePlayerCollisionX(projectile, this.stage.player);
        }

        else if(projectile.state === ProjectileStateNames.FALLING){
            projectile.setState(ProjectileStateNames.ROLLING)
        }
    }

    checkProjectileYCollisions(projectile: Projectile){
        const collidePlatform = this.collideAny(projectile, this.stage.platforms);
        const collideEnemy = this.collideAny(projectile, this.stage.enemies);
        const collidePlayer = this.collide(projectile, this.stage.player);

        if (collidePlatform){
            this.handleProjectilePlatformCollisionY(projectile, collidePlatform);
        }
        if (collideEnemy){
            this.handleProjectileEnemyCollisionY(projectile, collideEnemy);
        }
        if (collidePlayer){
            this.handleProjectilePlayerCollisionY(projectile, this.stage.player);
        }

        if (projectile.state !== ProjectileStateNames.STANDING && this.isFallingProjectile(projectile) ) {
            projectile.setState(ProjectileStateNames.FALLING);
        }
        else if(projectile.state === ProjectileStateNames.FALLING){
            projectile.setState(ProjectileStateNames.ROLLING)
        }
    }

    handleProjectilePlatformCollisionY(projectile: Projectile, collider: Sprite){
        if (projectile.destroyOnContact){
            projectile.remove();
            return
        }
        if (projectile.yVelocity > 0){
            projectile.setY(collider.top() - projectile.height);
        }

        else if (projectile.yVelocity < 0){
            projectile.setY(collider.bottom());
        }

        if (projectile.sticky){
            projectile.setState(ProjectileStateNames.STANDING);
        }
        projectile.yVelocity = 0;
    }

    handleProjectilePlatformCollisionX(projectile: Projectile, collider: Sprite){
        if (projectile.destroyOnContact){
            projectile.remove();
            return
        }

        if (projectile.xVelocity < 0){
            projectile.setX(collider.right());
        }

        if (projectile.xVelocity > 0){
            projectile.setX(collider.left() - projectile.width)
        }

        if (projectile.sticky){
            projectile.setState(ProjectileStateNames.STANDING);
        }
        if (projectile.xVelocity < 0){
            projectile.xVelocity = projectile.xVelocity * -1;
        }
        else if (projectile.xVelocity > 0){
            projectile.xVelocity = projectile.xVelocity * -1;
        }
    }

    handleProjectileEnemyCollisionY(projectile: Projectile, enemy: Unit){
        // cant be damaged by other enemies
        if (projectile.unit instanceof Enemy){
            return;
        }

        // cant be damaged by itself
        if (projectile.unit === enemy){
            return;
        }
        
        if ((projectile.state === ProjectileStateNames.FLYING ||
            projectile.state === ProjectileStateNames.FALLING) && 
            enemy.state !== UnitStateNames.DEAD){
                projectile.buffs.forEach((buff: typeof Buff) => {
                    const bufff = new buff(enemy);
                    bufff.apply()
                })
                projectile.remove();   
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(enemy, projectile.unit.projectile);  
                    projectile.hasDealtDamage = true;
                }
        }
    }

    handleProjectileEnemyCollisionX(projectile: Projectile, enemy: Unit){
        // cant be damaged by other enemies
        if (projectile.unit instanceof Enemy){
            return;
        }
        // cant be damaged by itself
        if (projectile.unit === enemy){
            return;
        }
        if ((projectile.state === ProjectileStateNames.FLYING ||
            projectile.state === ProjectileStateNames.FALLING) && 
            enemy.state !== UnitStateNames.DEAD){   
                projectile.buffs.forEach((buff: typeof Buff) => {
                    const bufff = new buff(enemy);
                    bufff.apply()
                }) 
                projectile.remove();
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(enemy, projectile.constructor as typeof Projectile);
                    projectile.hasDealtDamage = true;
                }
        }
    }

    handleProjectilePlayerCollisionY(projectile: Projectile, player: Unit){
        if (projectile.unit === player){
            return;
        }
        if ((projectile.state === ProjectileStateNames.FLYING ||
            projectile.state === ProjectileStateNames.FALLING) && 
            player.state !== UnitStateNames.DEAD){
                projectile.remove();
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(player, projectile.constructor as typeof Projectile);  
                    projectile.hasDealtDamage = true;
                }
        }
    }

    handleProjectilePlayerCollisionX(projectile: Projectile, player: Unit){
        if (projectile.unit === player){
            return;
        }
        if ((projectile.state === ProjectileStateNames.FLYING ||
            projectile.state === ProjectileStateNames.FALLING) && 
            player.state !== UnitStateNames.DEAD){
                projectile.remove();
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(player, projectile.constructor as typeof Projectile);  
                    projectile.hasDealtDamage = true;
                }
        }
    }

    // ================================== util ===========================================================
    // =================================================================================================== 

    isFalling(player: Unit){
        player.updateY(1);
        const platformCollision = this.collideAny(player, this.stage.platforms);
        
        // ontop of some platform or jumping
        if (platformCollision || player.state === UnitStateNames.JUMPING){
            player.updateY(-1);
            return false;
        }
        // falling
        else{
            return true;
        }
    }

    isFallingEnemy(enemy: Enemy){
        enemy.updateY(1);

        const platformCollision = this.collideAny(enemy, this.stage.platforms);
        // ontop of some platform or jumping
        if (platformCollision || enemy.state === UnitStateNames.JUMPING){
            enemy.updateY(-1);
            return false;
        }
        // falling
        else{
            return true;
        }
    }

    isFallingProjectile(projectile: Projectile){
        projectile.updateY(1);
        
        const platformCollision = this.collideAny(projectile, this.stage.platforms);
        // ontop of some platform or jumping
        if (platformCollision){
            projectile.updateY(-1);
            return false;
        }
        // falling
        else{
            return true;
        }
    }

    collide(sprite1: Sprite, sprite2: Sprite){
        if (sprite2.left() >= sprite1.right() ||
            sprite2.right() <= sprite1.left() ||
            sprite2.bottom() <= sprite1.top() ||
            sprite2.top() >= sprite1.bottom()){
                return false;
            }
        return true;
    }

    collideAny(target: Sprite, spriteGroup: Sprite[]){
        let collidedSprite;
        spriteGroup.forEach((sprite: Sprite) => {
            if (this.collide(target, sprite)){
                collidedSprite = sprite;
            }
        })
        return collidedSprite;
    }
}