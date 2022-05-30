import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Feature } from '../classes/feature';
import { FeatureService } from '../services/feature/feature.service';

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.scss']
})
export class AddFeatureComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private featureService: FeatureService,
    private router: Router
  ) { }

  public featureForm = this.formBuilder.group({
    name:['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/)]]
  });

  public addFeature(featureForm: FormGroup): void{
    this.featureService.addFeature(featureForm.value).subscribe(
      (response: Feature) => {
        console.log(response);
        this.router.navigateByUrl('features');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit(): void {
  }

}
