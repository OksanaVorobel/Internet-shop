import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule} from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  const formBuilder = new FormBuilder();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make form', function () {
    const form = formBuilder.group({
      email: '',
      password: '',
    });
    component.ngOnInit();
    expect(component.loginForm.getRawValue()).toEqual(form.getRawValue());
  });

  it('should make post request', function () {
    component.submit();
    const req = httpTestingController.expectOne('http://127.0.0.1:5000/users/login');
    expect(req.request.method).toEqual('POST');
  });
});
