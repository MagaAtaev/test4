import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreService } from './store.service';
import { RestService } from './rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'test4';

  formGroup1: FormGroup;

  constructor(public store: StoreService, private rest: RestService, private formBuilder: FormBuilder) {
    this.store.test3.subscribe((res) => console.log(res, "comp"))
    this.rest.getRoute().subscribe((res) => console.log(res))

    this.formGroup1 = this.formBuilder.group({
      input1: ["Привет", Validators.required],
      inputSelect: ["two"],
      inputText: ["Text"]
    })
  }

  onSubmit(post: any) {
    console.log(post)
  }

  test() {
    this.formGroup1.get("input1")?.setValue("Hello")
    this.formGroup1.patchValue({inputText: "text1111"})
    const res = this.formGroup1.getRawValue()
    console.log(res,
    this.formGroup1.get("input1")?.value)
  }
}
