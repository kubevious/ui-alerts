import { Alert } from '@kubevious/ui-middleware/dist/entities/alert';

export const isEmptyArray = (arr: any[]): boolean => {
    // Later will be corrected on other type
    return !arr || arr.length === 0;
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
