import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {User} from '../../common/models/user.model';


@Directive({selector: '[Secured]'})
export class SecuredDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  @Input() set Secured(role: string) {
    if (this.authorized(role) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!this.authorized(role) && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

    authorized(role: string) {
    let authorized  = false;
    if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user')) as User;
        authorized = user.role.name === role;
    }
    return authorized;
  }
}
