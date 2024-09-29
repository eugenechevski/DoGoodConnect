import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultComponent {
  title = 'Results';
  results = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.results = navigation?.extras?.state?.['data'];
  }
}
