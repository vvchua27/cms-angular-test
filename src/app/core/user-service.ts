import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private Router: Router, private HttpClient: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(null);
        this.user = this.userSubject.asObservable();
    }

    getUsers() {
        return this.HttpClient.get(`${environment.jsonPlaceHolderUrl}users`);
    }

    loggedIn(user: any) {
        this.userSubject.next(user);
    }

    loadUser() {
        return this.user;
    }
}