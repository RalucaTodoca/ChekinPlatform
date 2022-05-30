import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Feature } from '../classes/feature';
import { FeatureService } from '../services/feature/feature.service';

@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.scss']
})
export class EditFeatureComponent implements OnInit {

  public editFeatureId: number | undefined;
  public editFeature: Feature | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private featureService: FeatureService,
    private router: Router) { }

  public editFeatureForm = this.formBuilder.group({
    name:[]
  });

  public getEditFeatureId(): void{
    this.featureService.getEditFeatureId().subscribe(
      featureId => this.editFeatureId = featureId
    );
  }

  public getEditFeature(): void{
    if(this.editFeatureId !== undefined){
      this.featureService.getFeatueById(this.editFeatureId).subscribe(
        (response: Feature) => {
          console.log(response);
          this.editFeature = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public updateFeature(editFeatureForm: FormGroup): void{
    if (this.editFeature !== undefined && this.editFeatureId !== undefined){
      this.featureService.updateFeature(editFeatureForm.value, this.editFeatureId).subscribe(
        (response: Feature) => {
          console.log(response);
          this.router.navigateByUrl('features');
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getEditFeatureId();
    this.getEditFeature();
  }


}
