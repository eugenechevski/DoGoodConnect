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
    // this.router.navigate(['/results'], { state: { data: this.results } });
    this.http.get(`http://localhost:3000/search?q=${query}+volunteering`).subscribe(
      (res) => {
        this.router.navigate(['/results'], { state: { data: res } });
      }
    ),
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

  results = {
    "message": "Success",
    "data": [
        {
            "title": "Cooking Class & Event Calendar | Uncorked Kitchen & Wine Bar",
            "link": "https://www.uncorkedkitchen.com/events",
            "location": [
                "8171 South Chester Street, Suite A, Centennial, CO"
            ],
            "phone": [
                "(720) 907 3838"
            ],
            "email": [
                "info@uncorkedkitchen.com"
            ],
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ov48wJ0qDtxRszO7Kl0bcBrxOuun4zYQ0_C9R3BMOQVQyHNpq8Te&s"
        },
        {
            "title": "Cooking Classes In Stores & Online | Sur La Table",
            "link": "https://www.surlatable.com/cooking-classes/",
            "location": [],
            "phone": [],
            "email": [],
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcDisW_gofU2MYj-mivhnvkT2r5rIN-dFvShK_HIRIVt1OlrTYfzNCfTKC&s"
        },
        {
            "title": "Italian Cooking Classes & Events in Las Dallas | Eataly",
            "link": "https://www.eataly.com/us_en/classes-and-events/dallas",
            "location": [],
            "phone": [],
            "email": [],
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEMpHklBZpGFrA5hSbqVG6yX27lQJwKRJh06wGsrMBDglhlRowqKkiJ1w&s"
        },
        {
            "title": "Napa Valley Winery Events & Cooking Classes",
            "link": "https://www.cakebread.com/events.html",
            "location": [],
            "phone": [],
            "email": [],
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC2PeZ7nA2L0-5tcgshzpuaSdRfdmZi2B06V8tfXpHakMuhYjFuO5cl4c&s"
        },
        {
            "title": "Cooking Class | Tuscan Market & Williams Sonoma",
            "link": "https://www.tuscanbrands.com/store/events/",
            "location": [],
            "phone": [],
            "email": [],
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlExCFLo3LsvFj67Op-lexClU2OXSszw2finW25AIPuc7L6xTQ9VrLcT5&s"
        },
        {
            "title": "Events — Cosima - Baltimore",
            "link": "https://www.cosimamill1.com/events-1",
            "location": [
                "3000 Falls Road",
                "3000 Falls Road"
            ],
            "phone": [
                "443.708.7352"
            ],
            "email": [
                "mangia@cosimamill1.com"
            ],
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaKCBbcxMPDPVb_PbdqFdFxGHtbECtOk_5euHydmQKg8jXBORmHOKpl0M&s"
        },
        {
            "title": "All Wine & Cooking Classes and Special Events - Vino Venue",
            "link": "https://vinovenue.com/collections/all-classes-events",
            "location": [
                "4478 Chamblee Dunwoody Road\nDunwoody, GA 30338"
            ],
            "phone": [
                "770-668-0435 x0",
                "770-668-0435"
            ],
            "email": [
                "info@vinovenue.com"
            ],
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOC5_CoffDty3snPZIvkH7f2g29obYAGMDIJTD9NAfjC_Yh6164TqK9K4&s"
        },
        {
            "title": "Chef Joel's Cooking Classes — Grano Arso - Chester",
            "link": "https://www.granoct.com/cookingclasses",
            "location": [
                "6 Main Street\nChester, CT 06412"
            ],
            "phone": [
                "(860) 322-3143"
            ],
            "email": [
                "lani@granoct.com",
                "joel@granoct.com"
            ],
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsuCWoh6ApFrXPSsaXmQdmZfTGsohAj8N-cg1A4_SIFWpanSnHc-J7UQrX&s"
        },
        {
            "title": "Host Your Event | Special Events & Cooking Classes | NY Campus ...",
            "link": "https://www.ice.edu/about/events/host-your-event",
            "location": [
                "521 East Green Street",
                "225 Liberty Street",
                "3rd Floor",
                "225 Liberty Street, 3rd Floor, New York, NY 10281",
                "521 East Green Street, Pasadena, CA 91101"
            ],
            "phone": [
                "(888) 718-CHEF",
                "(800) 543-8834",
                "(888) 354-CHEF"
            ],
            "email": [
                "specialevents@ice.edu"
            ],
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnocqU6Le1CpKC1x4tk7ZTMQHTFkJo8wKtCxb9_ysuy5XAfhGeqw-gCdeP&s"
        },
        {
            "title": "Cooking School | Central Market - Really Into Food",
            "link": "https://www.centralmarket.com/cooking-school",
            "location": [],
            "phone": [],
            "email": [],
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1xbW2UTcQZrtfCf24oPZzneNMSdxqryiUWwFmbX1nNuI3ezCGE7TQFcU&s"
        }
    ]
}
}
