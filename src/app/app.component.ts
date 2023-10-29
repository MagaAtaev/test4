import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreService } from './store.service';
import { RestService } from './rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'test4';

  constructor(public store: StoreService, private rest: RestService) {
    this.store.test3.subscribe((res) => console.log(res, "comp"))
    this.rest.getRoute().subscribe((res) => console.log(res))
  }
}
