import { AuthGuard } from './guards/auth.guard';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: "", redirectTo: '/clients', pathMatch: 'full' },
  { path: "clients", children: [
    { path: "", component: ListClientsComponent },
    { path: "create", component: AddClientComponent },
    { path: "edit/:id", component: EditClientComponent },
  ], canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
