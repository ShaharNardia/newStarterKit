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
import { PostComponent } from './pages/Post/Post.component';
import { AccountComponent } from './pages/account/account.component';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/postsvc.service';
import { PostsFooterComponent } from './ui/post-footer/post-footer.component';
import { SearchboxComponent } from './ui/searchbox/searchbox.component';
import { CreateBtnComponent } from './ui/create-btn/create-btn.component';
import { SubscribeBtnComponent } from './ui/subscribe-btn/subscribe-btn.component';
import { PostImgComponent } from './ui/Post-img/Post-img.component';
import { PostAuthorComponent } from './ui/Post-author/Post-author.component';
import { PostCategoryComponent } from './ui/Post-category/Post-category.component';
import { PostTagsComponent } from './ui/Post-tags/Post-tags.component';
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
    PostComponent,
    AccountComponent,
    PostsFooterComponent,
    SearchboxComponent,
    CreateBtnComponent,
    SubscribeBtnComponent,
    PostImgComponent,
    PostAuthorComponent,
    PostCategoryComponent,
    PostTagsComponent,
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
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule {}
