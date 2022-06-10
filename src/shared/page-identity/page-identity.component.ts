import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-page-identity',
  templateUrl: './page-identity.component.html',
  styleUrls: ['./page-identity.component.css']
})
export class PageIdentityComponent implements OnInit {
  public data: any = null;
  @Input() title: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        let currentRoute = this.route.root;
        localStorage.setItem('previous_url', this.router.url);
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(route => {
            if (route.outlet === 'primary') {
              this.data = route.snapshot.data;
              currentRoute = route;
            }
          });
        } while (currentRoute);
      });
  }

}
