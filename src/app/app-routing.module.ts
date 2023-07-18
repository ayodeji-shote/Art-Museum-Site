import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableViewComponent } from './table-view/table-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

const routes: Routes = [
  { path: '', component: TableViewComponent },
  { path: 'detail-view/:id', component: DetailViewComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
