import React, { FC } from 'react';
import styles from './styles.module.css';

export interface SeverityIconProps {
    severity: string;
}

export const SeverityIcon: FC<SeverityIconProps> = ({ severity }) => {
   
    return <>
        <div className={`${styles.alertItem} ${styles[severity]}`}>
        </div>
    </>
};
