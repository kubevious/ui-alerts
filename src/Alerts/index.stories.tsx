import { app } from '@kubevious/ui-framework';
import { Story } from '@storybook/react';
import React from 'react';
import { Alerts } from './';
import { CallbackHook } from '@kubevious/ui-components';

export default {
    title: 'Alerts',
    component: Alerts
};

export const Default: Story = () => {
    return <>
        <CallbackHook
            setup={() => {
                app.sharedState.set("selected_dn", "root/ns-[kube-system]")
                app.sharedState.set("selected_object_alerts", ALERTS)
            }}
            cleanup={() => {
                app.sharedState.set("selected_dn", null)
                app.sharedState.set("selected_object_alerts", null)
            }}
            />
        <div style={{ background: '#1e1e1e' }}>
            <Alerts />
        </div>
    </>;
};

export const NoObjectSelected: Story = () => {
    app.sharedState.set("selected_dn", null)
    app.sharedState.set("selected_object_alerts", null)

    return <>
        <CallbackHook
            setup={() => {
                app.sharedState.set("selected_dn", null)
                app.sharedState.set("selected_object_alerts", null)
            }}
            cleanup={() => {
                return
            }}
            />
        <div style={{ background: '#1e1e1e', height: '300px' }}>
            <Alerts />
        </div>
    </>;
};


export const NoAlerts: Story = () => {
    return <>
        <CallbackHook
            setup={() => {
                app.sharedState.set("selected_dn", "root/ns-[kube-system]")
                app.sharedState.set("selected_object_alerts", [])
            }}
            cleanup={() => {
                app.sharedState.set("selected_dn", null)
                app.sharedState.set("selected_object_alerts", null)
            }}
            />
        <div style={{ background: '#1e1e1e', height: '200px' }}>
            <Alerts />
        </div>
    </>;
};

export const ListWithScroll: Story = () => {
    return <>
        <CallbackHook
            setup={() => {
                app.sharedState.set("selected_dn", "root/ns-[kube-system]")
                app.sharedState.set("selected_object_alerts", ALERTS)
            }}
            cleanup={() => {
                app.sharedState.set("selected_dn", null)
                app.sharedState.set("selected_object_alerts", null)
            }}
            />
        <div style={{ background: '#1e1e1e', height: '70px' }}>
            <Alerts />
        </div>
    </>;
};

const ALERTS = [
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