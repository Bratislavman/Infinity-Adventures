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

const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
}

export const timeInMinutes = (milliseconds: number) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
        seconds,
    )}`;
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