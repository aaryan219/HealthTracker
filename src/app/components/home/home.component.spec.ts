import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
// import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('img[alt="logo"]');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('src')).toBe('/logo.svg');
  });

  it('should render the heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Sweat, Smile and Repeat');
  });

  it('should render the description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const description = compiled.querySelector('p');
    expect(description).toBeTruthy();
    expect(description?.textContent).toContain('Checkout the workout plans and start your fitness journey today.');
  });

  it('should render the explore workouts button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toContain('Explore Workouts');
  });

  it('should have a link to the explore page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a[routerLink="/explore"]');
    expect(link).toBeTruthy();
  });
});
