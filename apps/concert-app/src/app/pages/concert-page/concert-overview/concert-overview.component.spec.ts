import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertOverviewComponent } from './concert-overview.component';
import { RouterModule } from '@angular/router';

describe('ConcertOverviewComponent', () => {
  let component: ConcertOverviewComponent;
  let fixture: ComponentFixture<ConcertOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcertOverviewComponent ],
      imports: [RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
