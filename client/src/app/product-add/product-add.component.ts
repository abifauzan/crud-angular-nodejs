import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductApiService } from '../services/product-api.service';
import { UiStateService } from './../services/ui-state.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})

// class ImageSnippet {
//   constructor(public src: string, public file: File) {}
// }

export class ProductAddComponent implements OnInit {

  // selectedFile: ImageSnippet;

  // productForm: FormGroup;
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  });
  imageSrc: string;

  // statusNav = '';

  constructor(
    private titleService: Title,
    // private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productApi: ProductApiService,
    private UiState: UiStateService
  ) { }

  ngOnInit(): void {
    // console.log('routes');
    // console.log(this.activatedRoute.snapshot.url);
    // console.log(this.activatedRoute.snapshot.url[0].path);

    this.titleService.setTitle('Agri Permata | Dashboard - add Product');
    // this.productForm = this.formBuilder.group({
    //   name : [null, Validators.required],
    //   description : [null, Validators.required],
    //   content : [null, Validators.required],
    //   image : [null, Validators.required]
    // });
  }

  onFileChange(event) {
    const reader = new FileReader();
    // console.log(event.target.files);
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.productForm.patchValue({
        imageUrl: event.target.files[0]
      });
      // console.log(event.target.files[0]);
      reader.readAsDataURL(file);

      reader.onload = () => {
        // console.log(reader.result);
        this.imageSrc = reader.result as string;
      };

    }


  }

  onFormSubmit(): void {
    // console.log(this.productForm.get('productImage').value);
    // console.log(this.productForm.get('imageUrl').value);
    this.productApi.addProduct(this.productForm.value, this.productForm.get('imageUrl').value)
      .subscribe((res: any) => {

          this.router.navigate(['/dashboard/products']);
          this.UiState.showMessage('success' , 'Success', 'Upload successfull');
          // console.log(res);
          console.log('Upload image successfull');


      }, (err: any) => {
        this.UiState.showMessage('error' , 'Error', 'Upload unsuccessfull');
        console.log(err);
      });
  }

  // onFormSubmit() {
  //   this.productApi.addProduct(this.productForm.value)
  //     .subscribe((res: any) => {
  //       const id = res.slug;
  //       this.router.navigate(['/dashboard/product/:slug', id]);
  //     }, (err: any) => {
  //       console.log(err);
  //     });
  // }

  resetForm() {
    this.imageSrc = '';
  }

  backClicked(): void {
    this.UiState.backClicked();
  }

}
