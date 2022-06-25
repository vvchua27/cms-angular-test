import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { LocalStorageService } from 'src/app/core/local-storage.service';

@Component({
  selector: 'toolbar-widget',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    constructor(
        private Router: Router,
        private UserService: UserService,
        private AuthService: AuthService,
        private LocalStorageService: LocalStorageService
    ) { }

    user: any = {};

    ngOnInit() {
        this.UserService.user.subscribe((item:any) => {

            if (item !== null) {
                this.user = item[0];
                return;
            }

            this.AuthService.user.subscribe((item:any) => {

                let decodedUser = JSON.parse(item);
                
                this.user = decodedUser[0];
            });
        });
    }

    logout() {

        this.LocalStorageService.removeAllData();
        this.Router.navigate(['/login']);
    }
}
