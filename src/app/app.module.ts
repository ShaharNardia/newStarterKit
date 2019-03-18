import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { MenuComponent } from './ui/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ArchiveComponent } from './pages/archive/archive.component';
// tslint:disable-next-line:max-line-length
import {
  MatCardModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatMenuModule,
  MatIconModule,
  MatBadgeModule
} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ArticleComponent } from './pages/article/article.component';
import { AccountComponent } from './pages/account/account.component';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from './services/article.service';
import { ArticlesFooterComponent } from './ui/articles-footer/articles-footer.component';
import { SearchboxComponent } from './ui/searchbox/searchbox.component';
import { CreateBtnComponent } from './ui/create-btn/create-btn.component';
import { SubscribeBtnComponent } from './ui/subscribe-btn/subscribe-btn.component';
import { ArticleImgComponent } from './ui/article-img/article-img.component';
import { ArticleAuthorComponent } from './ui/article-author/article-author.component';
import { ArticleCategoryComponent } from './ui/article-category/article-category.component';
import { ArticleTagsComponent } from './ui/article-tags/article-tags.component';
import { CategoriesComponent } from './ui/categories/categories.component';
import { ImgNullPipe } from './pipes/img-null.pipe';
import { WizardComponent } from './pages/wizard/wizard.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    MenuComponent,
    AboutComponent,
    ContactComponent,
    HomepageComponent,
    ArchiveComponent,
    ArticleComponent,
    AccountComponent,
    ArticlesFooterComponent,
    SearchboxComponent,
    CreateBtnComponent,
    SubscribeBtnComponent,
    ArticleImgComponent,
    ArticleAuthorComponent,
    ArticleCategoryComponent,
    ArticleTagsComponent,
    CategoriesComponent,
    ImgNullPipe,
    WizardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEditorModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatChipsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
    MatIconModule,
    MatBadgeModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
