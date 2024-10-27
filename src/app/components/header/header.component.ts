import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  GuardsCheckEnd,
  Router,
  RouterLink,
  ActivatedRoute,
} from '@angular/router';
/* import { AuthService } from '../../auth/auth.service'; */

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isHomePage: boolean = true;
  public isProfilePage: boolean = false;
  private subscriptions: Subscription[] = [];
  isAuth: boolean = false;

  constructor(
    //private authService: AuthService,
    private router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //this.profile = this.authService.profile.getValue();
    this.handleLocation(this.router.url);

    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof GuardsCheckEnd) {
          this.handleLocation(event.url);
        }
      })
    );
  }

  handleLocation(url: string): void {
    this.isHomePage = url === '/';
    this.isProfilePage = url === '/profile';
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
