#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::clicked()
{
    QString musica = ui->lineEdit_musica->text();
    QString artista = ui->lineEdit__artista->text();

    emit signal_atualizar(musica,artista);
}
