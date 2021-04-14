import { app } from '@kubevious/ui-framework';
import { Story } from '@storybook/react';
import React from 'react';
import { Alerts } from '../Alerts';

export default {
    title: 'Alerts',
};

const sharedState = app.sharedState;

export const Default: Story = () => {
    sharedState.set('selected_object_alerts', [
        {
            dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]',
            id: 'Ready-2019-12-27T19:47:59Z',
            msg: 'Rule container-memory-usage failed. Memory request is not set.',
            severity: 'error',
            source: {
                kind: 'rule',
                id: 'rule 2',
            },
            uiKey:
                'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]-error-Ready-2019-12-27T19:47:59Z-Rule container-memory-usage failed. Memory request is not set.',
        },
        {
            dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]',
            id: 'PodScheduled-2019-12-27T19:47:53Z',
            msg: 'Could not find apps matching selector.',
            severity: 'error',
            source: { kind: 'parser' },
            uiKey:
                'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]-error-PodScheduled-2019-12-27T19:47:53Z-Could not find apps matching selector.',
        },
        {
            dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]',
            id: 'Initialized-2019-12-27T19:47:53Z',
            msg: 'Memory usage warning',
            severity: 'warn',
            source: { kind: 'rule', id: 'rule 1' },
            uiKey:
                'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]-warn-Initialized-2019-12-27T19:47:53Z-Memory usage warning,',
        },
        {
            dn: 'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]',
            id: 'ContainersReady-2019-12-27T19:47:59Z',
            msg: 'Memory usage warning',
            severity: 'warn',
            source: { kind: 'parser' },
            uiKey:
                'root/ns-[gitlab]/app-[gitlab-gitlab-exporter]/initcont-[configure]/image-[busybox]-warn-ContainersReady-2019-12-27T19:47:59Z-Memory usage warning',
        },
    ]);

    return (
        <div style={{ background: '#1e1e1e' }}>
            <Alerts />
        </div>
    );
};

export const Empty: Story = () => {
    sharedState.set('selected_object_alerts', []);

    return (
        <div style={{ background: '#1e1e1e' }}>
            <Alerts />
        </div>
    );
};
