#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
  QMainWindow(parent),
  ui(new Ui::MainWindow)
{
  ui->setupUi(this);
  connect(ui->widgetTracker,SIGNAL(mouseMove(float,float)),
          ui->widgetPlotter,SLOT(mouseMoved(float,float)));
}

MainWindow::~MainWindow()
{
  delete ui;
}
