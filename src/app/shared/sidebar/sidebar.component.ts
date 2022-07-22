import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild("acordion_menu") acordion_menu: ElementRef;

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {

  }

  openSubmenu(name: string){
  let element: ElementRef;

  switch (name){
    case 'administrar':
      element = this.acordion_menu.nativeElement.querySelector('.submenu');
      break;
    }  

    if((this.acordion_menu.nativeElement as HTMLElement).classList.contains('show')){
      this.renderer2.setStyle(element, 'display', 'none');
      this.renderer2.removeClass(this.acordion_menu.nativeElement, 'show');
      console.log('SI');
    }else{
      this.renderer2.setStyle(element, 'display', 'block');
      this.renderer2.addClass(this.acordion_menu.nativeElement, 'show');
      console.log('NO');
    }
      
  }
  
}
