import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { Alerts } from '../src';

function renderAlerts() {
    return render(<Alerts />);
}

describe('Alerts', () => {
    test('Should check that the component Alerts is rendered', async () => {
        const { findByTestId } = renderAlerts();

        const copyClipboard = await findByTestId('alerts');

        expect(copyClipboard);
    });
});
