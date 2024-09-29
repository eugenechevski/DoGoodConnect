import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Result } from './result';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultComponent {
  title = 'Results';
  results: Result[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.results = navigation?.extras?.state?.['data'].data;
  }
}
