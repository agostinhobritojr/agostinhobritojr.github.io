#include "plotter.h"
#include <QDebug>

Plotter::Plotter(QWidget *parent) :
  QWidget(parent)
{
  plotx.resize(width());
  ploty.resize(width());
  for(int i=0; i<plotx.size(); i++){
    plotx[i]= 0.5;
    ploty[i]= 0.5;
  }
  startTimer(20);
}

void Plotter::mouseMoved(float x, float y){
  this->x = x;
  this->y = y;
  plotx.append(x);
  plotx.removeFirst();
  ploty.append(y);
  ploty.removeFirst();
  repaint();
}

void Plotter::timerEvent(QTimerEvent *e){
  plotx.append(plotx.last());
  plotx.removeFirst();
  ploty.append(ploty.last());
  ploty.removeFirst();
  repaint();
}

void Plotter::resizeEvent(QResizeEvent *e){
  plotx.resize(width());
  ploty.resize(height());
}

void Plotter::paintEvent(QPaintEvent *e){
  QPainter p(this);
  QPen penx, peny;
  QBrush brush;
  p.setRenderHint(QPainter::Antialiasing);
  brush.setColor(qRgb(100,100,0));
  p.setBrush(brush);
  p.drawRect(rect().adjusted(0,0,-1,-1));
  penx.setColor(qRgb(255,0,0));
  penx.setWidth(2);
  peny.setColor(qRgb(0,0,255));
  peny.setWidth(2);
  for(int i=0; i<plotx.size()-1; i=i+1){
    p.setPen(penx);
    p.drawLine(i,plotx[i]*height(),i+1,plotx[i+1]*height());
    p.setPen(peny);
    p.drawLine(i,ploty[i]*height(),i+1,ploty[i+1]*height());
  }
}
