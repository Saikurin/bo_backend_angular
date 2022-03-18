import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-history-turnover',
    templateUrl: './history-turnover.component.html',
    styleUrls: ['./history-turnover.component.css']
})
export class HistoryTurnoverComponent implements OnInit {

    data = [{
        "name": "Janvier", "value": 200
    }]
    view: [number, number] = [700, 400];
    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';
    autoScale = true;
    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    onSelect($event: any) {

    }
}
