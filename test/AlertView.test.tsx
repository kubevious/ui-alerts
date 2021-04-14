import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { AlertView } from '../src';

const clickDn = jest.fn();
const openRule = jest.fn();

const alert = {
    source: {
        id: '1',
        kind: '2',
    },
    msg: 'test',
    severity: 'test',
};

const renderComponent = () => render(<AlertView alerts={[alert]} clickDn={clickDn} openRule={openRule} />);

describe('AlertView', () => {
    test('Should check that the component AlertView is rendered', async () => {
        const { findByTestId } = renderComponent();

        expect(findByTestId('alert-view')).toBeTruthy();
    });
});
