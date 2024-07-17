import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [NavbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('img[alt="logo"]');
    expect(logo).toBeTruthy();
    expect(logo!.getAttribute('src')).toBe('/logo.svg');
  });

  it('should render the navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('ul li a');
    expect(links.length).toBe(3); // Ensure there are three navigation links

    // Check each link
    expect(links[0].textContent).toContain('HOME');
    expect(links[1].textContent).toContain('EXPLORE');
    expect(links[2].textContent).toContain('ADD');
  });

  it('should navigate to HOME page when HOME link is clicked', () => {
    spyOn(router, 'navigateByUrl');

    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('ul li a[routerLink="/"]');

    expect(homeLink).toBeTruthy();

    // Simulate a click on the HOME link
    homeLink!.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    // Assert that the router has navigated to the HOME page
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should navigate to EXPLORE page when EXPLORE link is clicked', () => {
    spyOn(router, 'navigateByUrl');

    const compiled = fixture.nativeElement as HTMLElement;
    const exploreLink = compiled.querySelector('ul li a[routerLink="/explore"]');

    expect(exploreLink).toBeTruthy();

    // Simulate a click on the EXPLORE link
    exploreLink!.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    // Assert that the router has navigated to the EXPLORE page
    expect(router.navigateByUrl).toHaveBeenCalledWith('/explore');
  });

  it('should navigate to ADD WORKOUT page when ADD link is clicked', () => {
    spyOn(router, 'navigateByUrl');

    const compiled = fixture.nativeElement as HTMLElement;
    const addLink = compiled.querySelector('ul li a[routerLink="/add-workout"]');

    expect(addLink).toBeTruthy();

    // Simulate a click on the ADD WORKOUT link
    addLink!.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    // Assert that the router has navigated to the ADD WORKOUT page
    expect(router.navigateByUrl).toHaveBeenCalledWith('/add-workout');
  });
});
