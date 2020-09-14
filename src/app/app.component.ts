import {
  ValueAxis,
  CircleBullet,
  XYCursor,
  XYChart,
  LineSeries,
  DateAxis
} from "@amcharts/amcharts4/charts";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import { color, create, useTheme } from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  HostListener,
  ViewEncapsulation,
  ElementRef
} from "@angular/core";
import { MouseCursorStyle } from "@amcharts/amcharts4/core";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";
import { startOfDay, endOfDay, addHours } from "date-fns";
useTheme(am4themes_animated);
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private formBuilder: FormBuilder
  ) {}

  chart: am4charts.XYChart = new am4charts.XYChart();
  @ViewChild("chartDiv1", { static: false }) chartDiv1: ElementRef;

  ngOnInit() {
    let chart = am4core.create("chartdiv_1", am4charts.XYChart);
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let consumptionAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let demandAxis = chart.yAxes.push(new am4charts.ValueAxis());
    demandAxis.renderer.opposite = true;
    let weatherAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let consumptionSeries = chart.series.push(new am4charts.ColumnSeries());

    let demandSeries = chart.series.push(new am4charts.LineSeries());
    let weatherSeries = chart.series.push(new am4charts.LineSeries());
    this.zone.runOutsideAngular(() => {




      chart.dateFormatter.inputDateFormat = "i";
      // dateAxis.timezone = 'Asia/Kolkata';
      dateAxis.timezone = 'America/Chicago';



      chart.cursor = new XYCursor();
      chart.cursor.behavior = "panX";

      chart.cursor.behavior = "selectXY";
      // let consumptionState = consumptionSeries.columns.template.states.create(
      //   "hover"
      // );
      chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.series.push(consumptionAxis);
      // consumptionState.properties.fillOpacity = 0.9;
      demandSeries.dataFields.valueY = "demand";
      demandSeries.dataFields.dateX = "time";
      dateAxis.renderer.minGridDistance = 80;

      let consumptionState = consumptionSeries.columns.template.states.create(
        "hover"
      );
      consumptionSeries.dataFields.valueY = "consumption";
      consumptionSeries.dataFields.dateX = "time";

      this.chart = chart;
      this.chart.data = this.generateChartData(0);
      weatherSeries.dataFields.valueY = "demand";
      weatherSeries.dataFields.dateX = "time";
      setTimeout(() => {
        (this.chart.series
          .values[2] as am4charts.LineSeries).data = this.generateChartData(1);
      }, 200);
      (this.chart.xAxes.values[0] as am4charts.DateAxis).zoomToDates(
        startOfDay(new Date()),
        endOfDay(new Date()),
        true,
        true
      );
    });
  }

  generateChartData(isWeather) {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 100);
    firstDate.setHours(0, 0, 0, 0);
    var newDate = new Date(firstDate);
    var consumption = 1600;
    var demand = 1600;
    var temperature = 1600;

    let step = 0;
    for (var i = 0; i < 40; i++) {
      // we create date objects here. In your data, you can have date strings
      // and then set format of your dates using chart.dataDateFormat property,
      // however when possible, use date objects, as this will speed up chart rendering.

      newDate = addHours(newDate, 1);
      // newDate.setMinutes(newDate.getMinutes() + i);

      if (step >= 60) {
        step = 0;
      } else {
        step = step + 5;
      }

      consumption += Math.round(
        (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
      );
      demand += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      temperature += Math.round(
        (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
      );

      chartData.push({
        time: newDate.toUTCString(),
        consumption: consumption,
        demand: demand,
        temperature: temperature
      });
    }
    console.log(chartData);
    chartData = [{time: "Sat, 06 Jun 2020 05:00:00 GMT", consumption: 1604, demand: 1591, temperature: 1593},
{time: "Sat, 06 Jun 2020 06:00:00 GMT", consumption: 1611, demand: 1587, temperature: 1601},
{time: "Sat, 06 Jun 2020 07:00:00 GMT", consumption: 1616, demand: 1594, temperature: 1606},
{time: "Sat, 06 Jun 2020 08:00:00 GMT", consumption: 1617, demand: 1602, temperature: 1602},
{time: "Sat, 06 Jun 2020 09:00:00 GMT", consumption: 1617, demand: 1592, temperature: 1612},
{time: "Sat, 06 Jun 2020 10:00:00 GMT", consumption: 1620, demand: 1587, temperature: 1608},
{time: "Sat, 06 Jun 2020 11:00:00 GMT", consumption: 1627, demand: 1590, temperature: 1603},
{time: "Sat, 06 Jun 2020 12:00:00 GMT", consumption: 1627, demand: 1588, temperature: 1601},
{time: "Sat, 06 Jun 2020 13:00:00 GMT", consumption: 1618, demand: 1580, temperature: 1603},
{time: "Sat, 06 Jun 2020 14:00:00 GMT", consumption: 1615, demand: 1575, temperature: 1598},
 {time: "Sat, 06 Jun 2020 15:00:00 GMT", consumption: 1608, demand: 1580, temperature: 1606},
 {time: "Sat, 06 Jun 2020 16:00:00 GMT", consumption: 1600, demand: 1590, temperature: 1605},
 {time: "Sat, 06 Jun 2020 17:00:00 GMT", consumption: 1609, demand: 1585, temperature: 1602},
 {time: "Sat, 06 Jun 2020 18:00:00 GMT", consumption: 1616, demand: 1593, temperature: 1608},
 {time: "Sat, 06 Jun 2020 19:00:00 GMT", consumption: 1607, demand: 1598, temperature: 1617},
 {time: "Sat, 06 Jun 2020 20:00:00 GMT", consumption: 1617, demand: 1590, temperature: 1620},
 {time: "Sat, 06 Jun 2020 21:00:00 GMT", consumption: 1621, demand: 1582, temperature: 1624},
 {time: "Sat, 06 Jun 2020 22:00:00 GMT", consumption: 1617, demand: 1574, temperature: 1633},
 {time: "Sat, 06 Jun 2020 23:00:00 GMT", consumption: 1618, demand: 1567, temperature: 1643},
 {time: "Sun, 07 Jun 2020 00:00:00 GMT", consumption: 1623, demand: 1564, temperature: 1649},
 {time: "Sun, 07 Jun 2020 01:00:00 GMT", consumption: 1619, demand: 1561, temperature: 1648},
 {time: "Sun, 07 Jun 2020 02:00:00 GMT", consumption: 1625, demand: 1566, temperature: 1640},
 {time: "Sun, 07 Jun 2020 03:00:00 GMT", consumption: 1624, demand: 1569, temperature: 1641},
 {time: "Sun, 07 Jun 2020 04:00:00 GMT", consumption: 1618, demand: 1565, temperature: 1633},
 {time: "Sun, 07 Jun 2020 05:00:00 GMT", consumption: 1625, demand: 1575, temperature: 1630},
 {time: "Sun, 07 Jun 2020 06:00:00 GMT", consumption: 1619, demand: 1583, temperature: 1624},
 {time: "Sun, 07 Jun 2020 07:00:00 GMT", consumption: 1618, demand: 1588, temperature: 1624},
 {time: "Sun, 07 Jun 2020 08:00:00 GMT", consumption: 1624, demand: 1587, temperature: 1619},
 {time: "Sun, 07 Jun 2020 09:00:00 GMT", consumption: 1621, demand: 1580, temperature: 1620},
 {time: "Sun, 07 Jun 2020 10:00:00 GMT", consumption: 1622, demand: 1584, temperature: 1617},
 {time: "Sun, 07 Jun 2020 11:00:00 GMT", consumption: 1623, demand: 1576, temperature: 1611},
 {time: "Sun, 07 Jun 2020 12:00:00 GMT", consumption: 1614, demand: 1579, temperature: 1605},
 {time: "Sun, 07 Jun 2020 13:00:00 GMT", consumption: 1618, demand: 1587, temperature: 1606},
 {time: "Sun, 07 Jun 2020 14:00:00 GMT", consumption: 1615, demand: 1582, temperature: 1606},
 {time: "Sun, 07 Jun 2020 15:00:00 GMT", consumption: 1610, demand: 1590, temperature: 1611},
 {time: "Sun, 07 Jun 2020 16:00:00 GMT", consumption: 1606, demand: 1599, temperature: 1621},
 {time: "Sun, 07 Jun 2020 17:00:00 GMT", consumption: 1603, demand: 1605, temperature: 1619},
 {time: "Sun, 07 Jun 2020 18:00:00 GMT", consumption: 1610, demand: 1597, temperature: 1623},
 {time: "Sun, 07 Jun 2020 19:00:00 GMT", consumption: 1602, demand: 1596, temperature: 1619},
 {time: "Sun, 07 Jun 2020 20:00:00 GMT", consumption: 1601, demand: 1602, temperature: 1623}]
    return chartData;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      console.log("graph disposed");
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
