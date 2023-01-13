import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public userData: UserData|null = null;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UserData>(baseUrl + 'api/data').subscribe(result => {
      this.userData = result;
    }, error => console.error(error));
  }
}

interface UserData {
  loginName: string;
}
