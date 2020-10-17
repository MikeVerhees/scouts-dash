import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth) { }
  title = 'ng-scouts-dash';
  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      console.log(user);
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
