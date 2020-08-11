import { Player } from "../players/player";
import { Viewport } from 'pixi-viewport';
import { Stage } from "./stage";
import { Platform, DefaultPlatform, GrassPlatform, DirtPlatform, RedGrassPlatform, SandRockPlatform } from "../platform";
import { Treasure } from "../treasures/treasure";
import { SmallCoins } from "../treasures/coin_treasure";
import { Enemy } from "../enemies/enemy";
import { SpritePart } from "../interfaces";
import { STAGE1_LAYOUT, STAGE2_LAYOUT } from "../../types/constants";
import { UnitAttributes } from "../../types/types";
import { UnitPartNames, UnitArmorNames } from "../../types/enums";
import { ArrowTreasure } from "../treasures/projectile_treasure";
import { KnightHeadArmor1Treasure, KnightHeadArmor2Treasure, KnightBodyArmor1Treasure, KnightLegsArmor1Treasure, OrcHeadArmor1Treasure, OrcBodyArmor1Treasure, OrcLegsArmor1Treasure, KoboldHeadArmor1Treasure, KoboldLegsArmor1Treasure, KoboldBodyArmor2Treasure, KoboldHeadArmor2Treasure, KoboldHeadArmor3Treasure } from "../treasures/armor_treasure";
import { Kobold } from "../enemies/kobold";
import { Man } from "../enemies/man";
import { Manticore } from "../enemies/manticore";
import { Knight } from "../players/knight";
import { Orc } from "../players/orc";
import { KoboldHeadArmor1, KoboldLegsArmor1 } from "../armor";

export class StageManager {

    loader: PIXI.Loader;
    player: Player;
    viewport: Viewport;

    constructor(loader: PIXI.Loader, player: Player, viewport: Viewport){
        this.loader = loader;
        this.player  = player;
        this.viewport = viewport;
    }

    // Get a stage by its level
    getStage(level: number){
        switch(level) {
            case(1):
                return this.buildStageOne();
                // return this.buildStageTwo();
            case(2):
                return this.buildStageTwo();
            default:
                throw "no stage"
        }
    }

    loadStage(stage: Stage){
        const platforms = stage.platforms;
        const newplayer = stage.player;
        const treasures = stage.treasures;
        const enemies = stage.enemies;
        
        enemies.forEach((enemy: Enemy) => {
            this.viewport.addChild(...enemy.getSprites());
        });

        platforms.forEach((platform: Platform) => this.viewport.addChild(platform.pixiSprite));

        treasures.forEach((treasure: Treasure) => {
            this.viewport.addChild(...treasure.spriteParts.map((spritePart: SpritePart) => spritePart.sprite));
        })

        this.viewport.addChild(stage.timer.displayObject);
        this.viewport.addChild(...newplayer.getSprites())
    }

    clearStage(){
        this.viewport.removeChildren(0, this.viewport.children.length);
    }



    // =================================== Stage contruction ================================================= //
    // ======================================================================================================= //
    private buildStageOne(): Stage {
        const level = 1;
        const name = "beginners luck";
        const platforms = this.generatePlatforms(STAGE1_LAYOUT);
        const treasures = this.generateTreasures(level);
        const stage = new Stage(
            level,
            name,
            [],
            platforms,
            treasures,
            this.player,
            this.viewport,
            this,
        );
        // const enemies = [] as Enemy[];
        const enemies = [
            new Kobold(this.loader, stage, Kobold.baseAttributes, Kobold.width, Kobold.height, 200, 200),
            new Man(this.loader, stage, Man.baseAttributes, Man.width, Man.height, 789, 554), 
            new Kobold(this.loader, stage, Kobold.baseAttributes, Kobold.width, Kobold.height, 83, 700)
        ];
        // const enemies = [new Kobold(this.loader, stage, {} as UnitAttributes, 200, 200)]

        stage.enemies = enemies;
        return stage;
    }

