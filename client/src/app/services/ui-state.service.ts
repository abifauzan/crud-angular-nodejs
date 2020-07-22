import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  constructor(
    private _location: Location,
    private toastr: ToastrService
  ) { }

  backClicked(): void {
    this._location.back();
  }

  showMessage(status: string, title: string, message: string): void {
    switch (status) {
      case 'success':
        this.toastr.success(title, message);
        break;
      case 'error':
        this.toastr.error(title, message);
        break;
    }
  }

}
