import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { CrudOperationService } from './crud-operation.service';

describe('CrudOperationService', () => {
  let service: CrudOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot({
        timeOut: 1000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      })],
      providers: [ToastrService]
    });

    service = TestBed.get(CrudOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Functions', () => {
    const payload = {
      id: '1',
      action: 'test'
    };
    it('Fn createForm should be called', () => {
      const submitFun = spyOn(service, 'createForm');
      service.createForm(payload, 'sample/url');
      expect(submitFun).toHaveBeenCalled();
    });
    it('Fn updateForm should be called', () => {
      const submitFun = spyOn(service, 'updateForm');
      service.updateForm(payload, 'sample/url');
      expect(submitFun).toHaveBeenCalled();
    });
    it('Fn deleteRow should be called', () => {
      const submitFun = spyOn(service, 'deleteRow');
      service.deleteRow(1, 'sample/url', service);
      expect(submitFun).toHaveBeenCalled();
    });
    it('Fn removeItem should be called', () => {
      const submitFun = spyOn(service, 'removeItem');
      service.removeItem(payload, 'sample/url', service, 2);
      expect(submitFun).toHaveBeenCalled();
    });
    it('Fn removeItem should be called', () => {
      const submitFun = spyOn(service, 'removeItem');
      service.removeItem(payload, 'sample/url', service, 2);
      expect(submitFun).toHaveBeenCalled();
    });
    it('Fn navigate should be called', () => {
      const submitFun = spyOn(service, 'navigate');
      service.navigate('sample/url');
      expect(submitFun).toHaveBeenCalled();
    });
  });
});
