import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
import { EmailVerificationPageComponent } from './email-verification-page/email-verification-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { FileDropComponent } from './file-drop/file-drop.component';
import { AutosizeDirective } from './autosize.directive';

import { environment } from '../environments/environment';
import { ContentWidthComponent } from './content-width/content-width.component';
import { UseHostPipe } from './use-host.pipe';
import { RoundPipe } from './round.pipe';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component'

import { DndModule } from 'ng2-dnd';
import { KeysPipePipe } from './keys-pipe.pipe'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: environment.backendHost + '/api/graphql' // + '?cachebust=' + new Date().getTime()
  }),
})

export function provideClient(): ApolloClient {
  return apolloClient
}


const appRoutes: Routes = [
  //{ path: '', component: LayoutComponent },
  { path: '', component: HomePageComponent },
  // pages
  //{ path: 'me', component: MePageComponent},
  { path: 'my-account', component: AccountPageComponent},
  { path: 'auth', component: AuthPageComponent },
  { path: 'verify/:email/:token', component: EmailVerificationPageComponent},
  { path: 'reset/:email/:token', component: ResetPasswordPageComponent},

  // pages, loaded viea GraphQL
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
    AccountPageComponent,
    FileDropComponent,
    AutosizeDirective,
    ContentWidthComponent,
    UseHostPipe,
    RoundPipe,
    ResetPasswordPageComponent,
    KeysPipePipe,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    ApolloModule.forRoot(provideClient),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DndModule.forRoot(),
  ],
  providers: [BackendService, UIService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
