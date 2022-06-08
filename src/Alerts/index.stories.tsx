import { app } from '@kubevious/ui-framework';
import { Story } from '@storybook/react';
import React from 'react';
import { Alerts } from './';
import { CallbackHook } from '@kubevious/ui-components';

import { ALERTS } from '../../test/mock/alerts';

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
