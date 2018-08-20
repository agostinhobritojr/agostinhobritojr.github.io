#ifndef MOUSETRACKER_H
#define MOUSETRACKER_H

#include <QWidget>

class MouseTracker : public QWidget
{
  Q_OBJECT
public:
  explicit MouseTracker(QWidget *parent = 0);

signals:
  int mouseMove(float, float);
public slots:

protected slots:
  void paintEvent(QPaintEvent *e);
  void mouseMoveEvent(QMouseEvent *e);
};

#endif // MOUSETRACKER_H
