import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../services/trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css'],
  standalone: false
})
export class TripCardComponent implements OnInit {
  @Input() trip!: Trip;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  editTrip(trip: Trip): void {
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip', trip.code]);
  }
}