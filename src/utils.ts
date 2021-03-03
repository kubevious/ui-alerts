import { Alert, Dn } from './types';

export const uniqueMessages = (messages: Alert[]): Alert[] => {
    let temp: Alert[] = [];

    messages?.map((item) => {
        const element = temp.find((tempI) => tempI.severity === item.severity && tempI.msg === item.msg);

        if (!element) {
            temp.push(item);
        }
    });

    return temp;
};

export const isEmptyArray = (arr: any[]): boolean => {
    // Later will be corrected on other type
    return !arr || arr.length === 0;
};

export const uniqueObjects = (objects: Dn[]): Dn[] => {
    let temp: Dn[] = [];

    objects?.map((item) => {
        const element = temp.find((tempI) => tempI.dn === item.dn);

        if (!element) {
            temp.push(item);
        }
    });

    return temp;
};

export const sortSeverity = (a: Alert, b: Alert): number => {
    if (a.severity === 'error' && b.severity === 'warn') {
        return -1;
    }

    if (a.severity === 'warn' && b.severity === 'error') {
        return 1;
    }

    return 0;
};
