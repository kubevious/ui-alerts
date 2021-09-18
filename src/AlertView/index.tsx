import React, { FC, ReactNode, useState } from 'react';
import cx from 'classnames';
import { sortSeverity, uniqueMessages, uniqueObjects } from '../utils';
import { DnLink, ToggleGroup } from '@kubevious/ui-components';
import { Alert } from '../types';
import styles from './styles.module.css';
import { SeverityIcon } from '..';

const NO_GROUP = 'No Group';
const OBJECT_GROUP = 'Group by Object';
const MESSAGE_GROUP = 'Group by Alert';

export interface AlertViewProps {
    alerts: Alert[];
    openRule?: (ruleName: string) => void;
    groupPreset?: string;
}

export const AlertView: FC<AlertViewProps> = ({ alerts, openRule, groupPreset }) => {
    const [group, setGroup] = useState<string>(groupPreset || NO_GROUP);

    const clickMessage = (alert: Alert): void => {
        if (alert.source.kind === 'rule' && alert.source.id) {
            if (openRule) {
                openRule(alert.source.id);
            }
        }
    };

    const renderAlert = ({
        alert,
        index,
        shouldRenderDn = true,
    }: {
        alert: Alert;
        index?: number;
        shouldRenderDn?: boolean;
    }): ReactNode => (
        <div
            className={cx(styles.alertDetail, {
                [styles.even]: index && index % 2 !== 0,
            })}
            key={alert.uiKey || index}
        >
            <div
                className={cx(styles.messageContainer, styles.fullWidth, {
                    [styles.rule]: alert.source.kind === 'rule',
                })}
                onClick={() => clickMessage(alert)}
            >
                <div className={styles.alertIcon}>
                   <SeverityIcon severity={alert.severity} />
                </div>
                {alert.msg}
            </div>

            {shouldRenderDn && alert.dn && renderDnParts(alert.dn)}
        </div>
    );

    const renderDnParts = (dn: string): ReactNode => {

        return <>
            <DnLink dn={dn} size='xs'>
            </DnLink>
        </>;

    };


    const renderNoGroup = (): ReactNode => {

        return <>
            {alerts.map((alert, index) => renderAlert({ alert, index }))}
        </>

    }

    const renderMessageGroup = (): ReactNode => {
        const messages = uniqueMessages(
            alerts.map(({ msg, severity, source }) => ({
                msg,
                severity,
                source,
            })),
        )
            .map((m) => ({
                ...m,
                alerts: alerts.filter((a) => a.severity === m.severity && a.msg === m.msg),
            }))
            .sort(sortSeverity);

        return messages.map((message, index) => (
            <div className={styles.groupContainer} key={index}>
                <div
                    className={cx(styles.messageContainer, {
                        [styles.rule]: message.source.kind === 'rule',
                    })}
                    onClick={() => clickMessage(message)}
                >
                    <div className={styles.alertIcon}>
                        <SeverityIcon severity={message.severity} />
                    </div>
                    {message.msg}
                </div>

                <div className={styles.messageObjects}>
                    {message.alerts.map((alert) => (alert.dn ? renderDnParts(alert.dn) : null))}
                </div>
            </div>
        ));
    };

    const renderObjectGroup = (): ReactNode => {
        const objects = uniqueObjects(alerts.map(({ dn }) => ({ dn }))).map((o) => ({
            ...o,
            alerts: alerts.filter((a) => a.dn === o.dn),
        }));

        return (
            <>
                {objects.map((object, index) => (
                    <div className={styles.groupContainer} key={index}>
                        <div className={styles.objectContainer}>{object.dn && renderDnParts(object.dn)}</div>

                        <div className={styles.messageObjects}>
                            {object.alerts.map((alert) => renderAlert({ alert, shouldRenderDn: false }))}
                        </div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div data-testid="alert-view" className={styles.alertViewContainer}>
            <div className={`${styles.alerts} group-${group}`}>
                {group === NO_GROUP && renderNoGroup()}

                {group === MESSAGE_GROUP && renderMessageGroup()}

                {group === OBJECT_GROUP && renderObjectGroup()}
            </div>

            {!groupPreset && <>
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
