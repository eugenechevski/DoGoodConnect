import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
}
