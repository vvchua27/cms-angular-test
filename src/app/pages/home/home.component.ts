import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth.service';
import { LocalStorageService } from 'src/app/core/local-storage.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private Router: Router,
        private AuthService: AuthService,
        private LocalStorageService: LocalStorageService
    ) { }

    ngOnInit() {
        
    }
}
