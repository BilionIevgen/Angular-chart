import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { PriceComponent } from './modules/priceform/price.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DataComponent } from './modules/datatable/data.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'posts',
    component: DataComponent
  },
  {
    path: 'posts/:id',
    component: PriceComponent
  },
  {
    path: 'posts/new',
    component: PriceComponent
  },

]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
