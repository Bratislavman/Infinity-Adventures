import {vue} from "@/main";
import {TextType} from "@/constants/constants";

export const valueNotLesOne = (value: number) => {
    return value < 1 ? 1 : value;
}

export const scaleValue = (number: number, inMin: number, inMax: number, outMin: number, outMax: number, round: boolean = true) => {
    const val = (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    if (round) {
        return Math.round(val);
    }
    return val;
}

export const timeInMinutes = (millis: number) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    // @ts-ignore
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const randomArrayElement = (arr: any[]) => {
    return arr[Math.floor(Math.random()*arr.length)];
}


//title description не стринг, т.к они могут быть с доп значениями, то есть должнны формироваться заранее
export const activInfo = (keyReload: string, title: TextType, description: TextType, counter: number = 0) => {
    if (counter > 0) {
        return vue.$t(keyReload, {title, description, counter});
    }
    return vue.$t('title_description', {title, description});
}
export const spellActiveInfo = (title: TextType, description: TextType, counter: number = 0) => {
    return activInfo('title_description_for_active_spell', title, description, counter);
}
export const spellPassiveInfo = (title: TextType, description: TextType, counter: number = 0) => {
    return activInfo('title_description_for_passive_spell', title, description, counter);
}
export const itemInfo = (title: TextType, description: TextType, counter: number = 0) => {
    return activInfo('title_description_for_item', title, description, counter);
}