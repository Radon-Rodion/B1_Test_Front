import { IImageModel } from "./Interfaces";


export const formatDate = (date: Date | string | undefined, format: string) => {

    if (!date) return '';
    if(typeof date == 'string' && (!isValidDate(new Date(date)) || date.length == format.length) ) return date;
    const firstVal = date;
    date = new Date(date);
    let tempValue = new String(format);
    tempValue = tempValue.replace('yyyy', date?.getFullYear()?.toString() ?? '');
    tempValue = tempValue.replace('mm', ((date?.getMonth() ?? 0) + 1)?.toString()?.padStart(2, '0'));
    tempValue = tempValue.replace('dd', date?.getDate()?.toString()?.padStart(2, '0') ?? '');
    return tempValue;
}

export const isValidDate = (date: any) => {
    return date instanceof Date && !isNaN(date.valueOf());
}

export const doublicateTimeZone = (date: Date) => {
    if(date == undefined) return;
    if(date instanceof Date)
        return new Date(date?.getTime() - new Date().getTimezoneOffset() * 60000)
}

export const toDate = (str: string, format: string) => {
    if (!str) return undefined;
    try {
        const res = new Date(0, 0, 0, 0, -new Date().getTimezoneOffset(), 0, 0);
        res.setDate(1); //not every month has 31 day

        for (let i = 0; i < format.length - 1; i++) {
            //console.log(i, res, format, str);
            if (format[i] == 'd' && format[i + 1] == 'd') {
                res.setDate(+str.substring(i, i + 2));
                i++;
                continue;
            }
            if (format[i] == 'm' && format[i + 1] == 'm') {
                res.setMonth(+str.substring(i, i + 2) - 1);
                i++;
                continue;
            }
            if (format[i] == 'y' && format[i + 1] == 'y' && format[i + 2] == 'y' && format[i + 3] == 'y') {
                res.setFullYear(+str.substring(i, i + 4));
                i += 3;
                continue;
            }
            if (format[i] == 'y' && format[i + 1] == 'y' && format[i + 2] == 'y') {
                res.setFullYear(+str.substring(i, i + 3) + 1900);
                i += 2;
                continue;
            }
            if (format[i] == 'y' && format[i + 1] == 'y') {
                res.setFullYear(+str.substring(i, i + 2) + 1900);
                i++;
                continue;
            }
        }
        return res;
    } catch (e) {
        console.error(e);
        throw new Error(`Can not transform ${str} with format ${format} to date!`);
    }
}

export const getImage = (images: IImageModel) => {
    const noImage = 'No image';
    if(images?.jpg != undefined){
        return images.jpg.large_image_url ?? images.jpg.image_url ?? images.jpg.small_image_url ?? noImage;
    }
    if(images?.webp != undefined){
        return images.webp.large_image_url ?? images.webp.image_url ?? images.webp.small_image_url ?? noImage;
    }
    return noImage;
}

export const tryStrToInt = (str: string) => {
    return isNaN(+str) ? str : +str;
}

export const clamp = (str: any, clampSize = Number.POSITIVE_INFINITY) => {
    if (typeof (str) != 'string' || str.length < clampSize) return str;

    return `${str.substring(0, clampSize)}...`;
}

export const validatePageNumber = (num: number) => {
    if(num <= 0) return 1;
    return num;
}