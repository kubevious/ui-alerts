import React, { FC, Fragment, ReactNode, useState } from 'react';
import cx from 'classnames';
import { sortSeverity, uniqueMessages, uniqueObjects } from '../utils';
import { DnLink, ScrollbarComponent, ToggleGroup } from '@kubevious/ui-components';
import { MyAlert } from '../types';
import styles from './styles.module.css';
import { SeverityIcon } from '@kubevious/ui-components';
import { SeverityType } from '@kubevious/ui-components/dist/SeverityIcon/types';

export const NO_GROUP = 'No Group';
export const OBJECT_GROUP = 'Group by Object';
export const MESSAGE_GROUP = 'Group by Alert';

export interface AlertViewProps {
    alerts: MyAlert[];
    openRule?: (ruleName: string) => void;
    groupPreset?: string;
    hideGroupSelector?: boolean;
}

export const AlertView: FC<AlertViewProps> = ({ alerts, openRule, groupPreset, hideGroupSelector }) => {
    const [group, setGroup] = useState<string>(groupPreset || NO_GROUP);

    const clickMessage = (alert: MyAlert): void => {
        if (alert.source.kind === 'rule' && alert.source.id) {
            if (openRule) {
                openRule(alert.source.id);
            }
        }
    };

    const renderAlertMsg = (alert : MyAlert, index: number) => {
        return <div key={index}
            className={cx(styles.messageContainer, styles.fullWidth, {
                [styles.rule]: alert.source.kind === 'rule',
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

        return <div className={styles.alertTable}>
            { alerts.map((alert, index) => <Fragment key={index}>

             
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
                        <SeverityIcon severity={(message.severity as SeverityType)} />
                    </div>
                    {message.msg}
                </div>

                <div className={styles.messageObjects}>
                    {message.alerts.map((alert, i2) => (alert.dn ? renderDnParts(alert.dn, i2) : null))}
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
                        <div className={styles.objectContainer}>{object.dn && renderDnParts(object.dn, 0)}</div>

                        <div className={styles.messageObjects}>
                            {object.alerts.map((alert, i2) => renderAlertMsg(alert, i2))}
                        </div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div data-testid="alert-view" className={styles.alertViewContainer}>
            <div className={`${styles.alerts} group-${group}`}>
                <ScrollbarComponent>
                    {group === NO_GROUP && renderNoGroup()}

                    {group === MESSAGE_GROUP && renderMessageGroup()}

                    {group === OBJECT_GROUP && renderObjectGroup()}
                </ScrollbarComponent>
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
