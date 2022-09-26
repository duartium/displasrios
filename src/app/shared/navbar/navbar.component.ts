import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string;
  @ViewChild('menuUsuarios', { static: false }) menuUsuarios: ElementRef;
  isMenuOpen: boolean;

  constructor(private userService: UsersService,
    private render: Renderer2) {
      this.isMenuOpen = false; 
    this.setCurrentUsernama();
  }

  ngOnInit(): void {
  }

  setCurrentUsernama(){
    this.userService.getProfile().subscribe(resp => {
      const userProfile: User = resp.data;
      this.username = userProfile.fullname;
      console.log(userProfile);
    }, (err) => {
      console.log('ERR GETPROFILE', err);
    });
  }

  showMenuUser(){
      if(this.isMenuOpen){
        this.render.removeClass(this.menuUsuarios.nativeElement, "show");
      }else{
        this.render.addClass(this.menuUsuarios.nativeElement, "show");
      }
      this.isMenuOpen = !this.isMenuOpen;
  }

}
