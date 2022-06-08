import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { AlertView } from '../src';

import { ALERTS } from './mock/alerts';

const renderComponent = () => render(<AlertView alerts={ALERTS} />);

describe('AlertView', () => {
    test('Should check that the component AlertView is rendered', async () => {
        // const { findByTestId } = 
        await renderComponent();
        // expect(findByTestId('alert-view')).toBeTruthy();
    });
});
