import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from './api.service';

describe('Service: Api serivice', () => {
  let nService: ApiService;
  let httpMock: HttpTestingController;
  const sampleUrl = 'sample/url';
  const mockData = [
    {
      id: '1',
      title: 'testing',
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });

    nService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('Should get data with getData method ', () => {
    nService.getData(sampleUrl).subscribe((data: any) => {
      expect(data).toBe(mockData);
    });
    const req = httpMock.expectOne((request) => {
      return true;
    });
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
    httpMock.verify();
  });
  it('Should create with create method ', () => {
    nService.create(mockData, sampleUrl).subscribe((data: any) => {
      expect(data).toBe(mockData);
    });
    const req = httpMock.expectOne((request) => {
      return true;
    });
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
    httpMock.verify();
  });
  it('Should update positions ', () => {
    const mockData = {
      A: '100',
      B: 20,
    };

    nService.update(mockData, sampleUrl).subscribe((data: any) => {
      expect(data).toBe(mockData);
    });
    const req = httpMock.expectOne((request) => {
      return true;
    });
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
    httpMock.verify();
  });
  it('Should get detail data with getSingleData method ', () => {
    nService.getSingleData(1, sampleUrl).subscribe((data: any) => {
      expect(data).toBe(mockData);
    });
    const req = httpMock.expectOne((request) => {
      return true;
    });
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
    httpMock.verify();
  });
  it('Should get detail data with getPost method ', () => {
    nService.getPost(mockData, sampleUrl).subscribe((data: any) => {
      expect(data).toBe(mockData);
    });
    const req = httpMock.expectOne((request) => {
      return true;
    });
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
    httpMock.verify();
  });
  it('Should delete row with delete method', () => {
    nService.delete(12, sampleUrl).subscribe((data: any) => {
      expect(data).toBe(12);
    });
    const req = httpMock.expectOne((request) => {
      return true;
    });
    expect(req.request.method).toBe('DELETE');

    req.flush(12);

    httpMock.verify();
  });
  it('Should remove row with remove method', () => {
    nService.remove(mockData, sampleUrl).subscribe((data: any) => {
      expect(data).toBe(mockData);
    });
    const req = httpMock.expectOne((request) => {
      return true;
    });
    expect(req.request.method).toBe('DELETE');

    req.flush(mockData);

    httpMock.verify();
  });
});
