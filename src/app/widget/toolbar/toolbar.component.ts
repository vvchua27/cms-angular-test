import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth.service';
import { LocalStorageService } from 'src/app/core/local-storage-service';

@Component({
  selector: 'toolbar-widget',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    constructor(
        private Router: Router,
        private AuthService: AuthService,
        private LocalStorageService: LocalStorageService
    ) { }

    user: any = {};

    ngOnInit() {
        this.AuthService.user.subscribe((item:any) => {
            let decodedUser = JSON.parse(item);

            this.user = decodedUser[0];
        });
    }

    logout() {

        this.LocalStorageService.removeAllData();
        this.Router.navigate(['/login']);
    }
}
