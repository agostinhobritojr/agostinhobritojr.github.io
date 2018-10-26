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

void MainWindow::clickGO()
{
    CoverArtArchive::CCoverArt my_cover("teste");
    QString versao = QString::fromStdString(my_cover.Version());
    ui->textBrowser->append("Versao do libcoverart: "+versao+"\n");
    std::string ReleasedID = ui->lineEdit_ReleasedID->text().toStdString();
    std::string ImageID = ui->lineEdit_ImageID->text().toStdString();

    std::vector<unsigned char> Imagem = my_cover.FetchImage(ReleasedID,ImageID,CoverArtArchive::CCoverArt::eSize_250);
    ui->textBrowser->append("Front has size "+QString::number(Imagem.size())+"\n");

    if (Imagem.size())
        {
            std::stringstream FileName;
            FileName << "novo-front.jpg";
            ui->textBrowser->append("Saving front to '"+QString::fromStdString(FileName.str())+"'\n");

            std::ofstream Front(FileName.str().c_str());
            Front.write((const char *)&Imagem[0],Imagem.size());
            Front.close();

            ui->label->setPixmap(QPixmap("novo-front.jpg"));
        }

}
