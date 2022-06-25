import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { LocalStorageService } from 'src/app/core/local-storage.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(
        private Router: Router,
        private UserService: UserService,
        private AuthService: AuthService,
        private LocalStorageService: LocalStorageService
    ) { }

    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    users: any = {};
    user: any = {};

    isValid = true;
    errorMessage = 'Invalid username/password. Try again.';

    login() {

        this.UserService.getUsers()
            .subscribe((response: any) => {

                this.users = response;

                this.user = this.users.filter(
                    (item: any) => { 
                        return (item.username === this.loginForm.value.username) 
                    });

                if (this.user.length > 0) {

                    //for this test's purpose, we will create a password based on the user's name
                    this.addUserPassword();

                    if (this.checkPassword()) {

                        this.LocalStorageService.setData('user', JSON.stringify(this.user));
                        
                        this.UserService.loggedIn(this.user);
                        
                        this.resetForm();

                        this.Router.navigate(['']);
                        
                    } else {
                        this.isValid = false;
                    }

                } else {
                    this.isValid = false;
                }
            });
    }

    addUserPassword() {

        this.user.map((item: any) => {

            let userSegment = item.name.toLowerCase().split(' ');

            item.password = userSegment.join('');
        })
    }

    checkPassword() {
        return (this.loginForm.value.password === this.user[0].password) ? true : false;
    }

    resetForm() {
        this.loginForm.reset();
    }
}
