import { TestBed, async, inject, waitForAsync } from '@angular/core/testing';
import { SecurityService } from './security.service';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';

describe('Service: Security service ', () => {
  let mService: SecurityService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [SecurityService]
    });

    mService = TestBed.inject(SecurityService);
    httpMock = TestBed.inject(HttpTestingController);
  }));
  it('should create', waitForAsync(inject([SecurityService], (service: SecurityService) => {
    expect(service).toBeTruthy();
  })));
});

