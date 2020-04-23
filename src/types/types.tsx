import { UnitStateNames, UnitArmorNames, UnitPartNames, UnitStatisticNames, UnitAttributeNames, ProjectileAttributeNames } from "./enums"
import { Part } from "../classes/part"

export type UnitStates = {
    [key in UnitStateNames]: any;
}

export type UnitArmors = {
    [key in UnitArmorNames]: any;
}

export type UnitParts = {
    [key in UnitPartNames]: UnitArmors;
}

export type SpriteParts = {
    [key in UnitPartNames]: Part;
}

export type UnitStatistics = {
    [key in UnitStatisticNames]: any;
}

export type UnitAttributes = {
    [key in UnitAttributeNames]: any;
}

export type ProjectileAttributes = {
    [key in ProjectileAttributeNames]: any;
}
