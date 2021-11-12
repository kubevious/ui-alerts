import _ from 'the-lodash';
import React from 'react';
import { ClassComponent } from '@kubevious/ui-framework';
import { app } from '@kubevious/ui-framework';
import { AlertView } from '../AlertView';
import { isEmptyArray, sortSeverity } from '../utils';
import cx from 'classnames';

import styles from './styles.module.css';

import { MyAlert } from '../types';
import { AlertsState } from './types';

const sharedState = app.sharedState;

export interface Props {

}

export class Alerts extends ClassComponent<Props, AlertsState> {
    constructor(props: Props | Readonly<Props>) {
        super(props);

        this.state = {
            alerts: [],
            isDnSelected: false,
        };

        this.openRule = this.openRule.bind(this);
    }

    componentDidMount(): void {
        this.subscribeToSharedState('selected_object_alerts', (selected_object_alerts: MyAlert[]) => {
            this.setState({ alerts: selected_object_alerts });
        });
        this.subscribeToSharedState('selected_dn', (selected_dn: string) => {
            this.setState({ isDnSelected: _.isNotNullOrUndefined(selected_dn) });
        });
    }

    openRule(ruleName: string): void {
        sharedState.set('rule_editor_selected_rule_id', ruleName);
        sharedState.set('rule_editor_new_rule', null);
        sharedState.set('focus_rule_editor', true);
    }

    renderAlerts(alerts: MyAlert[]): JSX.Element {
        if (isEmptyArray(alerts)) {
            return <div className={styles.empty}>No alerts for selected object.</div>
        }
        return <AlertView alerts={alerts.sort(sortSeverity)} openRule={this.openRule} />;
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
