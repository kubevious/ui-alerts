import { Story } from '@storybook/react';
import React from 'react';
import { AlertView } from './';
import { MyAlert } from '../types';

export default {
    title: 'AlertView',
    component: AlertView
};

export const Default: Story = () => {
    return <>
        <div style={{ background: '#999999' }}>

            <div style={{ background: '#1e1e1e', margin: "25px" }}>
                <AlertView alerts={ALERTS} />
            </div>

            <div style={{ background: '#1e1e1e', margin: "25px", width: "600px"}}>
                <AlertView alerts={ALERTS} />
            </div>
        </div>
    </>;
};

const ALERTS : MyAlert[] = [
    {
        dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]',
        id: 'Ready-2019-12-27T19:47:59Z',
        msg: 'Rule container-memory-usage failed. Memory request is not set.',
        severity: 'error',
        source: {
            kind: 'rule',
            id: 'rule 2',
        },
    },
    {
        dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]',
        id: 'PodScheduled-2019-12-27T19:47:53Z',
        msg: 'Could not find apps matching selector.',
        severity: 'error',
        source: { kind: 'parser' },
    },
    {
        dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]',
        id: 'Initialized-2019-12-27T19:47:53Z',
        msg: 'Memory usage warning',
        severity: 'warn',
        source: { kind: 'rule', id: 'rule 1' },
    },
    {
        dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]',
        id: 'ContainersReady-2019-12-27T19:47:59Z',
        msg: 'Memory usage warning',
        severity: 'warn',
        source: { kind: 'parser' },
    },
]