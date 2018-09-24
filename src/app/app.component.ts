import { Component, OnInit } from '@angular/core';
import { GitSearchService } from './git-search.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GitSearchService]
})
export class AppComponent implements OnInit {
  constructor (private GitSearchService : GitSearchService) {

  }
  ngOnInit() {
    this.GitSearchService.gitUsers('angular').then( (response) => {
      alert("Total Users Found:" + response.total_count);
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }
  title = 'app is functional!';
}