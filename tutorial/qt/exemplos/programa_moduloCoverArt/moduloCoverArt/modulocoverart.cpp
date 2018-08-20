#include "modulocoverart.h"
#include "ui_modulocoverart.h"

moduloCoverArt::moduloCoverArt(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::moduloCoverArt)
{       
    ui->setupUi(this);

    // Inicia o gerenciador de requisições HTTP e faz a conexão Signal/Slot de resposta
    manager = new QNetworkAccessManager(this);
    connect(manager,SIGNAL(finished(QNetworkReply*)),this,SLOT(resposta(QNetworkReply*)));
}

moduloCoverArt::~moduloCoverArt()
{    
    delete ui;
}

/**
 * @brief moduloCoverArt::atualizaCoverArt Determina o modulo atualizar o cover art de exibição.
 * @param nome_da_musica Nome da música a ser pesquisada
 * @param nome_do_artista Nome do artista a ser pesquisado
 */
void moduloCoverArt::atualizaCoverArt(QString nome_da_musica, QString nome_do_artista)
{
    QString urlBase = "https://musicbrainz.org/ws/2/recording?query=recording:\""+nome_da_musica+"\"+artist:\""+nome_do_artista+"\"&limit=1";
    qDebug()<<"moduloCoverArt: Requisição será feita na url: \n"<<urlBase;
    manager->get(QNetworkRequest(QUrl(urlBase)));
    ui->label->setText("Atualizando...");
}

/**
 * @brief moduloCoverArt::resposta Slot executado quando a requisição do get é finalizada
 * @param networkReply Resposta do WebService
 */
void moduloCoverArt::resposta(QNetworkReply* networkReply)
{
    qDebug()<<"moduloCoverArt: Resposta da requisição obtida, iniciando tratamento do mesmo";
    if(networkReply->error() == QNetworkReply::NoError){
        qDebug()<<"moduloCoverArt: Resposta veio sem erros, continuando operação";
        QByteArray byteArray = networkReply->readAll();
        QXmlStreamReader* xml = new QXmlStreamReader(byteArray);
        QString releaseID = obterReleaseID(xml);
        qDebug()<<"moduloCoverArt: releaseID obtido do XML: "<< releaseID;
        if(releaseID != "erro"){
           obterCoverArt(releaseID);
        }else{
            ui->label->setText("Nenhum resultado encontrado.");
        }
    }
}

/**
 * @brief moduloCoverArt::obterReleaseID Obtem a primeira incidencia do releaseID do XML
 * de acordo com o padrão do ws 2 da MusicBrainz.
 * @param xml XML padrão adquirido da resposta do ws 2 do MusicBrainz
 * @return O releaseID ou "erro" caso não encontre algum release
 */
QString moduloCoverArt::obterReleaseID(QXmlStreamReader* xml)
{
    xml->readNext();
    while(xml->name().toString() != "release"){
        xml->readNextStartElement();
        if(xml->atEnd()){
            return "erro";
        }
    }
    return xml->attributes().value("id").toString();
}

/**
 * @brief moduloCoverArt::obterCoverArt Gera o Pixmap no label a partir do releaseID passado.
 * @param releaseID ReleaseID obtido do XML.
 */
void moduloCoverArt::obterCoverArt(QString releaseID)
{
    try{
        CoverArtArchive::CCoverArt my_cover("moduloCoverArt");
        std::vector<unsigned char> Imagem = my_cover.FetchFront(releaseID.toStdString());
        if (Imagem.size())
        {
            std::stringstream FileName;
            FileName << "coverart.jpg";
            std::ofstream Front(FileName.str().c_str());
            Front.write((const char *)&Imagem[0],Imagem.size());
            Front.close();

            ui->label->setPixmap(QPixmap("coverart.jpg"));
        }
    }catch (CoverArtArchive::CExceptionBase e){
        qDebug()<<"moduloCoverArt: Algum erro ocorreu durante a obtencao do cover art";
        ui->label->setText("Erro\nNão foi possível obter cover art.");
    }
}

