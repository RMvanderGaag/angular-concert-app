import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertAddEditComponent } from './concert-add-edit.component';

describe('ConcertAddEditComponent', () => {
  let component: ConcertAddEditComponent;
  let fixture: ComponentFixture<ConcertAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConcertAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcertAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
