import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TrainingService } from "../../services/training.service";
import { StopTrainingComponent } from "../stopTraining/stopTraining.component";

@Component({
    selector: 'ft-current-training',
    templateUrl: './currentTraining.component.html',
    styleUrls: ['./currentTraining.component.css']
})
export  class CurrentTrainingComponent implements OnInit{
    progress = 0;
    timer;

    constructor(private dialog: MatDialog, private trainingService: TrainingService){}

    ngOnInit(): void {
        this.startOrResumeTimer();
    }

    startOrResumeTimer() {
        const step = this.trainingService.getRunningExercise().duration /100 * 1000;
        this.timer = setInterval(()=> {
            this.progress += 1;
            if(this.progress>=100){
                this.trainingService.completeExercise();
                clearInterval(this.timer);
            }
        }, step)
    }

    onStop() {
        clearInterval(this.timer);
        //We can pass some variable using "data" to the StopTrainingComponent with automatic token
        //MAT_DIALOG_DATA (see StopTrainingComponent)
        const dialogRef = this.dialog.open(StopTrainingComponent, {data: 
        {progress: this.progress}}
        )
        dialogRef.afterClosed().subscribe( result => {
            if(result){
                this.trainingService.cancelExercise(this.progress)
            }
            else{
                this.startOrResumeTimer()
            }
        })
    }
}