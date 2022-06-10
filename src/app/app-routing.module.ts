import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'featured/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full'
  },

  {
    path: 'ws',
    loadChildren: () =>
      import('../workspace/workspace.module').then((m) => m.WorkspaceModule),
    data: { breadCrumb: 'EASY DELIVERY' },
  },
  {
    path: 'authentication',
    loadChildren: () => import('../authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path:'**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
