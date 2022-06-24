import { FormGroup } from '@angular/forms';

export class User {
    
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  address: any = {};
  phone: any;
  website: any;
  company: any = {};

  constructor(form: FormGroup) {
    this.id = form.value.id;
    this.name = form.value.name;
    this.username = form.value.username;
    this.password = form.value.password;
    this.email = form.value.email;
    this.address = form.value.address;
    this.phone = form.value.phone;
    this.website = form.value.website;
    this.company = form.value.company;
  }
}
