
import { Platform } from "../platform";
import { PlatformTemplate, StageTemplate } from "./stage_template";

export class TemplateHelper {

    template: StageTemplate;

    constructor(){  
        this.template = {
            platforms: [],
            enemies: []
        } as StageTemplate;
    }

    addPlatform = (platform: Platform) => {
        console.log('adding this ');
        console.log(platform);
        const platformTemplate = {
            x: platform.x,
            y: platform.y,
            type: typeof Platform
        } as PlatformTemplate;
        this.template.platforms.push(platformTemplate);
        console.log(this.template.platforms)
    }


}