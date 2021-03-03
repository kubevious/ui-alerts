import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { AlertView } from '../src';

const clickDn = (dn: string) => {
    console.log('dn :>> ', dn);
};

const openRule = (ruleName: string) => {
    console.log('ruleName :>> ', ruleName);
};

const alert = {
    source: {
        id: '1',
        kind: '2',
    },
    msg: 'test',
    severity: 'test',
};

function renderAlertView() {
    return render(<AlertView alerts={[alert]} clickDn={clickDn} openRule={openRule} />);
}

describe('AlertView', () => {
    test('Should check that the component AlertView is rendered', async () => {
        const { findByTestId } = renderAlertView();

        const copyClipboard = await findByTestId('alert-view');

        expect(copyClipboard);
    });
});
