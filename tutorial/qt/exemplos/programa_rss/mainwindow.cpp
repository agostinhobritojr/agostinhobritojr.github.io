#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    // Cria conexao Signal/Slot do evento de requisição finalizada da classe QHttp com a função Slot funcao desta classe (this)
    connect(&http, SIGNAL(requestFinished(int,bool)), this, SLOT(funcao(int,bool)));
    ui->setupUi(this);

    // Configuracao de variaveis para as news.
    cont_news = 0;

    // Zera o xml primeiramente
    xml.clear();

    // Define a url de onde serao geradas as news, rss
    // fonte das news: Cifra Club News (http://www.cifraclubnews.com.br/)
    QUrl url("http://feeds.feedburner.com/CifraClubNews?format=xml");

    // define o url para a classe QHttp
    http.setHost(url.host());

    // Solicita a url anteriormente definida um get de dados,
    http.get(url.path());


}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::funcao(int i, bool error)
{
    // Funcao slot executada quando a requisicao de dados eh finalizada
    // Se nao ha erro e o id da conexao igual a 2, algo com relacao ao ack da comunicacao, i. e. conexao totalmente finalizada
    if(!error && i==2){

        // Repassa todo o conteudo dO QHttp (em xml) para o leitor de xml
        xml.addData(http.readAll());

        /* LEITURA DO CABECALHO */

        // Ler a proxima tag do xml
        xml.readNext();

        // Enquanto a tag atual nao for de title leia o proximo
        while(xml.name().toString() != "title"){xml.readNext();}

        // Tag atual do xml eh title logo deve ser adicionado ao label que especifica o nome do site (em html)
        ui->label->setText("<html><head/><body><p><span style='font-weight:600;'>"+xml.readElementText()+"</span></p></body></html>");

        /* LEITURA DO CORPO */

        // Enquanto o xml nao chegou ao fim faca...
        while (!xml.atEnd()) {

              // Leia a proxima tag
              xml.readNext();

              // Se a tag atual eh um item e eh de inicio, i. e. <item> e nao </item>
              if(xml.name().toString() == "item" && xml.isStartElement()){

                // Leia a proxima tag
                xml.readNext();

                // A atual tag eh, por padrao, o titulo da news
                QString titulo = xml.readElementText();

                // Leia a proxima tag DE INICIO, passa por um </title> e vai para o <link>
                xml.readNextStartElement();

                // A atual tag eh, por padrao, o link da news
                QString link = xml.readElementText();

                // Se o contador de news nao ultrapassou o maximo de news pre determinada
                if(cont_news < MAX_NEWS){

                    // adiciona ao final do vetor de titulos o  atual titulo
                    titulos.append(titulo);

                    // adiciona ao final do vetor de links o atual link
                    links.append(link);

                    // incrementa o contador de news
                    cont_news++;
                }

                // Se o contador de news chegou ao maximo
                if(cont_news == MAX_NEWS){

                    // Cria vetor de strings que ira fazer o formato em html dos titulos com os links respectivos
                    QVector<QString> news;
                    news.resize(MAX_NEWS);

                    // Para cada noticia faca
                    for(int i=0;i<MAX_NEWS;i++){

                        // Cria texto em html do i-esimo titulo referenciado com o link
                        news[i]= "<p><a href='"+links[i]+"'><span style=' text-decoration: underline; color:#0000ff; font-size:7pt;'>"+titulos[i]+"</span></a></p>";
                    }

                    // Cria QString que ira possuir todos os news em html
                    QString provisorio="";

                    // Para cada news concatene o texto atual com o i-esimo news
                    for(int i=0;i<MAX_NEWS;i++){
                        provisorio+=news[i];
                    }

                    // Define o texto, em html, que sera exibido na label
                    QString texto = "<html><head/><body>"+provisorio+"</body></html>";

                    // Define o texto que sera exibido no label
                    ui->label_news->setText(texto);

                    // Ajusta o tamanho da label para que exiba todo o seu conteudo
                    ui->label_news->adjustSize();

                    // Ajusta o tamanho da frame para que exiba todo o seu conteudo
                    ui->frame->adjustSize();
                }
              }
        }
    }
}
