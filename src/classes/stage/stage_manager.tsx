import { Viewport } from "pixi-viewport";
import { Player } from "../players/player";
import { TemplateHelper } from "../stage_builder/template_helper";
import { Stage } from "./stage";
import * as Stages from '../../types/stages';
import { StageTemplate } from "../../types/interfaces";

export class StageManager {
    viewport: Viewport;
    player: Player;
    loader: PIXI.Loader;
    templateHelper: TemplateHelper;


    constructor(viewport: Viewport, player: Player, loader: PIXI.Loader){
        this.viewport = viewport;
        this.player = player;
        this.loader = loader;
        this.templateHelper = new TemplateHelper();
    }

    getStageFromTemplate = (template: StageTemplate): Stage => {
        return this.templateHelper.loadTemplate(this.viewport, this.loader, this.player, template)
    }

    getStage = (level: number): Stage => {
        switch(level){
            case(1):
                return this.templateHelper.loadTemplate(
                    this.viewport,
                    this.loader,
                    this.player,
                    Stages.STAGE_1
                );
            case(2):
                return this.templateHelper.loadTemplate(
                    this.viewport,
                    this.loader,
                    this.player,
                    Stages.STAGE_2
                );
            default:
                throw new Error(`no stage found for level ${level}`);
        }
    }
}


// import { Player } from "../players/player";
// import { Viewport } from 'pixi-viewport';
// import { Stage } from "./stage";
// import { Platform, DefaultPlatform, GrassPlatform, DirtPlatform, RedGrassPlatform, SandRockPlatform } from "../platform";
// import { Treasure } from "../treasures/treasure";
// import { SmallCoins } from "../treasures/coin_treasure";
// import { STAGE1_LAYOUT, STAGE2_LAYOUT } from "../../types/constants";
// import { ArrowTreasure } from "../treasures/projectile_treasure";
// import { KnightHeadArmor1Treasure, KnightHeadArmor2Treasure, KnightBodyArmor1Treasure, KnightLegsArmor1Treasure, OrcHeadArmor1Treasure, OrcBodyArmor1Treasure, OrcLegsArmor1Treasure, KoboldHeadArmor1Treasure, KoboldLegsArmor1Treasure, KoboldBodyArmor2Treasure, KoboldHeadArmor2Treasure, KoboldHeadArmor3Treasure } from "../treasures/armor_treasure";
// import { Kobold as EnemyKobold } from "../enemies/kobold";
// import { Man } from "../enemies/man";
// import { Manticore } from "../enemies/manticore";
// import { Knight } from "../players/knight";
// import { Orc } from "../players/orc";
// import { Kobold } from "../players/kobold";
// import { FastFireTreasure, FireBallMediumTreasure, FireBallTreasure } from "../treasures/spell_treasure";


// // Creates stages
// export class StageManager {

//     loader: PIXI.Loader;
//     player: Player;
//     viewport: Viewport;

//     constructor(loader: PIXI.Loader, player: Player, viewport: Viewport){
//         this.loader = loader;
//         this.player  = player;
//         this.viewport = viewport;
//     }

//     // Get a stage by its level
//     getStage(level: number){
//         switch(level) {
//             case(1):
//                 return this.buildStageOne();
//             case(2):
//                 return this.buildStageTwo();
//             default:
//                 throw "no stage"
//         }
//     }




//     // =================================== Stage contruction ================================================= //
//     // ======================================================================================================= //
//     private buildStageOne(): Stage {
//         const level = 1;
//         const name = "beginners luck";
//         // const treasures = this.generateTreasures(level);
//         const stage = new Stage(
//             level,
//             name,
//             this.player,
//             this.viewport,
//             this,
//         );

//         const enemies = [
//             new EnemyKobold(this.loader, stage, Kobold.baseAttributes, Kobold.width, Kobold.height, 200, 200),
//             new Man(this.loader, stage, Man.baseAttributes, Man.width, Man.height, 789, 554), 
//             new EnemyKobold(this.loader, stage, Kobold.baseAttributes, Kobold.width, Kobold.height, 83, 700)
//         ];

//         const platforms = this.generatePlatforms(STAGE1_LAYOUT, stage);
//         stage.platforms = platforms;

//         const treasures = this.generateTreasures(stage);
//         stage.treasures = treasures;

//         stage.enemies = enemies;
//         return stage;
//     }

//     private buildStageTwo(): Stage{
//         const level = 2;
//         const name = "stage fucking 2";
//         const stage =  new Stage(
//             level,
//             name,
//             this.player,
//             this.viewport,
//             this
//         );

//         stage.enemies.push(
//             new Manticore(this.loader, stage, Manticore.baseAttributes, Manticore.width, Manticore.height, 462, 540),
//             new Man(this.loader, stage, Man.baseAttributes, Man.width, Man.height, 127, 427.5),
//             new Man(this.loader, stage, Man.baseAttributes, Man.width, Man.height, 403, 427.5));

            
//         const platforms = this.generatePlatforms(STAGE2_LAYOUT, stage);
//         stage.platforms = platforms;

