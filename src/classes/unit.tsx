import { Sprite } from './sprite';
import { UnitStateNames, UnitPartNames, UnitArmorNames } from '../types/enums';
import { UnitAttributes, UnitStatistics, UnitParts, SpriteParts, SpriteArmors } from '../types/types';
import { Projectile } from './projectiles/projectile';
import { Rock } from './projectiles/rock';
import { Treasure } from './treasures/treasure';
import { Stage } from './stage/stage';
import { Part } from './part';
import { SPRITE_DECAY_FADE_TIME } from '../types/constants';
import { FloatingText } from './floating_text';
import * as PIXI from 'pixi.js';
import { Armor } from './armor';
import { Spell } from './spells/spell';
import { Effect } from './effects/effect';
import { FireBall, FireBallMedium, ProjectileSpell } from './spells/projectile_spell';
import { FastFire } from './spells/buff_spell';
import { Buff } from './buffs/buff';
import { KeyOptions, SpritePart } from '../types/interfaces';

export class Unit extends Sprite {

    static baseAttributes: UnitAttributes = {
        HEALTH: 0,
        SPEED: 0,
        ARMOR: 0,
        ATTACK: 0,
        ATTACK_SPEED: 0,
        JUMP_COUNT: 0,
        JUMP_HEIGHT: 0,
    };

    static _name: string = "unit";

    static width: number = 0;
    static height: number = 0;

    static deathAnimationFrames: number = 30;

    // Player attributes/data
    attributes: UnitAttributes;
    currentAttributes: UnitAttributes;
    baseAttributes: UnitAttributes;
    statistics: UnitStatistics;
    projectile: typeof Projectile;
    currentJumps: number;
    currentArmorSet: SpriteArmors;

    // Player items/abilitie
    treasures: Treasure[];
    projectiles: typeof Projectile[];
    armors: Armor[];
    spells: Spell[];
    queuedSpells: ProjectileSpell[];
    temporaryBuffs: Buff[];

    // Sprite management
    state: UnitStateNames;
    facingRight: boolean;
    inKnockBack: boolean;
    timeSinceLastProjectileFired: number;
    projectileCooldown: number;
    distinctJump: boolean; // This is a hack to fix key delay spending too many jumps, jump only happen after keyup and keyrelease
    isImmune: boolean;
    fallingTimer: number;
    deathAnimationTimer: number;

    // Textures/sprites
    textures: UnitParts;
    spriteParts: SpriteParts;
    hpBar: PIXI.Graphics;
    effects: Effect[];

    // Keystoke tracking
    currentKeys: KeyOptions;

    // Debugging
    debugPartLocation: boolean;
    debugUnitRadius: boolean;
    debugGraphics: PIXI.Graphics;

