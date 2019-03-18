import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ArticleComponent } from './pages/article/article.component';
import { AccountComponent } from './pages/account/account.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { WizardComponent } from './pages/wizard/wizard.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'pages/homepage', component: HomepageComponent },
  { path: 'pages/archive', component: ArchiveComponent },
  { path: 'pages/wizard', component: WizardComponent },
  { path: 'pages/article/:id', component: ArticleComponent },
  { path: 'pages/article', component: ArticleComponent },
  { path: 'pages/about', component: AboutComponent },
  { path: 'pages/contact', component: ContactComponent },
  { path: 'pages/account', component: AccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
