import React, { FC } from 'react';
import styles from './styles.module.css';
import cx from 'classnames';

export interface SeverityIconProps {
    severity: string;
    extraStyles: string | string[] | { [key: string]: any };
}

export const SeverityIcon: FC<SeverityIconProps> = ({ severity, extraStyles }) => {
   
    return <>
        <div className={cx(styles.alertItem, styles[severity], extraStyles)} >
        </div>
    </>
};



