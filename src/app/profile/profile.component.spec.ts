import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpErrorResponse} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {CookieService} from "../services/cookie.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

const cookieService = {
  clearCookie: function () {
  },
  getAuthToken: function () {
    return null
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should changeEdit return True', () => {
    component.changeEdit()
    expect(component.Edit).toBeTrue();
  });

  it('should make put request', function () {
    component.submit();
    const req = httpTestingController.expectOne('http://127.0.0.1:5000/users/update');
    expect(req.request.method).toEqual('PUT');
  });

  it('should make post request', function () {
    component.logout();
    const req = httpTestingController.expectOne('http://127.0.0.1:5000/users/logout');
    expect(req.request.method).toEqual('POST');
  });

});
