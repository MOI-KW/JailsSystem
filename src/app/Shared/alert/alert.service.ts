import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {

    private alertSubject = new Subject<Alert>();
    private defaultId = 'default-alert';
    private optionsObj = {
        autoClose: true,
        keepAfterRouteChange: false,
        
    };

    public clearAll = new BehaviorSubject<boolean>(false);

    onAlert(id = this.defaultId): Observable<Alert> {

        return this.alertSubject.asObservable().pipe(filter(x => x && x.id === id));
    }

    success(message: string = "", options: any = this.optionsObj) {

        this.showAlert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(message: string = "", options: any = this.optionsObj) {

        this.showAlert(new Alert({ ...options, type: AlertType.Error, message}));
    }

    info(message: string = "", options: any = this.optionsObj) {

        this.showAlert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string = "", options: any = this.optionsObj) {

        this.showAlert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    nothing(message: string = "", options: any = this.optionsObj) {

        this.showAlert(new Alert({ ...options, type: AlertType.Nothing, message }));
    }

    showAlert(alert: Alert) {

        alert.id = alert.id || this.defaultId;
        this.alertSubject.next(alert);
        
    }
    hideAlerts()
    {
        this.alertSubject.next(null);
    }

    clear(id = this.defaultId) {
        this.alertSubject.next(new Alert({ id }));
    }
}