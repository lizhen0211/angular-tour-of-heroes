import {Directive, ElementRef, HostListener, ViewChild} from '@angular/core';

@Directive({
  selector: '[appRectDrawer]'
})
// 参考文档
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D
export class ShapeDrawerDirective {

  private context: CanvasRenderingContext2D = undefined;
  private canvas: any;

  private quadrilaterals: Array<Quadrilateral> = [];

  // private quadrilateral:Quadrilateral;

  //描点颜色
  private pointColor: string = '#F93D0B';
  //描点宽度
  private pointWidth: number = 10;
  //描点高度
  private pointHeight: number = 10;
  //线
  private linewidth: number = 2;
  private lineColor: string = '#F93D0B';
  //填充
  private fillStyle: string = 'rgba(255,255,255,0.77)';

  constructor(private el: ElementRef) {
    this.canvas = el.nativeElement;
    this.context = el.nativeElement.getContext('2d');
    this.quadrilaterals = new Array();
    this.quadrilaterals[0] = new Quadrilateral(new Point(0, 0), new Point(0, 0), new Point(0, 0), new Point(0, 0));
    this.quadrilaterals[1] = new Quadrilateral(new Point(0, 0), new Point(0, 0), new Point(0, 0), new Point(0, 0));
    this.quadrilaterals[2] = new Quadrilateral(new Point(0, 0), new Point(0, 0), new Point(0, 0), new Point(0, 0));
    this.quadrilaterals[3] = new Quadrilateral(new Point(0, 0), new Point(0, 0), new Point(0, 0), new Point(0, 0));
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    console.log("onMouseDown")
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event): void {
    console.log("mouseup")

    //添加当前鼠标点选的坐标
    for (let i = 0; i < this.quadrilaterals.length; i++) {
      if (!this.quadrilaterals[i].isFull()) {
        let quadrilateral: Quadrilateral = this.quadrilaterals[i];
        quadrilateral.addPoint(event.offsetX, event.offsetY);
        break;
      }
    }

    console.log("add");
    console.log(this.quadrilaterals);


    this.drawQuadrilaterals();
  }

  private drawQuadrilaterals() {
    for (let i = 0; i < this.quadrilaterals.length; i++) {
      //描画不为空的四边形
      if (!this.quadrilaterals[i].isEmpty()) {
        //描画四边形
        this.drawQuadrilateral(this.context, this.quadrilaterals[i]);
        console.log("drawQuadrilateral")
      }
    }
  }

  /**
   * 描画四边形
   * @param ctx
   * @param quadrilateral
   */
  public drawQuadrilateral(ctx: CanvasRenderingContext2D, quadrilateral: Quadrilateral): void {
    ctx.fillStyle = this.pointColor;
    ctx.lineWidth = this.linewidth;
    ctx.strokeStyle = this.lineColor;

    //清空画布
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //描画第一个点
    if (!quadrilateral.pointOne.isEmpty()) {
      ctx.fillRect(quadrilateral.pointOne.x, quadrilateral.pointOne.y, this.pointWidth, this.pointHeight);
    }
    //描画第二个点 和 线
    if (!quadrilateral.pointTwo.isEmpty()) {
      ctx.fillRect(quadrilateral.pointTwo.x, quadrilateral.pointTwo.y, this.pointWidth, this.pointHeight);
      ctx.beginPath();
      ctx.moveTo(quadrilateral.pointOne.x, quadrilateral.pointOne.y);
      ctx.lineTo(quadrilateral.pointTwo.x, quadrilateral.pointTwo.y);
      ctx.stroke();
      ctx.closePath();
    }

    //描画第三个点
    if (!quadrilateral.pointThree.isEmpty()) {
      ctx.fillRect(quadrilateral.pointThree.x, quadrilateral.pointThree.y, this.pointWidth, this.pointHeight);
      ctx.beginPath();
      ctx.moveTo(quadrilateral.pointTwo.x, quadrilateral.pointTwo.y);
      ctx.lineTo(quadrilateral.pointThree.x, quadrilateral.pointThree.y);
      ctx.stroke();
      ctx.closePath();
    }

    //描画第四个点
    if (!quadrilateral.pointFour.isEmpty()) {
      ctx.fillRect(quadrilateral.pointFour.x, quadrilateral.pointFour.y, this.pointWidth, this.pointHeight);
      ctx.beginPath();
      ctx.moveTo(quadrilateral.pointThree.x, quadrilateral.pointThree.y);
      ctx.lineTo(quadrilateral.pointFour.x, quadrilateral.pointFour.y);
      ctx.lineTo(quadrilateral.pointOne.x, quadrilateral.pointOne.y);
      //为了保证封闭填充.fill(),此处画了一条已经存在的线
      ctx.lineTo(quadrilateral.pointTwo.x, quadrilateral.pointTwo.y);
      ctx.stroke();
      ctx.fillStyle = this.fillStyle;
      ctx.fill();
      ctx.closePath();
    }
    ctx.restore();
  }
}

/**
 * 四边形
 */
class Quadrilateral {
  private _pointOne: Point;
  private _pointTwo: Point;
  private _pointThree: Point;
  private _pointFour: Point;

  constructor(pointOne: Point, pointTwo: Point, pointThree: Point, pointFour: Point) {
    this._pointOne = pointOne;
    this._pointTwo = pointTwo;
    this._pointThree = pointThree;
    this._pointFour = pointFour;
  }

  get pointOne(): Point {
    return this._pointOne;
  }

  set pointOne(value: Point) {
    this._pointOne = value;
  }

  get pointTwo(): Point {
    return this._pointTwo;
  }

  set pointTwo(value: Point) {
    this._pointTwo = value;
  }

  get pointThree(): Point {
    return this._pointThree;
  }

  set pointThree(value: Point) {
    this._pointThree = value;
  }

  get pointFour(): Point {
    return this._pointFour;
  }

  set pointFour(value: Point) {
    this._pointFour = value;
  }

  /**
   * 所有点都不为空
   */
  public isFull(): boolean {
    return !this.pointOne.isEmpty() && !this.pointTwo.isEmpty() && !this.pointThree.isEmpty() && !this.pointFour.isEmpty();
  }

  /**
   * 所有点都为空
   */
  public isEmpty(): boolean {
    return this.pointOne.isEmpty() && this.pointTwo.isEmpty() && this.pointThree.isEmpty() && this.pointFour.isEmpty();
  }

  public clear(): void {
    this.pointOne.reset();
    this.pointTwo.reset();
    this.pointThree.reset();
    this.pointFour.reset();
  }

  public addPoint(x, y): void {
    if (!this.isFull()) {
      if (this.pointOne.isEmpty()) {
        this.pointOne.x = x;
        this.pointOne.y = y;
        console.log("pointOne is" + this.pointOne.toString())
      } else if (this.pointTwo.isEmpty()) {
        this.pointTwo.x = x;
        this.pointTwo.y = y;
        console.log("pointTwo is" + this.pointTwo.toString())
      } else if (this.pointThree.isEmpty()) {
        this.pointThree.x = x;
        this.pointThree.y = y;
        console.log("pointThree is" + this.pointThree.toString())
      } else if (this.pointFour.isEmpty()) {
        this.pointFour.x = x;
        this.pointFour.y = y;
        console.log("pointFour is" + this.pointFour.toString())
      }
    } else {
      console.log("Quadrilateral is full");
      //清空
      this.clear();
    }
  }
}

/**
 * 点
 */
class Point {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  public isEmpty(): boolean {
    return this.x == 0 && this.y == 0;
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;
  }

  public toString(): string {
    return '[' + this.x + ',' + this.y + ']';
  }
}
