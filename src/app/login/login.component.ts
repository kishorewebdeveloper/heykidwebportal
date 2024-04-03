import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';
import { SessionService } from 'src/services/session.service';
import { UtilityService } from 'src/services/utility.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;

  loginForm: FormGroup;
  returnUrl: string;
  loginFormSubmitted = false;
  constructor(private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private sessionService: SessionService,
    private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    this.authService.logOut();
    this.initializeValidators();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initializeValidators() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get lf() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.loginFormSubmitted = true;
    if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(() => {
            this.loadPermissions(this.sessionService.roleName());
            this.router.navigate(['/home']);
        });
    } else {
        this.utilityService.validateFormControl(this.loginForm);
    }
}

loadPermissions(roleName: string) {
    let permissions = [];
    permissions.push(roleName);
    this.permissionsService.loadPermissions(permissions);
}


  registerClick() {
    this.router.navigate(['/register']);
  }

}
