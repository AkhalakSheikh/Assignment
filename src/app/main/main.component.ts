import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import * as Highcharts from 'highcharts';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, MatDialogModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers:[HttpClient]
})
export class MainComponent implements OnInit{

  data:any = [];
  sourcedata:any = [];
  chart:any;
  checked = false;
  span : any;
  dynamicWidth:any = [];
constructor(private common:CommonService,private dialog: MatDialog){

}

ngOnInit() {
 this.common.getdata().subscribe((res)=>{
  this.sourcedata = res; 
  this.data = res ;
  res.grid_data.forEach((el:any)=>{
    this.dynamicWidth.push(el.license_used.toString() + '%');
  });
  console.log(res.grid_data);
  });






  const chartOptions: Highcharts.Options = {
    chart: {
        type: 'column',
        renderTo: 'container',
        width: 800,
        height: 200
    },
    colors: [],

    title: {
        text: ''
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true,
        accessibility: {
            description: 'Months'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Security Rating'
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        column: {
            pointPadding: 0, // No padding between columns
            borderWidth: 0,
            grouping: false, 
            shadow: false, 
        }
    },
    series: [
      {
        name: 'Month',
        type: 'column',
        pointWidth: 25, 
        color: '#E9D8FD', // light purple/gray
        data: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
        showInLegend: true
      },
      {
        name: 'Month',
        type: 'column',
        pointWidth: 25, 
        data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
        color: '#9F7AEA', // medium purple
        showInLegend: false
      },
      {
        name: 'Month',
        type: 'column',
        pointWidth: 25, 
        data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
        color: '#6B46C1', // dark purple
        showInLegend: false
      }
    ]
} as any;

const chartOptions1: Highcharts.Options ={
  chart: {
    renderTo: 'containerdounat',
    type: 'pie', // Required for pie
    width: 400,
    height: 200,
    plotBackgroundColor: undefined,
    plotBorderWidth: 0,
    plotShadow: false,
    events: {
      render: function () {
        const chart = this as unknown as Highcharts.Chart & { customLabel?: Highcharts.SVGElement };
        const series = chart.series[0];

        const centerX = series.center[0] + chart.plotLeft;
        const centerY = series.center[1] + chart.plotTop;

        const valueToShow = '240';

        if (!chart.customLabel) {
          chart.customLabel = chart.renderer
            .label(valueToShow, 0, 0, '', 0, 0, true)
            .css({
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#000',
              textAlign: 'center',
            })
            .add();
        } else {
          chart.customLabel.attr({ text: valueToShow });
        }

        chart.customLabel.attr({
          x: centerX - chart.customLabel.getBBox().width / 2,
          y: centerY - chart.customLabel.getBBox().height / 2
        });
      }
    }
    
  },
  colors: ['#6B46C1', '#E9D8FD'], 
  title: {
    text: '', 
    align: 'center',
    verticalAlign: 'middle',
    y: 60,
    style: {
      fontSize: '1.1em'
    }
  },
  
  tooltip: {
    valueSuffix: ''
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: false,
        distance: -30,
        style: {
          fontWeight: 'bold',
          color: 'white',
          
        }
      },
      startAngle: -90,
      endAngle: 90,
      center: ['50%', '75%'],
      size: '100%'
    }
  },
  series: [
    {
      type: 'pie',
      name: 'Month',
      innerSize: '70%',
      data: [
        { name: 'Used', y: 70, },
        { name: 'Remaining', y: 30 }
      ],
      showInLegend: false
    }
  ]
}as any;

Highcharts.chart(chartOptions);
Highcharts.chart(chartOptions1);
  
}

checkall(){
  this.checked = !this.checked; 
  for(let i=0;i<this.data.grid_data.length;i++){
    this.data.grid_data[i].checked = this.checked;
  }
}

delete(index:any, event:any, name:any, sname:any){
  var result = window.confirm(`Are you sure you want to delete ${name}${sname}`);

if (result) {
  this.data.grid_data.splice(index, 1);
  event.preventDefault();
} else {
  event.preventDefault();
}
  
}

openDialog(name:any,sername:any,event:any) {
  event.preventDefault();
  const dialogRef = this.dialog.open(DialogContentComponent, {
    data: {
      message: `${name}${sername}`
    }
  });

  

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog was closed with result:', result);
  });

 
}


}

@Component({
  selector: 'app-dialog-content',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./main.component.scss']
})
export class DialogContentComponent {

  massage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogContentComponent> ) {
  }

  

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}


