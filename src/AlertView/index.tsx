import React, { FC, ReactNode, useState } from 'react';
import cx from 'classnames';
import { sortSeverity, uniqueMessages, uniqueObjects } from '../utils';
import { DnIconComponent, DnPath } from '@kubevious/ui-components';
import * as DnUtils from '@kubevious/helpers/dist/dn-utils';
import { Alert } from '../types';
import styles from './styles.module.css';
import { SeverityIcon } from '..';

const NO_GROUP = 'no';
const OBJECT_GROUP = 'object';
const MESSAGE_GROUP = 'message';

export interface AlertViewProps {
    alerts: Alert[];
    clickDn: (dn: string) => void;
    openRule: (ruleName: string) => void;
    groupPreset?: string;
}

export const AlertView: FC<AlertViewProps> = ({ alerts, clickDn, openRule, groupPreset }) => {
    const [group, setGroup] = useState<string>(groupPreset || NO_GROUP);

    const clickMessage = (alert: Alert): void => {
        if (alert.source.kind === 'rule') {
            openRule(alert.source.id);
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
        const dnParts = DnUtils.parseDn(dn).slice(1);
        const kind = dnParts.length ? dnParts[dnParts.length - 1].kind : '';

        return (
            <div className={styles.dnContainer} key={dn} onClick={() => clickDn(dn)}>
                <div className={styles.logoContainer}>
                    <DnIconComponent kind={kind} size="xs" />
                </div>
                <div className="parts-container">
                    <DnPath dnParts={dnParts} />
                </div>
            </div>
        );
    };

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
            <div className="message-group-container" key={index}>
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
                    <div className="message-group-container" key={index}>
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
                {group === NO_GROUP && <>{alerts.map((alert, index) => renderAlert({ alert, index }))}</>}

                {group === MESSAGE_GROUP && renderMessageGroup()}

                {group === OBJECT_GROUP && renderObjectGroup()}
            </div>

            {!groupPreset && (
                <div className={styles.groupOptions}>
                    <div
                        className={cx(styles.option, { [styles.selected]: group === NO_GROUP })}
                        onClick={() => setGroup(NO_GROUP)}
                    >
                        No Group
                    </div>

                    <div
                        className={cx(styles.option, {
                            [styles.selected]: group === OBJECT_GROUP,
                        })}
                        onClick={() => setGroup(OBJECT_GROUP)}
                    >
                        Group by Object
                    </div>

                    <div
                        className={cx(styles.option, {
                            [styles.selected]: group === MESSAGE_GROUP,
                        })}
                        onClick={() => setGroup(MESSAGE_GROUP)}
                    >
                        Group by Alert
                    </div>
                </div>
            )}
        </div>
    );
};
