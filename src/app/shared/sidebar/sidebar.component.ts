import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild("acordion_admin") acordion_admin: ElementRef;
  @ViewChild("acordion_pedidos") acordion_pedidos: ElementRef;
  @ViewChild("acordion_reportes") acordion_reportes: ElementRef;
  

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {

  }

  openSubmenu(name: string){
  let element: ElementRef;
  let submenu: HTMLElement;
  switch (name){
    case 'administrar': element = this.acordion_admin;
      break;
    case 'pedidos': element = this.acordion_pedidos;
        break;
    case 'reportes': element = this.acordion_reportes;
        break;
        
  }  
    
    submenu = element.nativeElement.querySelector('.submenu');
    if((element.nativeElement as HTMLElement).classList.contains('show')){
      this.renderer2.setStyle(submenu, 'display', 'none');
      this.renderer2.removeClass(element.nativeElement, 'show');
    }else{
      this.renderer2.setStyle(submenu, 'display', 'block');
      this.renderer2.addClass(element.nativeElement, 'show');
    }
      
  }
  
}
