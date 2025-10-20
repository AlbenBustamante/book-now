import { Component } from '@angular/core';
import { ContainerComponent } from '@components/container/container.component';
import { SectionContainerComponent } from '@components/section-container/section-container.component';

@Component({
  selector: 'app-security',
  imports: [ContainerComponent, SectionContainerComponent],
  templateUrl: './security.component.html',
  styleUrl: './security.component.css',
})
export default class SecurityComponent {}
