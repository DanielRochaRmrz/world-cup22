import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  constructor( private router: Router ) {}

  group() {
    this.router.navigateByUrl('/group/group-list');
  }

  player() {
    this.router.navigateByUrl('/player/player-list');
  }

  team() {
    this.router.navigateByUrl('/team');
  }
}
