import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService, Trip } from '../services/trip';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.html',
  styleUrls: ['./add-trip.css'],
  standalone: false
})
export class AddTripComponent implements OnInit {
  trip: Trip = {
    _id: '',
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: 0,
    image: '',
    description: ''
  };

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.tripService.addTrip(this.trip).subscribe({
      next: () => {
        this.router.navigate(['trips']);
      },
      error: (err: any) => {
        console.error('Error adding trip:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['trips']);
  }
}