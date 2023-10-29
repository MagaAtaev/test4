import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject, distinctUntilChanged, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  test = new Observable((sub) => {    // Поведение формируется в момент инициализации; Холодный Observable
    sub.next(new Date());
    setTimeout(() => {
      sub.next(2);
      sub.complete();
    }, 3000) 
  });

  test2 = new Subject<number>();   // Поведение формируется после инициализации

  test3 = new BehaviorSubject(100);   // Поведение формируется после инициализации как у Subject, но в отличии от Subject имеет начальное значение и в момент подписки возвращает текущее значение

  test4 = new ReplaySubject(2);  // Поведение формируется после инициализации как у Subject, не имеет начальное значение но спосбен хранить заданное количество последних значений (задается при создании)

  test5 = new AsyncSubject();  // Поведение формируется после инициализации и не имеет начальное значение, передает в подписку последнее значение но только после вызова complete

  test6 = 50

  testhot = this.initHotObservable()  // Горячий Observable
  
  constructor() {
    this.test.subscribe((res) => console.log(res, "sub1"));

    this.testhot.subscribe((res) => console.log(res, "HOT"));

    this.test2.subscribe((res) => console.log(res, "sub10"));

    this.test2.next(10);
    setTimeout(() => {
      this.test2.next(20);
      this.test2.next(20);
      this.test2.next(20);
      this.test2.next(30);
      this.test2.next(20);
      this.test2.complete();
      this.test.subscribe((res) => console.log(res, "sub1"));
      this.testhot.subscribe((res) => console.log(res, "HOT"));
    }, 3000);


    this.test3.subscribe((res) => console.log(res, "sub100"));
  
    this.test3.next(100);
    setTimeout(() => {
      this.test3.next(200);
      this.test3.subscribe((res) => console.log(res, "sub200"));
      this.test3.complete();
    }, 3000);

    this.test4.next(5);
    this.test4.subscribe((res) => console.log(res, "replay1"));
    this.test4.next(6);
    this.test4.next(7);
    this.test4.subscribe((res) => console.log(res, "replay2"));


    this.test5.subscribe((res) => console.log(res, "async1"));
    this.test5.next(15)
    this.test5.next(16)
    setTimeout(() => this.test5.complete(), 3000)


    this.test2
      .pipe(
        distinctUntilChanged(),
        map((el) => el*2)
      )
      .subscribe((res) => console.log(res, "pipeMap"));  // Pipes
    
    setTimeout(() => this.test6 = 500, 1000)
   }

   initHotObservable() {
    const currentDate = new Date();
    return new Observable((sub) => {    // Поведение формируется в момент инициализации
      sub.next(currentDate);
      setTimeout(() => {
        sub.next(2);
        sub.complete();
      }, 3000) 
    });
   }

   
}
