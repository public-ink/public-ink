import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'

// services
import { BackendService } from './backend.service'

// routing
import { RouterModule, Routes } from '@angular/router'
import { PublicationComponent } from './publication/publication.component';
import { ArticleComponent } from './article/article.component';
import { AuthorComponent } from './author/author.component'

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':authorID',   component: AuthorComponent },
  { path: ':authorID/:publicationID',   component: PublicationComponent },
  { path: ':authorID/:publicationID/:articleID', component: ArticleComponent },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicationComponent,
    ArticleComponent,
    AuthorComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    BackendService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
