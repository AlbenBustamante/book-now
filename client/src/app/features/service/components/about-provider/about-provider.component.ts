import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionContainerComponent } from '@components/section-container/section-container.component';

@Component({
  selector: 'app-about-provider',
  imports: [RouterLink, SectionContainerComponent],
  templateUrl: './about-provider.component.html',
  styleUrl: './about-provider.component.css',
})
export class AboutProviderComponent {}
