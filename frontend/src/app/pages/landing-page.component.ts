import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  title = 'Do Good';

  constructor(private http: HttpClient, private router: Router) {};

  dropdownVisible = false;

  toggleDropdown() {
    const dropdown = document.getElementById("dropdown-menu");
    if (!dropdown) return;

    this.dropdownVisible = !this.dropdownVisible;

    if (this.dropdownVisible)
      dropdown.classList.remove("hidden");

    else
      dropdown.classList.add("hidden");
  }

  adjustHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  navigateTo() {
    const textarea = document.getElementById("text") as HTMLTextAreaElement;
    const searchString = textarea.value;
    const query = searchString?.replaceAll(' ', '+');
    // console.log(query);
    // this.http.get(`http://localhost:3000/search?q=${query}`).subscribe(
    //   (res) => {
    //     this.router.navigate(['/results'], { state: { data: res } });
    //   }
    // ),
    (error: Error) => {
      console.error('API call failed', error);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Get where the user clicked
    const target = event.target;

    // Get the elements that should be impacted by click
    const settingsButton = document.getElementById("settings-button");
    const dropdown = document.getElementById("dropdown-menu");

    if (!target || !settingsButton || !dropdown)
      return;

    // const clickLocation = { x: event.x, y: event.y };
    if (settingsButton.contains(event.target as Node) || dropdown.contains(event.target as Node))
      return;

    if (this.dropdownVisible) {
      dropdown.classList.add("hidden");
      this.dropdownVisible = false;
    }
  }
}
