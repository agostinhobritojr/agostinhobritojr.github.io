#ifndef FORMLETREIRO_H
#define FORMLETREIRO_H

#include <QWidget>

namespace Ui {
class FormLetreiro;
}

class FormLetreiro : public QWidget
{
    Q_OBJECT

public:
    explicit FormLetreiro(QWidget *parent = 0, int _timer = 250, int _largura = 50, int _offset = -5);
    ~FormLetreiro();

public slots:
    void setLabel(QString text);     // Função responsável por atualizar o texto

private slots:
    void timerEvent(QTimerEvent *e); // Função responsável por exibir parte do texto

private:
    Ui::FormLetreiro *ui;
    QString texto;                    // Texto a ser exibido no label
    int it;                           // Iterator para deslocamento no texto
    int largura;                // Numero de digitos que deverão aparecer
    int timer;                  // Tempo em ms para atualizar o label
    int offset;                 // números de iterações para que seja iniciado o deslocamento
};

#endif // FORMLETREIRO_H
