import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
export interface AlertSimpleProp {
  icon: "warning" | "error" | "success" | "info" | 'question';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  constructor() { }

  show(props: AlertSimpleProp, handler?: () => void) {
    if (handler) {
      Swal.fire({
        title: props.title,
        text: props.message,
        confirmButtonText: 'Ok',
        icon: props.icon
      }).then((result) => {
        if (result.isConfirmed) {
          handler();
        }
      })
    } else {
      Swal.fire(props.title, props.message, props.icon);
    }
  }

  api() {
    return (res: any) => {
      this.show({
        title: res?.isSuccess ? 'Success' : 'Error',
        message: res?.message,
        icon: res?.isSuccess ? 'success' : 'error'
      })
    }
  }
  error() {
    return () => {
      this.show({
        title: 'HTTP Error',
        message: 'Unable to access API !!',
        icon: 'error'
      })
    }
  }

  single(message: string, icon: "warning" | "error" | "success" | "info" | 'question') {
    Swal.fire('Alert', message, icon);
  }


}
