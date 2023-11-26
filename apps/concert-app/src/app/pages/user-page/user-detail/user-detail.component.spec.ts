import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../../../shared/services/user/user.service';
import { User } from '../../../shared/models/user.model';
import { of } from 'rxjs';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userService: UserService;
  let activatedRoute: ActivatedRoute;

  const mockUserService = {
    getUserById: (id: number) => ({
      id,
      name: `Simon`,
      email: `simon@mail.com`,
      city: `Breda`,
      birthday: new Date()
    } as User),
    // Other methods if needed
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })) // Simulating route param 'id' as '1'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user details based on route parameter', () => {
    expect(component.user).toBeTruthy();
    expect(component.user?.id).toBe(1);
    expect(component.user?.name).toBe('Simon');
    expect(component.user?.city).toBe('Breda');
    expect(component.user?.email).toBe('simon@mail.com');
  });

});