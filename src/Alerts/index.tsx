import _ from 'the-lodash';
import React from 'react';
import { ClassComponent } from '@kubevious/ui-framework';
import { AlertView } from '../AlertView';
import { isEmptyArray } from '../utils/utils';
import cx from 'classnames';

import styles from './styles.module.css';

import { MyAlert } from '../types';
import { AlertsState } from './types';

export interface AlertsProps {

}

export class Alerts extends ClassComponent<AlertsProps, AlertsState> {
    constructor(props: AlertsProps | Readonly<AlertsProps>) {
        super(props);

        this.state = {
            alerts: [],
            isDnSelected: false,
        };
    }

    componentDidMount(): void {
        this.subscribeToSharedState('selected_object_alerts', (selected_object_alerts: MyAlert[]) => {
            this.setState({ alerts: selected_object_alerts });
        });
        this.subscribeToSharedState('selected_dn', (selected_dn: string) => {
            this.setState({ isDnSelected: _.isNotNullOrUndefined(selected_dn) });
        });
    }

    renderAlerts(alerts: MyAlert[]): JSX.Element {
        if (isEmptyArray(alerts)) {
            return <div className={styles.empty}>No alerts for selected object.</div>
        }
        return <AlertView alerts={alerts} />;
    }

    render() {
        const { alerts, isDnSelected } = this.state;
        return (
            <div data-testid="alerts" id="alertsComponent" className={cx(styles.alertsComponent, { [styles.empty]: isEmptyArray(alerts) })}>
                { isDnSelected && this.renderAlerts(alerts) }

                { !isDnSelected && <>
                    <div className={styles.empty}>No object selected.</div>
                </> }
            </div>
        );
    }
}
