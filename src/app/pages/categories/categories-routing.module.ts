import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  {path: '', component: CategoryListComponent }, /* nomesite.com/categories => list (master)*/
  {path: 'new', component: CategoryFormComponent}, /* nomesite.com/categories/new => form (detail)*/
  {path: ':id/edit', component: CategoryFormComponent},/* nomesite.com/categories/:id/edit => form (detail)*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
