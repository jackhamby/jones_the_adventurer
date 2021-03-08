import { JONES_API_URL } from "../types/constants";

export const getStages = async () => {
    const response = await fetch(`${JONES_API_URL}/stages`)
    const stages = await response.json()
    // console.log(stages)
    return stages;
}