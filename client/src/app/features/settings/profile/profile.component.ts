import { Component } from '@angular/core';
import { ContainerComponent } from '@components/container/container.component';
import { SectionContainerComponent } from '@components/section-container/section-container.component';

@Component({
  selector: 'app-profile',
  imports: [ContainerComponent, SectionContainerComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export default class ProfileComponent {}
