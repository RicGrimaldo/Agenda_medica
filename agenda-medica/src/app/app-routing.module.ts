import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './componentes/login/login.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  { path: 'dashboard', loadChildren: () => import('./componentes/dashboard/dashboard.module').then(x => x.DashboardModule) },
  { path: 'logout', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
