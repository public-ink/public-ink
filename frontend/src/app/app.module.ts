import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'

// services
import { BackendService } from './backend.service'
import { StyleService } from './style.service'

// routing
import { RouterModule, Routes } from '@angular/router'
import { PublicationComponent } from './publication/publication.component';
import { ArticleComponent } from './article/article.component';
import { AuthorComponent } from './author/author.component';
import { UniverseComponent } from './universe/universe.component';
import { AllComponent } from './all/all.component'

/*const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':authorID',   component: AuthorComponent },
  { path: ':authorID/:publicationID',   component: PublicationComponent },
  { path: ':authorID/:publicationID/:articleID', component: ArticleComponent },
  //{ path: '**', component: PageNotFoundComponent }
]*/
const appRoutes: Routes = [
  { path: '', component: AllComponent },
  { path: ':authorID',   component: AllComponent },
  { path: ':authorID/:publicationID',   component: AllComponent },
  { path: ':authorID/:publicationID/:articleID', component: AllComponent },
  //{ path: '**', component: PageNotFoundComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicationComponent,
    ArticleComponent,
    AuthorComponent,
    UniverseComponent,
    AllComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    BackendService,
    StyleService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    /*AppComponent*/
    UniverseComponent
  ]
})
export class AppModule { }
