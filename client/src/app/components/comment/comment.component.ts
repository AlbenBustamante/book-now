import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ReviewModel } from '@core/models/service.model';

@Component({
  selector: 'app-comment',
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  readonly review = input.required<ReviewModel>();

  readonly stars = computed(() => {
    const rate = this.review().rate;
    let stars = '';

    for (let i = 1; i <= rate; i++) {
      stars += '⭐';
    }

    return stars;
  });
}
