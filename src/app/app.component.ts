import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private router: Router,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon('security', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/imgs/security.svg'));
    }

    get isAuth() {
        return this.router.url.includes('auth');
    }

}
