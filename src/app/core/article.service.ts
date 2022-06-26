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

    addArticle(data: any) {
      const formData = new FormData();

      formData.append('userId', data.userId);
      formData.append('title', data.title);
      formData.append('body', data.body);

      return this.HttpClient.post(`${environment.jsonPlaceHolderUrl}posts`, data);
    }

    updateArticle(data: any) {
      const formData = new FormData();
      
      formData.append('id', data.id);
      formData.append('userId', data.userId);
      formData.append('title', data.title);
      formData.append('body', data.body);
      
      return this.HttpClient.put(`${environment.jsonPlaceHolderUrl}posts/${data.id}`, data);

    }
}