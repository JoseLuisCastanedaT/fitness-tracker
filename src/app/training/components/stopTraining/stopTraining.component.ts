import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'ft-stop-training',
    templateUrl: './stopTraining.component.html',
    styleUrls: ['./stopTraining.component.css']
})
export class StopTrainingComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

}