    // TODO: main references
    currentStage: Stage;

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){    
        super(loader, x, y, width, height, 0, 0);    
        this.baseAttributes = { ...initialAttributes };
        this.attributes = { ...initialAttributes  };
        this.currentAttributes = { ...initialAttributes  };

        this.treasures = [];
        this.projectiles = [ Rock ];
        this.armors = [];
        this.spells = [];
        this.queuedSpells = [];
        this.temporaryBuffs = []; 
    
        this.statistics = {
            projectiles: 0,
            enemies: 0,
            damage: 0
        } as UnitStatistics;
        this.projectile = Rock;
        this.currentJumps = this.attributes.JUMP_COUNT;
        this.currentArmorSet = {
            head: null,
            legs: null,
            body: null,
        }
        this.state = {} as UnitStateNames;
        this.facingRight = false;
        this.inKnockBack = false;
        this.timeSinceLastProjectileFired = 0;
        this.projectileCooldown = this.attributes.ATTACK_SPEED;
        this.distinctJump = true; // This is a hack to fix key delay spending too many jumps, jump only happen after keyup and keyrelease
        this.isImmune = false;
        // this.immuneTime = 0;
        // this.maxImmuneTime = 50;
        // this.immuneFadeInterval = 5;
        // this.currentFadeIncrement = 1
        // this.currentImmuneFadeInterval = 0;
        this.fallingTimer = 0;
        this.deathAnimationTimer = 0;
        // this.decay = SPRITE_DECAY_FADE_TIME;
        
        this.textures = {} as UnitParts;
        this.spriteParts = {} as SpriteParts;
        this.hpBar = new PIXI.Graphics();
        this.effects = [];

        this.currentStage = currentStage;
        this.currentKeys = {} as KeyOptions;
    }

    update(keyboard: KeyOptions){
        this.currentKeys = keyboard;
        this.flipSpriteParts();
        this.handleState();
        this.updateCooldowns();
        this.updateSpells();
        this.updateBuffs();
    };

    hide(): void {
        this.currentStage.viewport.removeChild(this.hpBar);
        Object.keys(this.spriteParts).forEach((partName: string) => {
            const tempPartName: UnitPartNames = partName as UnitPartNames;
            const part: SpritePart = this.spriteParts[tempPartName];
            this.currentStage.viewport.removeChild(part.sprite);
        });

        this.effects.forEach((effect: Effect) => {
            effect.hide();
        });
    }


    remove(): void {
        this.hpBar.clear();
        this.hpBar.destroy();
        this.currentStage.viewport.removeChild(this.hpBar);
        this.effects.forEach((effect: Effect) => {
            effect.remove();
        })
        Object.keys(this.spriteParts).forEach((partName: string) => {
            const tempPartName: UnitPartNames = partName as UnitPartNames;
            const part: SpritePart = this.spriteParts[tempPartName];
            this.currentStage.viewport.removeChild(part.sprite);
        }) 
    }

    add(): void {
        const unitBodyParts = Object.keys(this.spriteParts).map((key: string) => {
            const partName = key as UnitPartNames;
            return this.spriteParts[partName].sprite
        })
        const effectsGraphics = this.effects.map((effect: Effect) => {
            return effect.graphics;
        })
        const allSprites: PIXI.DisplayObject[]  = [ ...unitBodyParts, this.hpBar, ...effectsGraphics];
        this.currentStage.viewport.addChild(...allSprites);
    }

    setState(state: UnitStateNames){
        this.state = state;
    }

    setY(value: number){
        this.y = value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.y = value + this.spriteParts[playerPartName].offSetY;
        })
    }

    setX(value: number){
        this.x = value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.x = value + this.spriteParts[playerPartName].offSetX;
        })
    }

    reset(){
        this.setX(this.spawnX);
        this.setY(this.spawnY);
        this.currentStage.viewport.removeChild(this.hpBar);
        this.attributes = { ...this.baseAttributes };
        this.currentAttributes = { ...this.baseAttributes };
    }

    updateY(value: number){
        this.y += value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.y += value;
        })
    }

    updateX(value: number){
        this.x += value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.x += value;
        })
    }

    takeDamage(value: number): number{
        let damageTaken = 0;
        if (this.state !== UnitStateNames.DEAD && !this.isImmune){
            damageTaken = Math.round(value - (this.currentAttributes.ARMOR * .50));
            this.currentAttributes.HEALTH -= damageTaken;
            const floatingText = new FloatingText(this.currentStage, this.x, this.y, `-${damageTaken}`);
            floatingText.add()
            if (this.currentAttributes.HEALTH <= 0){
                this.hpBar.visible = false;
                this.setState(UnitStateNames.DEAD);
            }        
        }
        return damageTaken;
    }

    dealDamage(target: Unit, projectile: typeof Projectile): number{
        let damageDealt = 0;
        if (this.state !== UnitStateNames.DEAD){
            damageDealt = projectile.baseAttributes.damage + Math.round( this.currentAttributes.ATTACK * .25 );  
        }
        target.takeDamage(damageDealt);
        return damageDealt;
    }

    drawEffects(){
        this.effects.forEach((effect: Effect) => {
            effect.draw();
        })
    }


    drawHpBar(){
        this.hpBar.clear()
        const marginX = 2;
        const marginY = -10;
        const hpBarHeight = this.height / 9;
        const hpBarWidth = this.width;


        this.hpBar.beginFill(0x00FF00);
        let greenPercent = this.currentAttributes.HEALTH / this.attributes.HEALTH;
        let redPercent = 1.0 - greenPercent;

        // TODO: fix the underlying issue. Temp hack to fix neg percent
        if ((greenPercent) < 0){
            redPercent = 1.0;
            greenPercent = 0;
        }

        this.hpBar.drawRect(this.x + marginX, this.y + marginY, hpBarWidth * greenPercent, hpBarHeight);
        this.hpBar.beginFill(0xFF0000);
        this.hpBar.drawRect(this.x + marginX + (greenPercent * hpBarWidth), this.y + marginY, hpBarWidth * redPercent, hpBarHeight);
    }

    

    // ================================== protected ===========================================================
    // ========================================================================================================

    protected isJumpAvailable(): boolean {
        if (this.currentJumps > 0 && this.distinctJump){
            return true
        }
        return false;
    }

    protected isInsideRadius(sprite: Sprite, radius: number): boolean {
        const targetCenterX = sprite.x + (sprite.width / 2);
        const targetCenterY = sprite.y + (sprite.height / 2);

        const circleCenterX = this.x + (this.width / 2);
        const circleCenterY = this.y + (this.height / 2);

        if ( ( Math.pow((targetCenterX - circleCenterX), 2) + Math.pow((targetCenterY - circleCenterY), 2) )  < Math.pow(radius, 2) ){
            return true;
        }

        return false;
    }

    protected isInsideSemiCircle(sprite: Sprite, radius: number): boolean {
        const targetCenterX = sprite.x + (sprite.width / 2);
        const targetCenterY = sprite.y + (sprite.height / 2);

        const circleCenterX = this.x + (this.width / 2);
        const circleCenterY = this.y + (this.height / 2);

        if (targetCenterY > (circleCenterY + 50)){
            return false;
        }
        if (targetCenterY < (circleCenterY - 50)){
            return false
        }

        if ( ( Math.pow((targetCenterX - circleCenterX), 2) + Math.pow((targetCenterY - circleCenterY), 2) )  < Math.pow(radius, 2) ){
            return true;
        }

        return false;
    }

    protected clearStats(){
        this.statistics.damage = 0;
        this.statistics.enemies = 0;
        this.statistics.projectiles = 0;
    }

    // Handle unit state
    protected handleState(){
        switch(this.state){
            case(UnitStateNames.STANDING):
                this.standing();
                break;
            case(UnitStateNames.WALKING):
                this.walking()
                break;
            case(UnitStateNames.FALLING):
                this.falling()
                break;
            case(UnitStateNames.JUMPING):
                this.jumping()
                break;
            case (UnitStateNames.DEAD):
                this.dying()
                break;
            default:
                break;
        }
    }

    protected updateSpells(){
        this.spells.forEach((spell: Spell) => {
            spell.update();
        });
    } 

    protected updateBuffs(){
        this.temporaryBuffs.forEach((buff: Buff) => {
            buff.update();
        });
    }

    protected updateCooldowns(){
        // projectile cooldowns
        if (this.timeSinceLastProjectileFired > 0){
            this.timeSinceLastProjectileFired -= 1;
        }

        // jump cooldowns
        if (this.currentKeys.jump && this.distinctJump){
            this.distinctJump = false;
        } else if (!this.currentKeys.jump && !this.distinctJump){
            this.distinctJump = true;
        }

        // decay
        if (this.decay <= 0) {
            this.remove();
        };

        //  falling
        if (this.fallingTimer === 150){
            this.setState(UnitStateNames.DEAD);
        } else if (this.state === UnitStateNames.FALLING){
            this.fallingTimer += 1;
        } else {
            this.fallingTimer = 0;
        }

    }

    protected flipSpriteParts(){
        if (this.xVelocity > 0){
            this.facingRight = true;
        } else {
            this.facingRight = false;
        }

        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;

            // flip facing right/left
            if (this.facingRight){
                sprite.anchor.x = 0;
                sprite.scale.x = 1;
            }
            else{
                sprite.anchor.x = 1;
                sprite.scale.x = -1;
            }
        });

    }

    protected initSpriteParts(): SpriteParts {
        const headOffsetX = 0;
        const headOffSetY = -5;
        const head = new Part(this.textures.head[UnitArmorNames.DEFAULT], headOffsetX, headOffSetY, this);

        const bodyOffsetX = 0;
        const bodyOffsetY = head.sprite.height + headOffSetY;
        const body = new Part(this.textures.body[UnitArmorNames.DEFAULT], bodyOffsetX, bodyOffsetY, this);

        const legsOffsetX = 0;
        const legsOffsetY = body.sprite.height + bodyOffsetY;
        const legs = new Part(this.textures.legs[UnitArmorNames.DEFAULT], legsOffsetX, legsOffsetY, this);;
        return {
            head,
            body,
            legs
        };
    }

    protected fireProjectile(projectileType: typeof Projectile, xVelocity: number, yVelocity: number){
        this.timeSinceLastProjectileFired = this.projectileCooldown;
        const projectile = new projectileType(this.loader, this.x, this.y, this, xVelocity, yVelocity)
        projectile.add();
        this.currentStage.projectiles.push(projectile);
    }

    protected tryJump(){
        if (this.currentKeys.jump && this.isJumpAvailable()){
            this.state = UnitStateNames.JUMPING;
            this.yVelocity = -this.currentAttributes.JUMP_HEIGHT;
            this.currentJumps -= 1;
        }
    }

    protected canAttack(): boolean{
        if (this.timeSinceLastProjectileFired > 0){
            return false;
        }
        return true;
    }

    protected dying(){
        this.xVelocity = 0;
        this.decay -= 1;

        if (this.deathAnimationTimer < Unit.deathAnimationFrames){
            if (this.deathAnimationTimer > 15){
                this.spriteParts.body.sprite.x -= 1;
                this.spriteParts.body.sprite.y += 1;
            }
            if (this.deathAnimationTimer < 20){
                this.spriteParts.head.sprite.x += 1;
                this.spriteParts.head.sprite.y += 1;
            }
            this.deathAnimationTimer += 1;
        }

        if (this.decay < SPRITE_DECAY_FADE_TIME){
            Object.keys(this.spriteParts).forEach((partName: string) => {
                const tempPartName: UnitPartNames = partName as UnitPartNames;
                const part: SpritePart = this.spriteParts[tempPartName];
                part.sprite.alpha -= (1 / SPRITE_DECAY_FADE_TIME);  
            });

        }
    }


    // These need to be overloaded
    protected revive(){
        this.attributes = { ...this.baseAttributes };
        this.currentAttributes = { ...this.baseAttributes };
        this.setState(UnitStateNames.STANDING);
        this.fallingTimer = 0;
        this.timeSinceLastProjectileFired = 0;
            
        this.remove();

        this.spriteParts = this.initSpriteParts();
        this.hpBar = new PIXI.Graphics();

        this.attributes = { ...this.baseAttributes };
        this.treasures = [];
        // this.currentStage.startingTreasures.forEach((treasure: Treasure) => {
        //     // Treasure.apply(this, treasure);
        //     treasure.apply(this);
        // })
        this.add();
    }

    protected tryAttack(){
        
    }

    protected trySpellCast(){

    }

    protected standing(){

    }

    protected walking(){

    }

    protected jumping(){

    }

    protected falling(){
        
    }

}
