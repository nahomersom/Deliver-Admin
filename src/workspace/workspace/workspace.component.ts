import { T } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { NodeSelectEventArgs, SidebarComponent, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit{
  constructor(public router: Router, public security: SecurityService, private toastr: ToastrService) {
    this.toastr.toastrConfig.enableHtml = true;

  }
  @ViewChild('sidebarTreeviewInstance')
  public sidebarTreeviewInstance: SidebarComponent;
  @ViewChild('tree') tree: TreeViewComponent;
  public notification: number;
  public width = '290px';
  public mediaQuery: string = ('(min-width: 600px)');
  public target = '.main-content';
  public index: number;
  public orders = [{
    id: 1,
    orderTitle: 'hi',
    orderContent: 'urgent order',
    date: '11-20-2021'
    },
    {
    id: 1,
    orderTitle: 'hi',
    orderContent: 'order around piassa',
    date: '11-20-2021'
    },
    {
    id: 1,
    orderTitle: 'hi',
    orderContent: 'order canceled',
    date: '11-20-2021'
    },
    {
    id: 1,
    orderTitle: 'hi',
    orderContent: 'urgent order',
    date: '11-20-2021'
    }


    ];



  public dropdownItems: ItemModel[] = [
  {
      text: 'Change password', id: '1'
  },
  {
      text: 'Update Profile', id: '2'
  },
  {
    separator : true
  },
  {
      text: 'Logout', id: '3'
  }];

  public data: Object[] = [
      {
          nodeId: '01', nodeText: 'Dashboard', iconCss: 'icon-dashboard icon', url: 'ws', page: 'Dashboard',
      },
      {
          nodeId: '02', nodeText: 'Vehicle & Drivers', iconCss: 'icon-vehicle icon', expanded: true, url: null, page: null,
          nodeChild: [
            { nodeId: '02-01', nodeText: 'Drivers', iconCss: 'icon-user icon', url: 'ws/driver/list', page: 'Driver' },
            { nodeId: '02-02', nodeText: 'Vehicles', iconCss: 'icon-vehicle icon', url: 'ws/vehicle/list', page: 'Item' },
            { nodeId: '02-03', nodeText: 'Assign Vehicle for Driver', iconCss: 'icon-link icon', url: 'ws/assign/list', page: 'Assign' },
            { nodeId: '02-04', nodeText: 'Vehicle Type', iconCss: 'icon-vehicle icon', url: 'ws/vehicle_type/list', page: 'Type' },
            { nodeId: '02-05', nodeText: 'Order', iconCss: 'icon-order icon', url: 'ws/order/list', page: 'Order' }
          ]
      },
      {
          nodeId: '03', nodeText: 'Users & Group', iconCss: 'icon-group icon', expanded: true, url: null, page: null,
          nodeChild: [
              { nodeId: '03-01', nodeText: 'System', iconCss: 'icon-user icon', url: 'ws/system/list', page: 'System' },
              { nodeId: '03-02', nodeText: 'Merchant', iconCss: 'icon-user icon', url: 'ws/merchant/list', page: 'Merchant' },
              { nodeId: '03-03', nodeText: 'Consumer', iconCss: 'icon-user icon', url: 'ws/consumer/list', page: 'Customer' },
              { nodeId: '03-04', nodeText: 'Groups', iconCss: 'icon-role icon', url: 'ws/group/list', page: 'Group' },

          ]
      },
      {
        nodeId: '04', nodeText: 'Settings', iconCss: 'icon-setting icon', expanded: true, url: 'ws/settings', page: 'Setting'
      },
      {
        nodeId: '05', nodeText: 'Lookup', iconCss: 'icon-lookup icon', expanded: true, url: 'ws/lookup/list', page: 'Lookup'
      },
      {
        nodeId: '06', nodeText: 'Language', iconCss: 'icon-language icon', expanded: true, url: 'ws/language/list', page: 'Language'
      }
  ];

  public field: Object = { dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss' };
  ngOnInit(): void {

   this.notification = this.orders.length;

   }

  public route(args: NodeSelectEventArgs): void {
    const data: any = this.tree.getTreeData(args.node);
    const routerLink: string = data[0].url;
    if (this.security.hasClaim(data[0].page, 'canView')){
      routerLink ? this.router.navigate([routerLink]) : null;

    } else {
      this.toastr.error('unauthorized to open this page.');
    }

  }

  openClick() {
    this.sidebarTreeviewInstance.toggle();
  }

  onSelect(value){
    if (value === 1){
      this.router.navigateByUrl('ws/change-password');
    }

    if (value === 2){
      this.router.navigateByUrl('ws/user-and-group/user/profile');
    }

    if (value === 3){
      if (confirm('are you sure want to logging out from the system ?')){
        this.security.logout();
        
      }
    }


  }



}
