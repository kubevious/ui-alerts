import { MyAlert } from '../types';
import { AlertSourceKind } from '@kubevious/ui-middleware';

export const ALERTS : MyAlert[] = [
    {
        dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]',
        id: 'Ready-2019-12-27T19:47:59Z',
        msg: 'Rule container-memory-usage failed. Memory request is not set. Please setup resource request and limits in the Deployment configuration.',
        severity: 'error',
        source: {
            kind: AlertSourceKind.rule,
            id: 'rule 2',
        },
    },
    {
        dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]',
        id: 'PodScheduled-2019-12-27T19:47:53Z',
        msg: 'Could not find apps matching selector.',
        severity: 'error',
        source: { kind: AlertSourceKind.validator, id: "xxx" },
    },
    {
        dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]',
        id: 'Initialized-2019-12-27T19:47:53Z',
        msg: 'Memory usage warning',
        severity: 'warn',
        source: { kind: AlertSourceKind.rule, id: 'rule 1' },
    },
    {
        dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]',
        id: 'ContainersReady-2019-12-27T19:47:59Z',
        msg: 'Memory usage warning',
        severity: 'warn',
        source: { kind: AlertSourceKind.validator, id: "xxx" },
    },
];