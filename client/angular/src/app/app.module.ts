import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule, Routes } from '@angular/router'


import { AppComponent } from './app.component'
import { BackendService } from './backend.service'
import { AuthorComponent } from './author/author.component'
import { SlugifyPipe } from './slugify.pipe'
import { StringifyPipe } from './stringify.pipe'
import { UIService } from './ui.service'
import { AuthorPageComponent } from './author-page/author-page.component'
import { HomePageComponent } from './home-page/home-page.component'
import { PublicationPageComponent } from './publication-page/publication-page.component'
import { ArticlePageComponent } from './article-page/article-page.component';
import { PublicationComponent } from './publication/publication.component';
import { ArticleComponent } from './article/article.component'

import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { ApolloModule } from 'apollo-angular'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { EmailVerificationPageComponent } from './email-verification-page/email-verification-page.component'


const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8080/graphql'
  }),
})

export function provideClient(): ApolloClient {
  return apolloClient
}


const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  // pages
  { path: 'auth', component: AuthPageComponent },
  { path: 'verify/:email/:token', component: EmailVerificationPageComponent},
  
  // graph
  { path: ':authorID', component: AuthorPageComponent },
  { path: ':authorID/:publicationID', component: PublicationPageComponent },
  { path: ':authorID/:publicationID/:articleID', component: ArticlePageComponent },
  //{ path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    SlugifyPipe,
    StringifyPipe,
    AuthorPageComponent,
    HomePageComponent,
    PublicationPageComponent,
    ArticlePageComponent,
    PublicationComponent,
    ArticleComponent,
    AuthPageComponent,
    EmailVerificationPageComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    ApolloModule.forRoot(provideClient),
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [BackendService, UIService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
