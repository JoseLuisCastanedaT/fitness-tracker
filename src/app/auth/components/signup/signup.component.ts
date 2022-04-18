import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'ft-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    maxDate: Date;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.maxDate = new Date()
        this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
    }

    onSubmit(form: NgForm) {
        this.authService.registerUser({
            email: form.value.email,
            password: form.value.password
        })
    }
}