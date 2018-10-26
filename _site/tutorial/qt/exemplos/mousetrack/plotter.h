#ifndef PLOTTER_H
#define PLOTTER_H

#include <QWidget>
#include <QPainter>
#include <QDebug>
#include <QBrush>
#include <QPen>
#include <QVector>

class Plotter : public QWidget
{
  Q_OBJECT
  QVector<float> plotx, ploty;
  float x, y;
public:
  explicit Plotter(QWidget *parent = 0);

signals:

public slots:
  void mouseMoved(float x, float y);
  void paintEvent(QPaintEvent *e);
protected slots:
  void resizeEvent(QResizeEvent *e);
  void timerEvent(QTimerEvent *e);
};

#endif // PLOTTER_H
