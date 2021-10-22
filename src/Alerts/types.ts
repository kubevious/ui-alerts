import { MyAlert } from '../types';

export interface AlertsState {
    alerts: MyAlert[];
    isDnSelected: boolean;
    allowVerticalScroll?: boolean;
}