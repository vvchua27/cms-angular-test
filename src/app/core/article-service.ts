import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ArticleService {

    constructor(private HttpClient: HttpClient) {}

    getPosts() {
        return this.HttpClient.get(`${environment.jsonPlaceHolderUrl}posts`);
    }
}