import { Alert } from '@kubevious/ui-middleware';

export interface MyAlert extends Alert {
    dn?: string;
}

export type Dn = {
    dn?: string;
    alertCount?: AlertCount;
    title?: string;
    alert?: MyAlert;
    unit?: string;
    value?: number;
    targets?: string[];
};

export type AlertCount = {
    error?: number;
    warn?: number;
};
