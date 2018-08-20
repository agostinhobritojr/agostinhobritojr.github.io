#include "mousetracker.h"
#include <QBrush>
#include <QPainter>
#include <QMouseEvent>

MouseTracker::MouseTracker(QWidget *parent) :
  QWidget(parent)
{
  setMouseTracking(true);
}

void MouseTracker::mouseMoveEvent(QMouseEvent *e){
  emit mouseMove((float)e->x()/width(), (float)e->y()/height());
}

void MouseTracker::paintEvent(QPaintEvent *e){
  QPainter p(this);
  QBrush brush;
  brush.setColor(qRgb(255,100,0));
  p.setBrush(brush);
  p.drawRect(rect().adjusted(0,0,-1,-1));
}
