import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.less']
})
export class DrawerComponent implements OnInit {


  @ViewChild('canvas', {static: true}) canvasEl: ElementRef;

  public targetImage: string = "https://camera-monitor-server-d.parkone.cn/projects/ec206df8f8d911ea9d110242ac1b0005/cameras/356802050055432/last_image"

  constructor() {
  }

  ngOnInit(): void {
    this.drawImage();
  }


  private drawImage() {
    let context = this.canvasEl.nativeElement.getContext('2d');
    let img = new Image();
    img.src = this.targetImage;
    img.onload = () => {
      console.log(img)
      context.drawImage(img, 0, 0, this.canvasEl.nativeElement.width, this.canvasEl.nativeElement.height)
    }
  }
}