    private buildStageTwo(): Stage{
        const level = 2;
        const name = "stage fucking 2";
        const platforms = this.generatePlatforms(STAGE2_LAYOUT);
        const treasures = this.generateTreasures(level)
        const stage =  new Stage(
            level,
            name,
            [],
            platforms,
            treasures,
            this.player,
            this.viewport,
            this,
        )

        // TODO: temp hack to see how we can apply armor to enemies
        // abstract this out
        // const armoredKobold = new Man(this.loader, stage, {} as UnitAttributes, 895, 405);

        const affectedBodyPart = UnitPartNames.HEAD;
        const newArmorType = UnitArmorNames.ARMOR2;
        // const newTexture = armoredKobold.textures[affectedBodyPart][newArmorType];
        // const spritePart = armoredKobold.spriteParts[affectedBodyPart].sprite;
        // spritePart.texture = newTexture;
        // armoredKobold.currentArmorSet[affectedBodyPart] = newArmorType;

        // stage.enemies.push(armoredKobold);
        stage.enemies.push(
            new Manticore(this.loader, stage, Manticore.baseAttributes, Manticore.width, Manticore.height, 462, 540),
            new Man(this.loader, stage, Man.baseAttributes, Man.width, Man.height, 127, 427.5),
            new Man(this.loader, stage, Man.baseAttributes, Man.width, Man.height, 403, 427.5));
        
        return stage;

    }




    // =================================== Treasure generation =============================================== //
    // ======================================================================================================= //
    private generateTreasures(level: number): Treasure[]{
        let treasures: Treasure[] = this.generateGenericTreasures(level);
        switch(this.player.constructor){
            case(Knight):
                treasures.push(...this.generateRandomKnightTreasures(level));
                break;
            case(Kobold):
                treasures.push(...this.generateRandomKoboldTreasures(level));
                break;
            case(Orc):
                treasures.push(...this.generateRandomOrcTreasures(level));
                break;
            default: 
                break;
        }
        return treasures;
    }

    private generateGenericTreasures(stage: number): Treasure[] {
        const genericTreasures: Treasure[] = [];
        switch(stage){
            case(1):
                genericTreasures.push(new SmallCoins(this.loader, 536, 805));
                break;
            case(2):
                genericTreasures.push(new SmallCoins(this.loader, 1214, 517.5));
                break;
            default:
                break;
        }
        return genericTreasures;
    }


    private generateStage1Treasures(treasure1Type: typeof Treasure, treasure2Type: typeof Treasure): Treasure[]{
        const treasures = [];

        const lowerTreasureX =  334;
        const lowerTreasureY =  1045;

        const upperTreasureX = 223;
        const upperTreasureY = 70;

        const projectileTreasureX = 1071;
        const projectileTreasureY = 837;
        treasures.push(new ArrowTreasure(this.loader, projectileTreasureX, projectileTreasureY));
        treasures.push(new treasure1Type(this.loader, lowerTreasureX, lowerTreasureY));
        treasures.push(new treasure2Type(this.loader, upperTreasureX, upperTreasureY));

        return treasures;
    }

    private generateStage2Treasures(treasure1Type: typeof Treasure, treasure2Type: typeof Treasure): Treasure[] {
        const treasures = [] as Treasure[];

        const treasure1X = 1915;
        const treasure1Y = 327.5;

        const treasure2X = 1265;
        const treasure2Y = 652;

        treasures.push(new treasure1Type(this.loader, treasure1X, treasure1Y))
        treasures.push(new treasure2Type(this.loader, treasure2X, treasure2Y))

        return treasures;
    }

    private generateRandomKnightTreasures(stage: number): Treasure[]{
        const knightTreasures: Treasure[] = [];
        let treasureOptions = [] as  typeof Treasure[];
        let randomTreasureTypes = [] as typeof Treasure[]

        switch(stage){
            case(1):
                treasureOptions = [KnightHeadArmor1Treasure, KnightHeadArmor2Treasure, KnightBodyArmor1Treasure, KnightLegsArmor1Treasure]
                randomTreasureTypes = this.getRandomTreaureTypes(treasureOptions, 2);
                knightTreasures.push(...this.generateStage1Treasures(randomTreasureTypes[0], randomTreasureTypes[1]));
                break;
            case(2):   
                treasureOptions = [KnightHeadArmor1Treasure, KnightHeadArmor2Treasure, KnightBodyArmor1Treasure, KnightLegsArmor1Treasure]
                randomTreasureTypes = this.getRandomTreaureTypes(treasureOptions, 2);
                knightTreasures.push(...this.generateStage2Treasures(randomTreasureTypes[0], randomTreasureTypes[1]));
                break;
            default:
                break;
        }
        return knightTreasures;
    }


