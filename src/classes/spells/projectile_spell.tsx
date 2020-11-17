import { Projectile } from "../projectiles/projectile";
import { Unit } from "../unit";
import { Spell } from "./spell";
import { FireBall as FireBallProjectile } from "../projectiles/fire_ball";
import { FireBallMedium as FireBallProjectileMedium } from "../projectiles/fire_ball_md";





export class ProjectileSpell extends Spell {

    projectile: typeof Projectile;

    constructor(unit: Unit){
        super(unit);
        this.name = "projectile spell";
    }

    fireCast(xVelocity: number, yVelocity: number){
        // this.timeSinceLastProjectileFired = this.projectileCooldown;
        const projectile = new this.projectile(this.unit.loader, this.unit.x, this.unit.y, this.unit, xVelocity, yVelocity)
        projectile.add();
        this.unit.currentStage.projectiles.push(projectile);
    }

    isSpellQueued(): boolean{
        return this.unit.queuedSpells.some((spell: Spell) => {
            if (spell instanceof this.constructor){
                return true;
            }
            return false;
        })
    }
}




export class FireBall extends ProjectileSpell {

    projectile: typeof Projectile;
    
    constructor(unit: Unit){
        super(unit);
        this.cooldown = 400;
        this.projectile = FireBallProjectile;
        this.name = "fireball";
    }

    cast(){
        if (!this.isSpellQueued()){
            super.cast();
            this.unit.queuedSpells.push(this);
        }
    }

    update(){
        super.update();
    }

}



export class FireBallMedium extends ProjectileSpell {

    projectile: typeof Projectile;
    
    constructor(unit: Unit){
        super(unit);
        this.cooldown = 400;
        this.projectile = FireBallProjectileMedium;
        this.name = "medium fireball";
    }

    cast(){
        if (!this.isSpellQueued()){
            super.cast();
            this.unit.queuedSpells.push(this);
        }
    }

    update(){
        super.update();
    }

}