//         const treasures = this.generateTreasures(stage);
//         stage.treasures = treasures;

//         return stage;

//     }




//     // =================================== Treasure generation =============================================== //
//     // ======================================================================================================= //
//     private generateTreasures(stage: Stage): Treasure[]{
//         let treasures: Treasure[] = this.generateGenericTreasures(stage);
//         switch(this.player.constructor){
//             case(Knight):
//                 treasures.push(...this.generateRandomKnightTreasures(stage));
//                 break;
//             case(Kobold):
//                 treasures.push(...this.generateRandomKoboldTreasures(stage));
//                 break;
//             case(Orc):
//                 treasures.push(...this.generateRandomOrcTreasures(stage));
//                 break;
//             default: 
//                 break;
//         }
//         return treasures;
//     }

//     private generateRandomKnightTreasures(stage: Stage): Treasure[]{
//         const knightTreasures: Treasure[] = [];
//         let treasureOptions = [] as  typeof Treasure[];
//         let randomTreasureTypes = [] as typeof Treasure[]

//         switch(stage.level){
//             case(1):
//                 treasureOptions = [KnightHeadArmor1Treasure, KnightHeadArmor2Treasure, KnightBodyArmor1Treasure, KnightLegsArmor1Treasure]
//                 randomTreasureTypes = this.getRandomTreasureTypes(treasureOptions, 2);
//                 knightTreasures.push(...this.generateStage1Treasures(stage, randomTreasureTypes[0], randomTreasureTypes[1]));
//                 break;
//             case(2):   
//                 treasureOptions = [KnightHeadArmor1Treasure, KnightHeadArmor2Treasure, KnightBodyArmor1Treasure, KnightLegsArmor1Treasure]
//                 randomTreasureTypes = this.getRandomTreasureTypes(treasureOptions, 2);
//                 knightTreasures.push(...this.generateStage2Treasures(stage, randomTreasureTypes[0], randomTreasureTypes[1]));
//                 break;
//             default:
//                 break;
//         }
//         return knightTreasures;
//     }


//     private generateRandomKoboldTreasures(stage: Stage): Treasure[]{
//         const koboldTreasures: Treasure[] = [];
//         let treasureOptions = [] as  typeof Treasure[];
//         let randomTreasureTypes = [] as typeof Treasure[]
//         switch(stage.level){
//             case(1):
            
//                 treasureOptions = [KoboldHeadArmor1Treasure, KoboldLegsArmor1Treasure, KoboldBodyArmor2Treasure, KoboldHeadArmor2Treasure];
//                 randomTreasureTypes = this.getRandomTreasureTypes(treasureOptions, 2);
//                 koboldTreasures.push(...this.generateStage1Treasures(stage, randomTreasureTypes[0], randomTreasureTypes[1]));
//                 break;
//             case(2):
//                 treasureOptions = [KoboldBodyArmor2Treasure, KoboldHeadArmor3Treasure];
//                 randomTreasureTypes = this.getRandomTreasureTypes(treasureOptions, 2);
//                 koboldTreasures.push(...this.generateStage2Treasures(stage, randomTreasureTypes[0], randomTreasureTypes[1]));
//                 break;
//             default: 
//                 break;  
//         }
//         return koboldTreasures;
//     }

//     private generateRandomOrcTreasures(stage: Stage): Treasure[] {
//         const orcTreasures: Treasure[] = [];
//         let treasureOptions = [] as  typeof Treasure[];
//         let randomTreasureTypes = [] as typeof Treasure[];
//         switch(stage.level){
//             case(1):
//                 treasureOptions = [OrcHeadArmor1Treasure, OrcBodyArmor1Treasure, OrcLegsArmor1Treasure];
//                 randomTreasureTypes = this.getRandomTreasureTypes(treasureOptions, 2);
//                 orcTreasures.push(...this.generateStage1Treasures(stage, randomTreasureTypes[0], randomTreasureTypes[1]));
//                 break;
//             case(2):
//                 treasureOptions = [OrcHeadArmor1Treasure, OrcBodyArmor1Treasure, OrcLegsArmor1Treasure];
//                 randomTreasureTypes = this.getRandomTreasureTypes(treasureOptions, 2);
//                 orcTreasures.push(...this.generateStage2Treasures(stage, randomTreasureTypes[0], randomTreasureTypes[1]));
//                 break;
//             default: 
//                 break;  
//         }
//         return orcTreasures;
//     }

//     private generateRandomSpellTreasures(stage: Stage): typeof Treasure[] {
//         const spellTreasures = [];
//         switch(stage.level){
//             case(1):
//                 const spellTreasureOptions = [FastFireTreasure, FireBallMediumTreasure, FireBallTreasure];
//                 const randomSpellTreasures = this.getRandomTreasureTypes(spellTreasureOptions, 1);
//                 spellTreasures.push(randomSpellTreasures[0]);
//                 break;
//             default:
//                 break;
//         }
//         return spellTreasures;
//     }


