import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TrainingService } from "../../services/training.service";
import { ExerciseInterface } from "../../types/exercise.interface";

@Component({
    selector: 'ft-new-training',
    templateUrl: './newTraining.component.html',
    styleUrls: ['./newTraining.component.css']
})
export class NewTrainingComponent implements OnInit {
    exercises: ExerciseInterface[] = [];

    constructor(private trainingService: TrainingService){}

    ngOnInit(): void {
        this.exercises = this.trainingService.getAvailableExercises();
    }

    onStartTraining(form: NgForm):void {
        this.trainingService.startExercise(form.value.exercise)
    }
}