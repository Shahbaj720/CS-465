import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService, Trip } from '../services/trip';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css'],
  standalone: false
})
export class EditTripComponent implements OnInit {
  trip!: Trip;

  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const tripCode = this.route.snapshot.paramMap.get('tripCode');
    if (tripCode) {
      this.tripService.getTrip(tripCode).subscribe({
        next: (data: any) => {
          // API may return array or single object
          this.trip = Array.isArray(data) ? data[0] : data;
        },
        error: (err: any) => {
          console.error('Error fetching trip:', err);
        }
      });
    }
  }

  onSubmit(): void {
    this.tripService.updateTrip(this.trip).subscribe({
      next: () => {
        this.router.navigate(['trips']);
      },
      error: (err: any) => {
        console.error('Error updating trip:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['trips']);
  }
}
