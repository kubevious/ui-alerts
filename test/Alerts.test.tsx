import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { Alerts } from '../src';

const renderComponent = () => render(<Alerts />);

describe('Alerts', () => {
    test('Should check that the component Alerts is rendered', async () => {
        const { findByTestId } = renderComponent();

        const result = await findByTestId('alerts');

        expect(result).toBeTruthy();
    });
});
