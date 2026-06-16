import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-about',
  imports: [
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  developerName = 'איידי סגל';
  technologies = ['Angular Material', 'Design pattern', 'RxJS', 'NGRX'];

  currentTime = '';
  private timeSub?: Subscription;

  ngOnInit(): void {
    // Observable שמתעדכן כל שנייה
    const clock$ = interval(1000).pipe(
      map(() => new Date().toLocaleTimeString('he-IL'))
    );

    // נרשמים לזרם ומעדכנים את השעה על המסך
    this.timeSub = clock$.subscribe(time => {
      this.currentTime = time;
    });
  }

  ngOnDestroy(): void {
    // נתק את המנוי כדי למנוע דליפת זיכרון
    this.timeSub?.unsubscribe();
  }
}

