import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature } from '../classes/feature';
import { FeatureService } from '../services/feature/feature.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  public features: Feature[] | undefined;

  constructor(
    private featureService: FeatureService,
    private router: Router) { }

  public getFeatures(): void{
    this.featureService.getFeatures().subscribe(
      (response: Feature[]) => {
        this.features = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteFeature(featureId: number): void{
    this.featureService.deleteFeature(featureId).subscribe(
      (response: void) => {
        console.log(response);
        this.getFeatures();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditFeature(featureId: number): void{
    this.featureService.setEditFeatureId(featureId);
    this.router.navigateByUrl('edit-feature');
  }

  public goToAddFeature(){
    this.router.navigateByUrl('add-feature');
  }

  public openConfirmationDialog(featureId: number, featureName: string): void{
    Swal.fire({
      title: 'Are you sure?',
      text: featureName + " will be removed from all classrooms",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeleteFeature(featureId);
        Swal.fire(
          'Deleted!',
          featureName + ' has been removed',
          'success'
        )
      }
    })
  }

  ngOnInit(): void {
    this.getFeatures();
  }

}
