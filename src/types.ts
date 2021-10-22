export type MyAlert = {
    source: {
        id?: string;
        kind: string;
    };
    msg: string;
    severity: string;
    id?: string;
    dn?: string;
};

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
