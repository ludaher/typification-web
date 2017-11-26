import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../model/settings/app-settings';
import { HttpClient } from '@angular/common/http';
import { } from '@angular/core/src/metadata/ng_module';

@Injectable()
export class AppSettingsService {

  constructor(public http: HttpClient) {
  }

  getSettings(): Observable<AppSettings> {
    return this.http
      .get<AppSettings>('/assets/appsettings.json');
  }
}



export function appSettingsServiceFactory(startupService: AppSettingsService): Function {
  return () => startupService.getSettings();
}

