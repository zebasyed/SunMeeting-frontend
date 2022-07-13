import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticateService } from "../../services/authenticate.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})



export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  isSubmit = true ;
  isPasswordWrong = false;
  passwardRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  errorText = "Please Fill the Form";
  errorTextPassword = "Enter a Valid Password(minunum 6 , with minimum one capital lettter , one minimum special character and one minimum number)";
  ErrorLine;

  constructor(private authenticateService: AuthenticateService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userName: new FormControl("", Validators.required),
      emailId: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(this.passwardRegex),
      ]),
      confirmPassword: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
    });
  }

  ngDoCheck(){
    if (
      this.signupForm.value.password.trim() !==
      this.signupForm.value.confirmPassword.trim()
    ){
      this.isPasswordWrong = true;
    }else{
      this.isPasswordWrong = false;
    }
  }

  onSubmit(data) {

    if(!this.signupForm.valid){
      this.isSubmit = false
      if(this.signupForm.get('password').invalid){
        this.ErrorLine = this.errorTextPassword;
      }else {
        this.ErrorLine = this.errorText;
      }
      console.log(this.ErrorLine);
      return
    }

    
    this.authenticateService
      .registerUser(this.signupForm.value)
      .subscribe((result) => {});
  }

  validateFields() {}
}
