import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcertOverviewComponent } from './concert-overview/concert-overview.component';
import { ConcertAddEditComponent } from './concert-add-edit/concert-add-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ConcertOverviewComponent, ConcertAddEditComponent],
})
export class ConcertModule { }
