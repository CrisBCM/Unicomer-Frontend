import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent {
  @Input() modalTitle:string = "";
  @Input() modalMsg:string = "";
  @Output() cancel = new EventEmitter<void>;
  @Output() confirm = new EventEmitter<void>;

  constructor(){

  }

}
