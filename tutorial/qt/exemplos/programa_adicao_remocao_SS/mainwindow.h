#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

/*
 * Arquivo header criado automaticamente pelo Qt SDK
 *
 */

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT
    
public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    Ui::MainWindow *ui;

    /*
     * Definindo os Signals
     */

signals:
    void HabilitaSubmeter(bool);  // Signal responsavel por habilitar ou nao o botao Submeter

    /*
     * Definindo os Slots
     */

public slots:
    void RecebeCliqueVerifica();  // Slot responsavel por executar a acao ao clique do botao Verificar
    void RecebeCliqueSubmeter();  // Slot responsavel por executar a acao ao clique do botao Submeter

};

#endif // MAINWINDOW_H
