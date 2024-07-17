import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ExploreComponent } from './explore.component';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ExploreComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;

    localStorage.setItem('userData', JSON.stringify([
      { id: 1, name: 'John Doe', workouts: [{ type: 'Gym', minutes: 60 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Running', minutes: 30 }] },
    ]));

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('userData');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userData from localStorage', () => {
    expect(component.userData).toEqual([
      { id: 1, name: 'John Doe', workouts: [{ type: 'Gym', minutes: 60 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Running', minutes: 30 }] },
    ]);
  });

  it('should filter userData by name', () => {
    component.filterForm.controls['name'].setValue('John');
    expect(component.filteredUserData()).toEqual([
      { id: 1, name: 'John Doe', workouts: [{ type: 'Gym', minutes: 60 }] },
    ]);
  });

  it('should filter userData by workout type', () => {
    component.filterForm.controls['type'].setValue('Running');
    expect(component.filteredUserData()).toEqual([
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Running', minutes: 30 }] },
    ]);
  });

  it('should return all userData when type is set to All', () => {
    component.filterForm.controls['type'].setValue('All');
    expect(component.filteredUserData()).toEqual([
      { id: 1, name: 'John Doe', workouts: [{ type: 'Gym', minutes: 60 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Running', minutes: 30 }] },
    ]);
  });

  it('should calculate total pages correctly', () => {
    component.itemsPerPage = 1;
    expect(component.totalPages).toBe(2);

    component.itemsPerPage = 2;
    expect(component.totalPages).toBe(1);
  });

  it('should paginate data correctly', () => {
    component.itemsPerPage = 1;
    component.currentPage = 1;
    expect(component.paginatedData).toEqual([
      { id: 1, name: 'John Doe', workouts: [{ type: 'Gym', minutes: 60 }] },
    ]);

    component.currentPage = 2;
    expect(component.paginatedData).toEqual([
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Running', minutes: 30 }] },
    ]);
  });

  it('should navigate to the next page', () => {
    component.itemsPerPage = 1;
    component.currentPage = 1;
    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('should navigate to the previous page', () => {
    component.itemsPerPage = 1;
    component.currentPage = 2;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should change items per page', () => {
    const event = { target: { value: '2' } } as unknown as Event;
    component.changeItemsPerPage(event);
    expect(component.itemsPerPage).toBe(2);
  });
});
