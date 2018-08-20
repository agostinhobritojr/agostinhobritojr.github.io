#include "formletreiro.h"
#include "ui_formletreiro.h"
#include <qdebug.h>


FormLetreiro::FormLetreiro(QWidget *parent,int _timer, int _largura, int _offset) :
    QWidget(parent),
    ui(new Ui::FormLetreiro)
{    
    ui->setupUi(this);

    if(_offset>=0) _offset = -_offset; // Considera o modulo sempre para o valor negativo

    timer=_timer;          // Define o periodo (ms) de atualização do label
                           // Quanto maior mais lento será o deslocamento
    largura=_largura;      // Define o número de letras que irão ser exibidas

                           // Quanto maior mais caracteres irão aparecer no label
    offset=_offset;        // Define o número de iterações necessárias para iniciar deslocamento
                           // Quanto maior mais demorado será a pausa inicial
    texto="Undefined Text";  // Texto inicial
    it=offset;               // Iniciando o iterador para offset

    this->setGeometry(0,0,400,40);      // Define o tamanho do Form
    ui->label->setGeometry(0,0,400,40); // Define o tamanho do label

    startTimer(timer);                  // Inicia o temporizador
}

FormLetreiro::~FormLetreiro()
{
    delete ui;
}

void FormLetreiro::setLabel(QString text)
{
    /** Função que atuliza texto a ser exibido no label */
    texto=text; // Atualiza texto
    it=offset;  // Reinicia iterador
}

void FormLetreiro::timerEvent(QTimerEvent *e)
{
    /** Função que é executada periodicamente */

    Q_UNUSED(e);

    // Se a substring do iterador até iterador + largura for NULL
    if(texto.mid(it,largura).isNull()){
        it=offset;  // Reinicia iterador
    }
    ui->label->setText(texto.mid(it,largura));  // Atualiza texto no label
    it++;                                       // Incrementa iterador
}
