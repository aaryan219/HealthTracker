import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { ExploreComponent } from './components/explore/explore.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add-workout',
    component: AddWorkoutComponent,
  },
  {
    path:'explore',
    component:ExploreComponent
  },
  {
    // user route 
    path: ':id',
    component: UserComponent
  }
];
