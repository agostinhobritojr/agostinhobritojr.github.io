#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    // Conectando as acoes atraves do comando connect com o signal triggered()
    connect(ui->actionOpcao3,SIGNAL(triggered()),this,SLOT(cliqueOp3()));
    connect(ui->actionOpcao4,SIGNAL(triggered()),this,SLOT(cliqueOp4()));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::cliqueCheckable()
{
    // Função slot que é executada ao clica na ação Checkable

    if(ui->actionCheckable->isChecked()){
        ui->textEdit->append("Clique checkable, ON");
    }else{
        ui->textEdit->append("Clique checkable, OFF");
    }
}

void MainWindow::cliqueOp1()
{
    // Função slot que é executada ao clica na ação opção 1
    ui->textEdit->append("Clique opção 1");
}


void MainWindow::cliqueOp2()
{
    // Função slot que é executada ao clica na ação opção 2
    ui->textEdit->append("Clique opção 2");
}


void MainWindow::cliqueOp3()
{
    // Função slot que é executada ao clica na ação opção 3
    ui->textEdit->append("Clique opção 3");
}


void MainWindow::cliqueOp4()
{
    // Função slot que é executada ao clica na ação opção 4
    ui->textEdit->append("Clique opção 4");
}
