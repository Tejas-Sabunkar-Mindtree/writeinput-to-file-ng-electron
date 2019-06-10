import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('inputId') inputId;

  constructor(private electronService: ElectronService) {}
  desktopPath;

  ngOnInit() {
    this.desktopPath = this.electronService.remote.app.getPath('desktop');
  }

  submit() {
    console.log(this.inputId.nativeElement.value);
    this.writeToMyFile(this.inputId.nativeElement.value);
  }
  writeToMyFile(text) {
    const remote = this.electronService.remote;
    const fs = remote.require('fs');
    fs.writeFile(this.desktopPath + '/myfile.txt', text, console.log);
  }
}
