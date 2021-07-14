import { app } from '@kubevious/ui-framework';
import { Story } from '@storybook/react';
import React from 'react';
import { SeverityIcon } from '../';

export default {
    title: 'SeverityIcon',
};

export const Warning: Story = () => {
    return <>
        <div style={{ background: '#1e1e1e' }}>
            <SeverityIcon severity="warn" />
        </div>
    </>;
};

export const Error: Story = () => {
    return <>
        <div style={{ background: '#1e1e1e' }}>
            <SeverityIcon severity="error" />
        </div>
    </>;
};


export const ExtryStyle: Story = () => {
    return <>
        <div style={{ background: '#1e1e1e' }}>
            <SeverityIcon severity="error" extraStyles={{}} />
        </div>
    </>;
};
