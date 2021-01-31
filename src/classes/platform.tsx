
import * as PIXI from 'pixi.js';
import { Sprite } from './sprite';
import { Stage } from './stage/stage';

export interface PlatformTextures {
    [key: string]: PIXI.Texture;
}

export class Platform extends Sprite{

    static imageUrl = "/images/platforms/default-platform";
    pixiSprite: PIXI.Sprite;
    textures: PlatformTextures;
    currentStage: Stage;

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y:number, width: number, height: number){
        super(loader ,x, y, width, height, 0, 0);
        this.loader = loader;
        this.currentStage = stage;
        this.textures = this.initializeTextures();
        this.pixiSprite = this.createPixiSprite();
        this.pixiSprite.x = x;
        this.pixiSprite.y = y;
        this.pixiSprite.width = width;
        this.pixiSprite.height = height;
    }

    createPixiSprite(): PIXI.Sprite {
        return {} as PIXI.Sprite;
    }

    initializeTextures(): PlatformTextures {
        return {} as PlatformTextures;
    }

    add(){
        this.currentStage.viewport.addChild(this.pixiSprite);
    }

    remove(){
        this.currentStage.viewport.removeChild(this.pixiSprite);
    }
}



export class DefaultPlatform extends Platform {
    static imageUrl = "/images/platforms/platform1.png";

    createPixiSprite(): PIXI.Sprite {
        return new PIXI.Sprite(this.textures.default); 
    }

    initializeTextures(): PlatformTextures{
        return {
            default: this.loader.resources["default-platform"].texture,
        } as PlatformTextures;
    }
}

export class DirtPlatform extends Platform {
    static imageUrl = "/images/platforms/dirt.png";

    createPixiSprite(): PIXI.Sprite {
        return new PIXI.Sprite(this.textures.default); 
    }

    initializeTextures(): PlatformTextures{
        return {
            default: this.loader.resources["dirt-platform"].texture,
        } as PlatformTextures;
    }
}
export class GrassPlatform extends Platform {
    static imageUrl = "/images/platforms/grass.png";

    createPixiSprite(): PIXI.Sprite {
        return new PIXI.Sprite(this.textures.default); 
    }

    initializeTextures(): PlatformTextures{
        return {
            default: this.loader.resources["grass-platform"].texture,
        } as PlatformTextures;
    }
}
export class RedGrassPlatform extends Platform {
    static imageUrl = "/images/platforms/red_grass.png";

    createPixiSprite(): PIXI.Sprite {
        return new PIXI.Sprite(this.textures.default); 
    }

    initializeTextures(): PlatformTextures{
        return {
            default: this.loader.resources["red-grass-platform"].texture,
        } as PlatformTextures;
    }
}
export class SandRockPlatform extends Platform {
    static imageUrl = "/images/platforms/sand_rock.png";

    createPixiSprite(): PIXI.Sprite {
        return new PIXI.Sprite(this.textures.default); 
    }

    initializeTextures(): PlatformTextures{
        return {
            default: this.loader.resources["sand-rock-platform"].texture,
        } as PlatformTextures;
    }
}

