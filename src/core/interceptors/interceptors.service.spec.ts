import { TestBed, async, inject, waitForAsync } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { SecurityService } from '@core/security/security.service';
import { InterceptorsService } from './interceptors.service';
import { HttpClientJsonpModule } from '@angular/common/http';

describe('Service: Interceptor ', () => {
  let mService: InterceptorsService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [SecurityService]
    });

    mService = TestBed.inject(InterceptorsService);
    httpMock = TestBed.inject(HttpTestingController);
  }));
  it('should create', () => {
    expect(mService).toBeTruthy();
  });
});

