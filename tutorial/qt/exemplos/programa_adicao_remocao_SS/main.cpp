#include "mainwindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    /*
     * Funcao main gerada automaticamente pelo Qt SDK
     * Aconselhavel não alterar
     */

    QApplication a(argc, argv);  // Cria instancia de um QApplication
    MainWindow w;                // Cria instancia da classe MainWindow
    w.show();                    // Executa metodo padrao da classe MainWindow

    return a.exec();             // Executa metodo padrao da classe QApplication
}
