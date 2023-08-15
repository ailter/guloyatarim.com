import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isExpanded = true;
  userName = 'John Doe';
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    window['_scope']= this;
    if (window.innerWidth < 1000) {
      this.shrink();
    }

    $(document).ready(function () {
      $("body").tooltip({ selector: '[data-toggle=tooltip]', placement: 'right' });
    });

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      let innerWidth = evt.currentTarget['innerWidth'];

      if (innerWidth < 1000) {
        this.shrink();
      }
      else {
        this.expand();
      }
    })
  }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.expand();
    }
    else {
      this.shrink();
    }
  }

  shrink() {
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    sidebar.style.width = '88px'

    const labels = Array.from(document.getElementsByClassName('shrink-remove'));
    for (let label of labels) {
      (label as HTMLElement).style.display = 'none';
    }

    const mainContent = document.getElementById('main-content') as HTMLElement;
    mainContent.style.transition = '0.9s';
    mainContent.style.marginLeft = '90px';
  }

  expand() {
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    sidebar.style.width = '250px'

    const labels = Array.from(document.getElementsByClassName('shrink-remove'));
    setTimeout(() => {
      for (let label of labels) {
        (label as HTMLElement).style.removeProperty('display');
      }
    }, 200);

    const mainContent = document.getElementById('main-content') as HTMLElement;
    mainContent.style.transition = '0.4s';
    mainContent.style.marginLeft = '300px';
  }


  logout() {
    // Implement logout logic here
  }
}
