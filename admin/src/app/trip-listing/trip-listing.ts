import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService, Trip } from '../services/trip';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
  standalone: false
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
  this.tripService.getTrips().subscribe({
    next: (trips: Trip[]) => {
      console.log('Trips received:', trips);
      this.trips = trips;
      this.message = `There are ${trips.length} trips available`;
    },
    error: (err: any) => {
      console.error('Error fetching trips:', err);
      this.message = 'Error fetching trips';
    }
  });
}
  addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  editTrip(trip: Trip): void {
  this.router.navigate(['edit-trip', trip.code]);
  }
}