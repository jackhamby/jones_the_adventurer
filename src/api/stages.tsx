import { JONES_API_URL } from "../types/constants";
import { StageTemplate } from "../types/interfaces";

export const getStages = async (stageName: string = null): Promise<StageTemplate[]> => {
    const query = stageName 
        ? `?name=${stageName}`
        : "";
    const response = await fetch(`${JONES_API_URL}/stages${query}`)
    const stages = await response.json()
    return stages;
}

export const saveStage = async (stageData: StageTemplate): Promise<boolean> => {
    const response = await fetch(`${JONES_API_URL}/stages`, {
        method: "POST", 
        body: JSON.stringify(stageData),
        headers: {
            "Content-Type": "application/json"
        }
      });

      if (response.ok){
          return true;
      }
      return false;
}