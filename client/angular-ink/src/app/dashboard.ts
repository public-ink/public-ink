//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { style, animate, group, animateChild, transition, state, trigger, query, stagger } from '@angular/animations';

import {ProfileDetailsComponent} from './profile-details';
import {ProfileStatsComponent} from './profile-stats';



@Component({
  selector: 'dashboard',
  // styleUrls: ['src/dashboard.css'],
  template: `
    <div>
      <header>
        <span class="primary-font title justify-start">Dashboard</span>
        <div class="image-container" (click)="toggleProfileDetails()" data-tooltip="Profile" >
          <img class="profile-button" src="https://api.adorable.io/avatars/60/me@you.com.png" />
        </div>
      </header>
      
      <profile-details [user]="user" *ngIf="showProfileDetails"></profile-details>
    </div>
  `
})
export class DashboardComponent {
  showProfileDetails: boolean = false;
  user: any;
  
  constructor() {
    this.user = {
      name: 'Dominic Elm',
      title: 'Frontend Developer',
      location: 'Germany',
      hearts: 235,
      views: 23500
    };
  }
  
  toggleProfileDetails() {
    this.showProfileDetails = !this.showProfileDetails;
  }
}

