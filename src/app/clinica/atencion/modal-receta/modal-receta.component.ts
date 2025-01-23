import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-receta',
  imports: [],
  templateUrl: './modal-receta.component.html',
  styleUrl: './modal-receta.component.css'
})
export class ModalRecetaComponent {
  @Input() isVisible = false;
  @Input() title = 'Título';
  @Input() showCloseButton = true;

  @Output() closeEvent = new EventEmitter<void>

  close(){
    this.isVisible = false;
    this.closeEvent.emit();
  }
  
}
