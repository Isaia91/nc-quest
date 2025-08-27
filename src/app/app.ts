import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
<header class="topbar">
<h1>NC Quest</h1>
<nav>
<a routerLink="/">Accueil</a>
<a routerLink="/scan">Scanner</a>
<a routerLink="/progress">Progression</a>
</nav>
</header>
<main class="container">
<router-outlet></router-outlet>
</main>
`,
  styles: [`
:host { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #0b1324; }
.topbar { display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:#0ea5e9; color:white; }
.topbar a { color:white; text-decoration:none; margin-left:12px; font-weight:600; }
.container { padding: 16px; }
`]
})
export class AppComponent {}
