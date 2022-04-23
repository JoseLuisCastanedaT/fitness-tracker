import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TrainingService } from '../../services/training.service';
import { isTraining } from '../../store/training.selectors';

@Component({
  selector: 'ft-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;
  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.pipe(select(isTraining))
  }

}
