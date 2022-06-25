import { FormGroup } from '@angular/forms';

export class Article {
    
  userId:any;
  id:any;
  title: string;
  body: string;

  buildArticle(form: FormGroup) {
    this.userId = form.value.userId;
    this.id = form.value.id;
    this.title = form.value.title;
    this.body = form.value.body;
  }
}
