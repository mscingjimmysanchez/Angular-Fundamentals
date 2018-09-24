import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service'
import { GitSearch } from '../git-search'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})

export class GitSearchComponent implements OnInit {
  searchResults: GitSearch;
  searchQuery: string;
  searchPage: number;
  title: string;
  displayQuery: string;
  constructor(private GitSearchService: GitSearchService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.searchPage = Number(params.get('page'));
      this.gitSearch();  
    })
    this.route.data.subscribe( (result) => {
      this.title = result.title
    });
  }

  gitSearch = () => {
    this.GitSearchService.gitSearch(this.searchQuery, this.searchPage).then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  sendQuery = (page: string) => {
    this.searchResults = null;
    if (Number(page) > 0)
    {
      this.router.navigate(['/search/' + this.searchQuery + '/' + page]);
    }
    else
    {
      this.router.navigate(['/search/' + this.searchQuery + '/1']);
    }
  }
}