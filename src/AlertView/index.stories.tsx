import { Story } from '@storybook/react';
import React from 'react';
import { AlertView } from './';
import { ALERTS } from '../../test/mock/alerts';

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
