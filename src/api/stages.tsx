import { JONES_API_URL } from "../types/constants";
import { StageTemplate } from "../types/interfaces";

export const getStages = async (): Promise<StageTemplate[]> => {
    const response = await fetch(`${JONES_API_URL}/stages`)
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