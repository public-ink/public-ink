import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

// environment
import { environment } from '../environments/environment'


/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   url | useHost:env
 * Example:
 *   {{ 'http://localhost:8080/...' |  useHost:'env' }}
 *   returns 'http://192.182.182:8080/...' or whatever is in environment.ts
*/
@Pipe({
  name: 'useHost'
})
export class UseHostPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  backendHost: string = environment.backendHost

  transform(url: string, env: string): any {
    let host = url.split('/', 3).join('/')
    let newUrl = url.replace(host, this.backendHost)
    let safeUrl = this.sanitizer.bypassSecurityTrustUrl(newUrl)
    return safeUrl
  }

}
