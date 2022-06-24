import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth.service';
import { LocalStorageService } from 'src/app/core/local-storage-service';

@Component({
  selector: 'listing-widget',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

    constructor(
        private Router: Router,
        private AuthService: AuthService,
        private LocalStorageService: LocalStorageService
    ) { }

    user: any = {};

    ngOnInit() {
    }
}
