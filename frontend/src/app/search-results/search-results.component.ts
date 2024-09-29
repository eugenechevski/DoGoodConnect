import { Component, OnInit } from '@angular/core';
import { SearchResultsService, SearchResult } from '../search-results.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  searchResults: SearchResult[] = [];

  constructor(private searchResultsService: SearchResultsService) {}

  ngOnInit() {
    this.searchResultsService.getSearchResults().subscribe(
      results => {
        this.searchResults = results;
        console.log('Search results:', this.searchResults);
      },
      error => {
        console.error('Error fetching search results:', error);
      }
    );
  }
}