#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

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

public slots:
    // Funções slots para as acoes

    void cliqueCheckable();
    void cliqueOp1();
    void cliqueOp2();
    void cliqueOp3();
    void cliqueOp4();

};

#endif // MAINWINDOW_H
