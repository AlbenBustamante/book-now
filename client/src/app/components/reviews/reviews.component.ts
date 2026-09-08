import { Component, input } from '@angular/core';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';
import { CommentComponent } from '@components/comment/comment.component';
import { ReviewModel } from '@core/models/service.model';
import { DivisorComponent } from '@components/divisor/divisor.component';

@Component({
  selector: 'app-reviews',
  imports: [SubtitleComponent, CommentComponent, DivisorComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  readonly reviews = input.required<ReviewModel[] | undefined>();
  readonly avgRate = input.required<number | undefined>();
}
