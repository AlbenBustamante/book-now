import { NgClass } from '@angular/common';
import { Component, input, output, WritableSignal } from '@angular/core';
import { MenuIconComponent } from '../menu-icon/menu-icon.component';
import { RouterLink } from '@angular/router';
import { LeftArrowIconComponent } from '../left-arrow-icon/left-arrow-icon.component';

@Component({
  selector: 'app-navbar-title',
  imports: [NgClass, MenuIconComponent, RouterLink, LeftArrowIconComponent],
  templateUrl: './navbar-title.component.html',
  styleUrl: './navbar-title.component.css',
})
export class NavbarTitleComponent {
  readonly onMenuClick = output<void>();
  readonly searching = input.required<WritableSignal<boolean>>();

  menuClick() {
    this.searching().set(false);

    if (this.searching()()) {
      return;
    }

    this.onMenuClick.emit();
  }
}
