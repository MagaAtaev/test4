import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreService } from './store.service';
import { RestService } from './rest.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from './utils';

// interface EditForm {       // Результат выполнения тип-обертки Form из файла Utils 
//   input1: FormControl<string | null>;
//   inputSelect: FormControl<string | null>;
//   inputText: FormControl<string | null>;
//   secondForm: FormGroup<{inputText: FormControl<string | null>}>
// }

const test = "input1"
export interface EditModel {
  [test]: string | null;
  inputSelect: string | null;
  inputText: string | null;
  secondForm: TestModel;
}

interface TestModel {
  inputText: string | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'test4';

  //formGroup1: FormGroup<EditForm>;
  //formGroup1: Form<EditModel>
  formGroup1 = new FormGroup<Form<EditModel>>({     // С помощью типа Form мы генерируем новый тип для FormGroup на основе интерфейса EditModel который в результате будет схож с типом FormEdit
    input1: new FormControl("Привет", [Validators.required]),
    inputSelect: new FormControl ("two"),
    inputText: new FormControl ("Text"),
    secondForm: new FormGroup<Form<TestModel>>({
      inputText: new FormControl("Text2")
    })
  })

  constructor(public store: StoreService, private rest: RestService, private formBuilder: FormBuilder) {
    this.store.test3.subscribe((res) => console.log(res, "comp"))
    this.rest.getRoute().subscribe((res) => console.log(res))

    // this.formGroup1 = this.formBuilder.group({
    //   input1: ["Привет", Validators.required],
    //   inputSelect: ["two"],
    //   inputText: ["Text"]
    // })
  }

  onSubmit(post: any) {
    console.log(post)
  }

  test() {
    this.formGroup1.get("input1")?.setValue("Hello")
    this.formGroup1.patchValue({
      inputText: "text1111",
      input1: "111"
    })
    //this.formGroup1.controls.input1.patchValue("Hi")
    const res: EditModel = this.formGroup1.getRawValue()
    this.rest.putData(res)
    console.log(
      res,
      this.formGroup1.get("input1")?.value,
      this.formGroup1.controls.input1.value
    )
  }
}
