import { Component } from '@angular/core';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';
import { CommentComponent } from '@components/comment/comment.component';

@Component({
  selector: 'app-reviews',
  imports: [SubtitleComponent, CommentComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {}
