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

  openSubmenu(e){
    console.log(e.target);
    const itemMenu = e.target;
    this.renderer2.addClass(itemMenu, 'show');
  }
  
}
