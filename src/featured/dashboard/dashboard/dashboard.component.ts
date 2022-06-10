import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(public crudService: CrudOperationService, public httpCancelService: HttpCancelService) {}
  public contour: any = [3, 6, 4, 1, 3, 2, 5];
  public primaryXAxis: Object;
  public tooltip: Object;
  public chartData: Object[];
  public title: string;
  public primaryYAxis: Object;
  public pageSettings: PageSettingsModel;
  public piedata: Object[];
  public enableSmartLabels: boolean;

  public map: Object = 'fill';
  public datalabel: Object;

  totalOrders: number;
  totalIncome: number;
  totalCustomer: number;
  totalPending: number;
   status: any;
   total: any;

   order_summery: any = [{ text: 'no data available', x: 100, y: 100 }];

  public legendSettings: Object = {
    visible: false
};
  public recent_orders: object[];

  columens = [
    {
      field: 'order_number',
      headerText: 'Order #',
      textAlign: 'left',
      width: 100,
      status: false,
      type: 'string',
    },
    {
        field: 'full_name',
        headerText: 'Order By',
        textAlign: 'left',
        width: 100,
        status: false,
        type: 'string',
    },
    {
        field: 'order_type',
        headerText: 'Order Type',
        textAlign: 'left',
        width: 100,
        status: false,
        type: 'string',
    },
    {
        field: 'price',
        headerText: 'Price',
        textAlign: 'left',
        format: 'N3',
        width: 100,
        status: false,
        type: 'string',
    },
    {
        field: 'status',
        headerText: 'Status',
        textAlign: 'center',
        width: 100,
        status: true,
        type: 'string',
    }
  ];

  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();
  }

  ngOnInit(): void {


    this.getCardContent();
    this.getPieChartContent();
    this.getSalesChartContent();

    this.tooltip = {
      enable: true
  };

    this.primaryXAxis = {
        title: 'Day',
        valueType: 'Category'
    };
    this.primaryYAxis = {
      title: 'Amount',
        labelFormat: 'ETB {value}'
    };

    this.pageSettings = { pageSize: 5 };

    this.datalabel = { visible: true,  position: 'Outside' };
    this.enableSmartLabels = true;

  }

  ngAfterViewInit(){
    this.getrecentOrders();

  }

  getCardContent(){
  this.crudService.list('util/dashboard/cards').subscribe((res: any) => {
      this.totalOrders = res.data.total_order;
      this.totalIncome = res.data.total_income;
      this.totalCustomer = res.data.total_consumer;
      this.totalPending = res.data.total_pending;
    });
  }

  getPieChartContent(data = null){
    let payload = null;

    if (data){
      data[0] = new Date(data[0] + 'UTC');
      data[1] = new Date(data[1] + 'UTC');

      payload = { start: data[0], end: data[1] };

    }

    this.crudService.post(payload, '/util/dashboard/order_summery').subscribe((res: any) => {
      this.order_summery = res.data.summery;
    });

  }
  getrecentOrders(){
    this.crudService.list('/util/dashboard/recent_orders').subscribe((res: any) => {
      this.recent_orders = res.data;
    });

  }

  getSalesChartContent(){
    this.crudService.list('/util/dashboard/total_sales').subscribe((res: any) => {
      this.chartData = res.data;
    });

  }

}