    private generateRandomKoboldTreasures(stage: number): Treasure[]{
        const koboldTreasures: Treasure[] = [];
        let treasureOptions = [] as  typeof Treasure[];
        let randomTreasureTypes = [] as typeof Treasure[]
        switch(stage){
            case(1):
                treasureOptions = [KoboldHeadArmor1Treasure, KoboldLegsArmor1Treasure, KoboldBodyArmor2Treasure, KoboldHeadArmor2Treasure];
                randomTreasureTypes = this.getRandomTreaureTypes(treasureOptions, 2);
                koboldTreasures.push(...this.generateStage1Treasures(randomTreasureTypes[0], randomTreasureTypes[1]));
                break;
            case(2):
                treasureOptions = [KoboldBodyArmor2Treasure, KoboldHeadArmor3Treasure];
                randomTreasureTypes = this.getRandomTreaureTypes(treasureOptions, 2);
                koboldTreasures.push(...this.generateStage2Treasures(randomTreasureTypes[0], randomTreasureTypes[1]));
                break;
            default: 
                break;  
        }
        return koboldTreasures;
    }

    private generateRandomOrcTreasures(stage: number): Treasure[] {
        const orcTreasures: Treasure[] = [];
        let treasureOptions = [] as  typeof Treasure[];
        let randomTreasureTypes = [] as typeof Treasure[];
        switch(stage){
            case(1):
                treasureOptions = [OrcHeadArmor1Treasure, OrcBodyArmor1Treasure, OrcLegsArmor1Treasure];
                randomTreasureTypes = this.getRandomTreaureTypes(treasureOptions, 2);
                orcTreasures.push(...this.generateStage1Treasures(randomTreasureTypes[0], randomTreasureTypes[1]));
                break;
            case(2):
                treasureOptions = [OrcHeadArmor1Treasure, OrcBodyArmor1Treasure, OrcLegsArmor1Treasure];
                randomTreasureTypes = this.getRandomTreaureTypes(treasureOptions, 2);
                orcTreasures.push(...this.generateStage2Treasures(randomTreasureTypes[0], randomTreasureTypes[1]));
                break;
            default: 
                break;  
        }
        return orcTreasures;
    }



    // // =================================== Utility methods ================================================= //
    // // ======================================================================================================= //



    // Returns list of treasure types equal to the <count> passed in
    // treasure types wil be randomly picked from the <options> passed
    // in.
    private getRandomTreaureTypes(options: typeof Treasure[], count: number): typeof Treasure[]{
        if (count > options.length){
            throw "not enough unique treasures in getRandomTreasureTypes";
        }
        const randomTreasureTypes = [] as typeof Treasure[];
        for (let i = 0; i < count; ++i){
            const randomIndex = Math.floor(Math.random() * options.length);
            const randomTreasureType = options[randomIndex];
            randomTreasureTypes.push(randomTreasureType);
            options = options.filter(option => option !== randomTreasureType);
        }
        return randomTreasureTypes;
    }

    // Generate and return a set of platform defined by the 
    // layout string.
    private generatePlatforms(layout: string): Platform[]{
        const platforms = [] as Platform[];
        const lines = layout.split('\n');
        const measurements = lines[0].split(' ');
        const width = parseInt(measurements[0]);
        const height = parseInt(measurements[1]);
        let x = 0;
        let y = 0;
        const xIncrement = 25;
        const yIncrement = 25;
        // loop height
        for(var i = 1; i < height + 1; ++i){
            x = 0;
            // loop width
            for(var k = 0; k < width; ++k){
                const platformDelimeter = lines[i][k]
                if (platformDelimeter === "0") {
                    x += xIncrement
                    continue;
                };
                platforms.push(this.createPlatform(platformDelimeter, x, y, xIncrement, yIncrement));
                x += xIncrement;
            }
            y += yIncrement;
        }
        return platforms;
    }

    // Return a Platform object with given x, y coords and given width and height
    // Platform type returned is based on delimter passed in
    private createPlatform(delimeter: string, x: number, y: number, width: number, height: number): Platform {
        let platform: Platform;
        switch(delimeter){
            case("1"):
                platform = new DefaultPlatform(this.loader, x, y, width, height);
                break;
            case("G"):
                platform = new GrassPlatform(this.loader, x, y, width, height);
                break;
            case("D"):
                platform = new DirtPlatform(this.loader, x, y, width, height);
                break;
            case("R"):
                platform = new RedGrassPlatform(this.loader, x, y, width, height);
                break;
            case("S"):
                platform = new SandRockPlatform(this.loader, x, y, width, height);
                break;
            default:
                throw('unhandled delimter in stage manager');
        }
        return platform;
    }
}
