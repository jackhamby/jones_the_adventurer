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