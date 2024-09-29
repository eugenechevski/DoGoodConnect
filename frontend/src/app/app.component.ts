import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

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

  navigateTo(link: string) {
    window.location.href = link;
  }

  adjustHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
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