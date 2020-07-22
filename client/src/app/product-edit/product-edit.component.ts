import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Product } from './../models/product.model';

import { ProductApiService } from './../services/product-api.service';
import { UiStateService } from './../services/ui-state.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  _id = '';
  slug = '';
  productName = '';
  productDesc = '';
  productContent = '';
  productImg = '';

  imageSrc: string;

  constructor(
    private titleService: Title,
    private productApi: ProductApiService,
    private UiState: UiStateService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Agri Permata | Dashboard - edit Product');
    // this.product = this.productApi.getProduct()
    this.getProduct(this.activatedRoute.snapshot.params.slug);
    this.productForm = this.formBuilder.group({
      productName : [null, Validators.required],
      productDesc : [null, Validators.required],
      productContent : [null, Validators.required],
      productImg : [null, Validators.required],
    })
    // this.activatedRoute.params.subscribe(params => {
    //   const slug = params.slug;
    //   // console.log(slug);

    // });
  }

  getProduct(slug: any) {
    this.productApi.getProduct(slug).subscribe((data: any) => {
      // console.log(data.data);
      this._id = data.data._id;
      this.slug = data.data.slug;
      this.productForm.setValue({
        productName: data.data.name,
        productDesc: data.data.description,
        productContent: data.data.content,
        productImg: data.data.imageUrl
      });

      this.imageSrc = data.data.imageUrl as string;
    });


  }

  onFormSubmit(): void {
    // console.log(this.productForm.value);
    // console.log(this.productForm.get('productImg').value);
    this.productApi.updateProduct(this._id, this.productForm.value, this.productForm.get('productImg').value)
      .subscribe((res: any) => {
        // console.log(res);
        this.router.navigate(['/dashboard/products']);
        this.UiState.showMessage('success' , 'Success', 'Upload successfull');
        console.log('Update data successfully');
      }, (err: any) => {
        this.UiState.showMessage('error', 'Error', 'Upload failed');
        console.log(err);
      });
  }

  onFileChange(event) {
    const reader = new FileReader();
    // console.log(event.target.files);
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.productForm.patchValue({
        productImg: event.target.files[0]
      });
      // console.log(this.productForm.get('productImg').value);
      reader.readAsDataURL(file);

      reader.onload = () => {
        // console.log(reader.result);
        this.imageSrc = reader.result as string;
      };

    }


  }

  backClicked(): void {
    this.UiState.backClicked();
  }

  resetForm() {
    this.getProduct(this.activatedRoute.snapshot.params.slug);
  }

}
