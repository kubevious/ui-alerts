import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { Alerts } from '../src';

function renderAlertView() {
    return render(<Alerts />);
}

describe('Alerts', () => {
    test('Should check that the component Alerts is rendered', async () => {
        const { findByTestId } = renderAlertView();

        const copyClipboard = await findByTestId('alerts');

        expect(copyClipboard);
    });
});
