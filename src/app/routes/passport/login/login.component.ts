import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { finalize } from 'rxjs/operators';

export const USERS = [
  {
    userName: 'mohammed',
    password: 'Lnddo#2020',
    email: 'mohammed@mohammed.com',
    expired: 16526570992690,
    id: 10000,
    name: 'mohammed',
    time: 16526567989670,
    token: '1234567890'
  },
  {
    userName: 'ahmed',
    password: 'Lnddo#2021',
    email: 'ahmed@ahmed.com',
    expired: 16526570992691,
    id: 10001,
    name: 'ahmed',
    time: 16526567989671,
    token: '1234567891'
  },
  {
    userName: 'admin',
    password: 'Lnddo#2022',
    email: 'admin@admin.com',
    expired: 16526570992693,
    id: 10003,
    name: 'admin',
    time: 16526567989673,
    token: '1234567893'
  },
  {
    userName: 'lnddo',
    password: 'Lnddo#2022',
    email: 'lnddo@lnddo.com',
    expired: 16526570992694,
    id: 10004,
    name: 'lnddo',
    time: 16526567989674,
    token: '1234567894'
  }
];

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginComponent implements OnDestroy {
  constructor(
    fb: FormBuilder,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // userName: [null, [Validators.required, Validators.pattern(/^(admin|user)$/)]],
      // password: [null, [Validators.required, Validators.pattern(/^(ng\-alain\.com)$/)]],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true]
    });
  }

  // #region fields

  get userName(): AbstractControl {
    return this.form.get('userName')!;
  }
  get password(): AbstractControl {
    return this.form.get('password')!;
  }
  get mobile(): AbstractControl {
    return this.form.get('mobile')!;
  }
  get captcha(): AbstractControl {
    return this.form.get('captcha')!;
  }
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;

  // #region get captcha

  count = 0;
  interval$: any;

  // #endregion

  switch({ index }: NzTabChangeEvent): void {
    this.type = index!;
  }

  getCaptcha(): void {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }

  // #endregion

  // submit(): void {
  //   this.error = '';
  //   if (this.type === 0) {
  //     this.userName.markAsDirty();
  //     this.userName.updateValueAndValidity();
  //     this.password.markAsDirty();
  //     this.password.updateValueAndValidity();
  //     if (this.userName.invalid || this.password.invalid) {
  //       return;
  //     }
  //   } else {
  //     this.mobile.markAsDirty();
  //     this.mobile.updateValueAndValidity();
  //     this.captcha.markAsDirty();
  //     this.captcha.updateValueAndValidity();
  //     if (this.mobile.invalid || this.captcha.invalid) {
  //       return;
  //     }
  //   }

  //   this.loading = true;
  //   this.cdr.detectChanges();
  //   this.http
  //     .post('/login/account?_allow_anonymous=true', {
  //       type: this.type,
  //       userName: this.userName.value,
  //       password: this.password.value
  //     })
  //     .pipe(
  //       finalize(() => {
  //         this.loading = true;
  //         this.cdr.detectChanges();
  //       })
  //     )
  //     .subscribe(res => {
  //       console.log('===res====res====', res);

  //       if (res.msg !== 'ok') {
  //         this.error = res.msg;
  //         this.cdr.detectChanges();
  //         return;
  //       }
  //       // 清空路由复用信息
  //       this.reuseTabService.clear();

  //       // TODO: Mock expired value
  //       res.user.expired = +new Date() + 1000 * 60 * 5;
  //       this.tokenService.set(res.user);

  //       this.startupSrv.load().subscribe(() => {
  //         let url = this.tokenService.referrer!.url || '/';
  //         if (url.includes('/passport')) {
  //           url = '/';
  //         }
  //         this.router.navigateByUrl(url);
  //       });
  //     });
  // }

  submit(): void {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) {
        return;
      }
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) {
        return;
      }
    }

    let userName = this.userName.value;
    let password = this.password.value;
    console.log('------userName-----', userName);
    console.log('-----password------', password);

    let user = USERS.find(u => u.userName == userName && u.password == password);
    console.log('-----user------', user);
    if (!user) {
      this.error = 'User name or password is wrong';
      this.cdr.detectChanges();
      return;
    }
    this.reuseTabService.clear();

    user.expired = +new Date() + 1000 * 60 * 5;
    this.tokenService.set(user);

    this.startupSrv.load().subscribe(() => {
      let url = this.tokenService.referrer!.url || '/';
      if (url.includes('/passport')) {
        url = '/';
      }
      this.router.navigateByUrl(url);
    });
  }

  // #region social

  open(type: string, openType: SocialOpenType = 'href'): void {
    let url = ``;
    let callback = ``;
    if (environment.production) {
      callback = `https://ng-alain.github.io/ng-alain/#/passport/callback/${type}`;
    } else {
      callback = `http://localhost:4200/#/passport/callback/${type}`;
    }
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback
        )}`;
        break;
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
        break;
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window'
        })
        .subscribe(res => {
          if (res) {
            this.settingsService.setUser(res);
            this.router.navigateByUrl('/');
          }
        });
    } else {
      this.socialService.login(url, '/', {
        type: 'href'
      });
    }
  }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
