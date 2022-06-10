import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormButtonsComponent } from './form-buttons/form-buttons.component';
import {NumericTextBoxModule, TextBoxModule, UploaderModule} from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DatePipe } from '@angular/common';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { AccumulationAnnotationService, AccumulationChartModule, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, PieSeriesService } from '@syncfusion/ej2-angular-charts';
import {
  GridModule,
  DetailRowService,
  PageService,

  SortService,
  FilterService,
  GroupService,
  ReorderService,
  ResizeService,
  ToolbarService,
  SearchService,
  CommandColumnService,
  EditService,
  ColumnChooserService,
  ExcelExportService,
  PdfExportService,
} from '@syncfusion/ej2-angular-grids';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { AppdivBreadCrumbModule } from 'appdiv-bread-crumb';
import {
  SidebarModule,
  MenuAllModule,
  TreeViewAllModule,
} from '@syncfusion/ej2-angular-navigations';
import {
  CheckBoxModule,
  RadioButtonModule,
  ButtonModule,
  ChipListModule,
  SwitchModule,
} from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ChartAllModule, ChartModule, SparklineModule, TooltipService } from '@syncfusion/ej2-angular-charts';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageIdentityComponent } from './page-identity/page-identity.component';
@NgModule({
  declarations: [FormButtonsComponent, PageIdentityComponent],
  imports: [
    CommonModule,
    GridModule,
    CheckBoxModule,
    ButtonModule,
    TextBoxModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    AccumulationChartModule
  ],
  exports: [
    AppdivBreadCrumbModule,
    CheckBoxModule,
    ButtonModule,
    DropDownListModule,
    SidebarModule,
    ListViewAllModule,
    RadioButtonModule,
    TreeViewAllModule,
    MenuAllModule,
    GridModule,
    FormButtonsComponent,
    TextBoxModule,
    NumericTextBoxModule,
    FormsModule,
    ReactiveFormsModule,
    TabModule,
    UploaderModule,
    DatePickerModule,
    SparklineModule,
    ChartModule,
    ChartAllModule,
    ChipListModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    DropDownButtonModule,
    RadioButtonModule,
    AccumulationChartModule,
    SwitchModule,
    PageIdentityComponent
  ],
  providers: [
    DetailRowService,
    PageService,
    SortService,
    FilterService,
    GroupService,
    ReorderService,
    ResizeService,
    ToolbarService,
    SearchService,
    CommandColumnService,
    EditService,
    ColumnChooserService,
    ExcelExportService,
    PdfExportService,
    TooltipService,
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationDataLabelService,
    AccumulationAnnotationService,
    DatePipe
  ],
})
export class SharedModule { }