//     private generateGenericTreasures(stage: Stage): Treasure[] {
//         const genericTreasures: Treasure[] = [];
//         switch(stage.level){
//             case(1):
//                 genericTreasures.push(new SmallCoins(this.loader, stage, 536, 805));
//                 break;
//             case(2):
//                 genericTreasures.push(new SmallCoins(this.loader, stage, 1214, 517.5));
//                 break;
//             default:
//                 break;
//         }
//         return genericTreasures;
//     }

//     private generateStage1Treasures(stage: Stage,
//                                     armorTreasure1: typeof Treasure,
//                                     armorTreasure2: typeof Treasure): Treasure[]{
//         const treasures = [];

//         const lowerTreasureX =  334;
//         const lowerTreasureY =  1045;

//         const upperTreasureX = 223;
//         const upperTreasureY = 70;

//         const projectileTreasureX = 1071;
//         const projectileTreasureY = 837;


//         const spellTreasureX = 280;
//         const spellTreasureY = 70;


//         treasures.push(new ArrowTreasure(this.loader, stage,  projectileTreasureX, projectileTreasureY));
//         treasures.push(new FastFireTreasure(this.loader, stage, spellTreasureX, spellTreasureY));
//         treasures.push(new armorTreasure1(this.loader, stage, lowerTreasureX, lowerTreasureY));
//         treasures.push(new armorTreasure2(this.loader, stage, upperTreasureX, upperTreasureY));
    

//         return treasures;
//     }

//     private generateStage2Treasures(stage: Stage,
//                                     armorTreasure1: typeof Treasure,
//                                     armorTreasure2: typeof Treasure): Treasure[] {
//         const treasures = [] as Treasure[];

//         const treasure1X = 1915;
//         const treasure1Y = 327.5;

//         const treasure2X = 1265;
//         const treasure2Y = 652;

//         treasures.push(new armorTreasure1(this.loader, stage, treasure1X, treasure1Y))
//         treasures.push(new armorTreasure2(this.loader, stage, treasure2X, treasure2Y))

//         return treasures;
//     }

//     // // =================================== Utility methods ================================================= //
//     // // ======================================================================================================= //



//     // Returns list of treasure types equal to the <count> passed in
//     // treasure types wil be randomly picked from the <options> passed
//     // in.
//     private getRandomTreasureTypes(options: typeof Treasure[], count: number): typeof Treasure[]{
//         if (count > options.length){
//             throw "not enough unique treasures in getRandomTreasureTypes";
//         }
//         const randomTreasureTypes = [] as typeof Treasure[];
//         for (let i = 0; i < count; ++i){
//             const randomIndex = Math.floor(Math.random() * options.length);
//             const randomTreasureType = options[randomIndex];
//             randomTreasureTypes.push(randomTreasureType);
//             options = options.filter(option => option !== randomTreasureType);
//         }
//         return randomTreasureTypes;
//     }

//     // Generate and return a set of platform defined by the 
//     // layout string.
//     private generatePlatforms(layout: string, stage: Stage): Platform[]{
//         const platforms = [] as Platform[];
//         const lines = layout.split('\n');
//         const measurements = lines[0].split(' ');
//         const width = parseInt(measurements[0]);
//         const height = parseInt(measurements[1]);
//         let x = 0;
//         let y = 0;
//         const xIncrement = 25;
//         const yIncrement = 25;
//         // loop height
//         for(var i = 1; i < height + 1; ++i){
//             x = 0;
//             // loop width
//             for(var k = 0; k < width; ++k){
//                 const platformDelimeter = lines[i][k]
//                 if (platformDelimeter === "0") {
//                     x += xIncrement
//                     continue;
//                 };
//                 platforms.push(this.createPlatform(stage, platformDelimeter, x, y, xIncrement, yIncrement));
//                 x += xIncrement;
//             }
//             y += yIncrement;
//         }
//         return platforms;
//     }

//     // Return a Platform object with given x, y coords and given width and height
//     // Platform type returned is based on delimter passed in
//     private createPlatform(stage: Stage, delimeter: string, x: number, y: number, width: number, height: number): Platform {
//         let platform: Platform;
//         switch(delimeter){
//             case("1"):
//                 platform = new DefaultPlatform(this.loader, stage, x, y, width, height);
//                 break;
//             case("G"):
//                 platform = new GrassPlatform(this.loader, stage,x, y, width, height);
//                 break;
//             case("D"):
//                 platform = new DirtPlatform(this.loader, stage, x, y, width, height);
//                 break;
//             case("R"):
//                 platform = new RedGrassPlatform(this.loader, stage, x, y, width, height);
//                 break;
//             case("S"):
//                 platform = new SandRockPlatform(this.loader, stage, x, y, width, height);
//                 break;
//             default:
//                 throw('unhandled delimter in stage manager');
//         }
//         return platform;
//     }
// }
