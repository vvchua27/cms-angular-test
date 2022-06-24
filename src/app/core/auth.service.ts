import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from './local-storage-service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    userInfo = new BehaviorSubject(null);
    user = this.userInfo.asObservable();

    constructor(
        private Router: Router, 
        private LocalStorageService: LocalStorageService
    ) {
        if (this.getUserInfo()) {
            this.userInfo.next(this.getUserInfo());
        }
    }

    isLoggedIn() {
        return localStorage.getItem('user') !== null;
    }

    getUserInfo() {

        const jsonData:any = this.LocalStorageService.getData('user');
        
        return JSON.parse(jsonData);
    }
}