import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';

@Component({
  selector: 'app-about-provider',
  imports: [SubtitleComponent, RouterLink],
  templateUrl: './about-provider.component.html',
  styleUrl: './about-provider.component.css',
})
export class AboutProviderComponent {}
