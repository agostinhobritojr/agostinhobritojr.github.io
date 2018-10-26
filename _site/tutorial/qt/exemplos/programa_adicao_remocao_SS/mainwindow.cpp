#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    /*
     * Construtor da classe MainWindow
     * Tudo sera executado ao ato da instancia desta classe
     */

    ui->setupUi(this);                          // Metodo padrao ao construtor (gerado automaticamente)
    ui->pushButton_submete->setEnabled(false);  // Desabilita o botao Submeter ao iniciar a classe
}

MainWindow::~MainWindow()
{
    /*
     *  Destrutor da classe
     */

    delete ui;
}


void MainWindow::RecebeCliqueVerifica()
{
    /*
     * Slot responsavel por ser executado mediante emissao do Signal
     * clicked() do botao Verificar.
     * Objetivo: Analisar campos preenchidos pelo usuario e emitir
     * o Signal responsavel por habilitar ou nao o botao Submeter
     */

    bool nomeVazio = ui->nomeLineEdit->text().isEmpty();         // variavel que armazena true e false se o campo nome esta preenchido
    bool enderecoVazio = ui->enderecoLineEdit->text().isEmpty(); // variavel que armazena true e false se o campo endereco esta preenchido
    int idade = ui->idadeSpinBox->value();                       // variavel que armazena o valor da idade fornecida pelo usuario

    if(nomeVazio || enderecoVazio || idade<=0){                  // Se o campo nome esta vazio ou o campo endereco esta vazio ou a idade eh menor ou igual a zero entao faca
        emit HabilitaSubmeter(false);                            // Emitir Signal HabilitaSubmeter com parametro false (desabilita o botao)
    }else{                                                       // Se nao
        emit HabilitaSubmeter(true);                             // Emitir Signal HabilitaSubmeter com parametro true (habilita botao)
    }
}

void MainWindow::RecebeCliqueSubmeter()
{
    /*
     * Slot responsavel por ser executado mediante emissao do Signal
     * clicked() do botao Submeter.
     * Objetivo: Obter os dados fornecidos pelo usuário e organiza-los
     * em um texto para ser exibido em um QLabel.
     */

    QString nome = ui->nomeLineEdit->text();          // Variavel que armazena o conteudo do campo nome
    QString endereco = ui->enderecoLineEdit->text();  // Variavel que armazena o conteudo do campo endereco
    int idade = ui->idadeSpinBox->value();            // Varivavel que armazena o valor do campo idade

    QString texto = "NOME: "+nome+"\nENDEREÇO: "+
            endereco+"\nIDADE: "+
            QString::number(idade);                   // Variavel que armazena o texto organizado com os dados fornecidos pelo usuario
    ui->label->setText(texto);                        // Define o texto no QLabel
    ui->label->adjustSize();                          // Ajusta tamanho do QLabel para exibir seu conteudo perfeitamente
}
