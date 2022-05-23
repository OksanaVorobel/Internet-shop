import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpErrorResponse} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {of, throwError} from "rxjs";


describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should make post request', () => {
    // @ts-ignore
    const authSpy = spyOn(component.auth, 'registration')
    component.form.get("email")?.setValue("user1@gmail.com");
    component.form.get("first_name")?.setValue("user1");
    component.form.get("last_name")?.setValue("user1");
    component.form.get("password")?.setValue("user1");
    component.form.get("confirm_password")?.setValue("user1");
  
    authSpy.and.returnValue(of({
      'access_token': "123",
      user: {id: 1, email: "user1@gmail.com", first_name: 'user1',  last_name: 'user1'}
    }));

    component.submit();

    expect(authSpy).toHaveBeenCalledTimes(1);
  });

  it('should catch and process error response on incorrect data', () => {
    // @ts-ignore
    const authSpy = spyOn(component.auth, 'registration')
    component.form.get("first_name")?.setValue("user1");
    component.form.get("last_name")?.setValue("");
    component.form.get("password")?.setValue("user1");
    component.form.get("confirm_password")?.setValue("user1");
  
    const errorResponse = new HttpErrorResponse({
      error: 'test 400 error',
      status: 400, statusText: 'Bad Request'
    });

    authSpy.and.returnValue(throwError(() => errorResponse));

    component.submit();

    expect(authSpy).toHaveBeenCalledTimes(1);
  });

  it('should catch and process error response on already registered email', () => {
    // @ts-ignore
    const authSpy = spyOn(component.auth, 'registration')
    component.form.get("email")?.setValue("user1@gmail.com");
    component.form.get("first_name")?.setValue("user1");
    component.form.get("last_name")?.setValue("user1");
    component.form.get("password")?.setValue("user1");
    component.form.get("confirm_password")?.setValue("user1");
  
    const errorResponse = new HttpErrorResponse({
      error: 'test 403 error',
      status: 403, statusText: 'Forbidden'
    });

    authSpy.and.returnValue(throwError(() => errorResponse));

    component.submit();

    expect(authSpy).toHaveBeenCalledTimes(1);
  });

  it('should reject the request because passwords are not equal', fakeAsync(() => {
    // @ts-ignore
    const authSpy = spyOn(component.auth, 'registration')
    component.form.get("email")?.setValue("user1@gmail.com");
    component.form.get("first_name")?.setValue("user1");
    component.form.get("last_name")?.setValue("user1");
    component.form.get("password")?.setValue("user1");
    component.form.get("confirm_password")?.setValue("user12");
    authSpy.and.callThrough()

    component.submit();

    expect(authSpy).toHaveBeenCalledTimes(0);

    flush();

    expect(component.passwords_not_match).toBeFalse();
  }));
});
