import _ from 'the-lodash';
import React, { FC, Fragment, ReactNode, useState } from 'react';
import cx from 'classnames';
import { sortSeverity } from '../utils';
import { DnLink, ScrollbarComponent, ToggleGroup } from '@kubevious/ui-components';
import { MyAlert } from '../types';
import styles from './styles.module.css';
import { SeverityIcon } from '@kubevious/ui-components';
import { SeverityType } from '@kubevious/ui-components/dist/SeverityIcon/types';
import { useSharedState } from '@kubevious/ui-framework';
import { Alert, AlertSourceKind, AlertRuleSource } from '@kubevious/ui-middleware';

export const NO_GROUP = 'No Group';
export const OBJECT_GROUP = 'Group by Object';
export const MESSAGE_GROUP = 'Group by Alert';


export interface AlertViewProps {
    alerts: MyAlert[];
    groupPreset?: string;
    hideGroupSelector?: boolean;
    skipScrollbar?: boolean;
}

export const AlertView: FC<AlertViewProps> = ({ alerts, groupPreset, hideGroupSelector, skipScrollbar }) => {
    const [group, setGroup] = useState<string>(groupPreset || NO_GROUP);

    alerts = alerts ?? [];

    const sharedState = useSharedState();

    const openRule = (ruleName: string) => {
        sharedState!.set('rule_editor_selected_rule_id', ruleName);
        sharedState!.set('rule_editor_is_new_rule', null);
        sharedState!.set('focus_rule_editor', true);
    }

    const clickMessage = (alert: MyAlert): void => {
        if (alert.source) {
            if (alert.source.kind === AlertSourceKind.rule) {
                const ruleName = (alert.source as AlertRuleSource).id;
                if (ruleName) {
                    openRule(ruleName);
                }
            }
        }
    };

    const renderAlertMsg = (alert : MyAlert, index: number) => {
        return <div key={index}
            className={cx(styles.messageContainer, styles.fullWidth, {
                [styles.rule]: alert.source?.kind === 'rule',
            })}            
            onClick={() => clickMessage(alert)}
        >
            <div className={styles.alertIcon}>
                <SeverityIcon severity={(alert.severity as SeverityType)} />
            </div>
            {alert.msg}
        </div>
    }

    const renderDnParts = (dn: string, index: number): ReactNode => {

        return <Fragment key={index}>
            <DnLink dn={dn} size='xs'>
            </DnLink>
        </Fragment>;

    };


    const renderNoGroup = (): ReactNode => {

        // const myAlerts = alerts.sort(sortSeverity);

        return <div className={styles.alertTable}>
            {alerts.map((alert, index) => <Fragment key={index}>

                <div
                    className={cx(styles.alertDetail, {
                        [styles.even]: index && index % 2 !== 0,
                    })}
                >
                    {renderAlertMsg(alert, 0)}
                </div>   

                <div
                    className={cx(styles.alertDetail, {
                        [styles.even]: index && index % 2 !== 0,
                    })}
                    >
                    {alert.dn && renderDnParts(alert.dn, 0)}
                </div>  

            </Fragment>)}
        </div>

    }

    const renderMessageGroup = (): ReactNode => {

        const alertInfoDict : Record<string, Alert> = {};

        const alertsDict = 
            _.groupBy(alerts, x => {
                const alert : Alert = {
                    id: x.id,
                    source: x.source,
                    msg: x.msg,
                    severity: x.severity,
                };
                const key = _.stableStringify(alert);
                if (!alertInfoDict[key]) {
                    alertInfoDict[key] = alert
                }
                return key;
            });

        const alertKeys = _.keys(alertsDict).sort((kA, kB) => {
            return sortSeverity(alertInfoDict[kA], alertInfoDict[kB]);
        });

        return alertKeys.map((alertKey) => {

            const alert = alertInfoDict[alertKey];
            const myAlerts = alertsDict[alertKey];
            
            return (
                <div className={styles.groupContainer} key={alertKey}>
                    <div
                        className={cx(styles.messageContainer, {
                            [styles.rule]: alert.source?.kind === AlertSourceKind.rule,
                        })}
                        onClick={() => clickMessage(alert)}
                    >
                        <div className={styles.alertIcon}>
                            <SeverityIcon severity={(alert.severity as SeverityType)} />
                        </div>
                        {alert.msg}
                    </div>

                    <div className={styles.messageObjects}>
                        {myAlerts.map((alert, i2) => (alert.dn ? renderDnParts(alert.dn, i2) : null))}
                    </div>
                </div>
            )
        });
    };

    const renderObjectGroup = (): ReactNode => {

        const alertsDict = 
            _.groupBy(alerts, x => {
                return x.dn;
            });

        const objectAlertsDict : Record<string, Alert[]> = {};
        for(const dn of _.keys(alertsDict))
        {
            objectAlertsDict[dn] = alertsDict[dn].sort(sortSeverity);
        }

        return (
            <>
                {_.keys(objectAlertsDict).map((dn) => {
                    const alerts = objectAlertsDict[dn];
                    return (
                        <div className={styles.groupContainer} key={dn}>
                            <div className={styles.objectContainer}>{dn && renderDnParts(dn, 0)}</div>

                            <div className={styles.messageObjects}>
                                {alerts.map((alert, i2) => renderAlertMsg(alert, i2))}
                            </div>
                        </div>
                    )
                })}
            </>
        );
    };

    const renderContent = () => {
        return <>
            {group === NO_GROUP && renderNoGroup()}
            {group === MESSAGE_GROUP && renderMessageGroup()}
            {group === OBJECT_GROUP && renderObjectGroup()}
        </>;
    }

    return (
        <div data-testid="alert-view" className={styles.alertViewContainer}>
            <div className={`${styles.alerts} group-${group}`}>

                {!skipScrollbar && 
                    <ScrollbarComponent>
                        {renderContent()}
                    </ScrollbarComponent>}

                {skipScrollbar && 
                    renderContent()}
                    
            </div>

            {!hideGroupSelector && <>
                <div className={styles.groupOptions}>
                    <ToggleGroup
                        items={[ NO_GROUP, OBJECT_GROUP, MESSAGE_GROUP ]}
                        selectedItem={group}
                        onSelectionChange={(x) => setGroup(x)}
                        >
                    </ToggleGroup>
                </div>
            </>}

        </div>
    );
};
