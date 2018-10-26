#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    // Construtor da classe, faz as definições iniciais do programa
    ui->setupUi(this);

    // Define o tamanho dos icones dos botoes
    ui->pushButton_play->setIconSize(QSize(50,50));
    ui->pushButton_pause->setIconSize(QSize(50,50));

    // Faz um clique inicial na opcao Tema 1
    ui->radioButton_tema1->click();
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::clickTema1()
{
    // Funcao slot responsavel por executar ao clique da opcao Tema 1

    // Define os icones  de Tema 1 para os dois botoes
    ui->pushButton_play->setIcon(QIcon(":/tema1/play"));
    ui->pushButton_pause->setIcon(QIcon(":/tema1/pause"));
}

void MainWindow::clickTema2()
{
    // Funcao slot responsavel por executar ao clique da opcao Tema 2

    // Define os icones  de Tema 2 para os dois botoes
    ui->pushButton_play->setIcon(QIcon(":/tema2/play"));
    ui->pushButton_pause->setIcon(QIcon(":/tema2/pause"));
}
