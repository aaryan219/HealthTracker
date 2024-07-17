import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserComponent } from './user.component';
import { ChartModule } from 'primeng/chart';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), ChartModule],
      declarations: [UserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'testuser' // Mocking route param
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data based on route param', () => {
    expect(component.user).toBeTruthy();
    expect(component.user?.name).toEqual('testuser');
  });

  it('should initialize chart data correctly when user data exists', () => {
    // Simulate user data
    const userData = {
      id: 1,
      name: 'testuser',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
        { type: 'Swimming', minutes: 60 }
      ]
    };

    // Set localStorage mock
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([userData]));

    // Call ngOnInit directly to initialize component
    component.ngOnInit();
    fixture.detectChanges();

    // Check chart data initialization
    expect(component.basicData).toBeTruthy();
    expect(component.basicData.labels).toEqual(['Running', 'Cycling', 'Swimming']);
    expect(component.basicData.datasets.length).toEqual(1);
    expect(component.basicData.datasets[0].data).toEqual([30, 45, 60]);
  });

  it('should not initialize chart data if user data is not found', () => {
    // Set localStorage mock with empty array
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([]));

    // Call ngOnInit directly to initialize component
    component.ngOnInit();
    fixture.detectChanges();

    // Check that basicData remains undefined
    expect(component.basicData).toBeUndefined();
  });
});
