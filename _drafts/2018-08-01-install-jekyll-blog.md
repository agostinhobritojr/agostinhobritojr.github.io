---
layout: post
title: Instalando Jekyll...
author: Agostinho Brito
# date element overrides date in title format.
#date: 2015-1-31
tag:
  - install_jekyll
  - ubuntu_setup
mathjax: true
---

A criação de um blog com Jekyll pode ser feito com passos simples,
como será mostrado nesse post. Funciona que é uma maravilha, mas é
necessário que o sistema tenha disponível todo o aparato que o Jekyll
precisa para operar e, normalmente, esse aparato não vem instalado por
default num _fresh install_ do sistema.

<!--more-->

Os passos seguintes foram testados em um sistema GNU Linux Ubuntu,
versão 18.04 _fresh install_, ou seja, num sistema recém-instalado,
sem nenhuma das ferramentas necessárias para uma execução adequada de
um blog com Jekyll.

O primeiro passo foi a instalação é do próprio Jekyll. Basta digitar o comando

```shell
$ sudo apt install jekyll
```

que praticamente todo o ferramental que necessário será
instalado. Como o Jekyll é feito em ruby, todas as dependências para
que funcione também são instaladas, como o próprio interpretador ruby,
bibliotecas para a criação de um pequeno servidor web e formatadores de
conteúdo, entre outras coisas.

O _ruby bundler_ também deve ser instalado. Trata-se de uma ferramenta
que permite a instalação automática de pacotes em ruby que podem ser
necessários para personalização da página _default_ que criada pelo
Jekyll. Não necessariamente sua presença é necessária, mas vários
temas criados para o Jekyll usam *gemas* do ruby para melhorar
aspectos visuais e introduzir elementos nas páginas. A incorporação
dessa gemas é justamente tratada pelo `bundler`

```shell
$ sudo apt install bundler
```

Daqui para frente a criação de um repositório local para o blog pode
ser feita com comandos adaptados diretamento do próprio site
[jekyllrb.com](http://jekyllrb.com):

```shell
$ jekyll new meublog
$ cd meublog
$ bundle exec jekyll serve
```

Ou quase... Essa última instrução nem sempre funciona. No Ubuntu o
bundler exige a presença de um arquivo `Gemfile` no diretório onde o
blog foi criado (no caso, o diretório `meublog`) e esse arquivo não é
criado por default pelo Jekyll. Basta criar um arquivo vazio com
qualquer editor de texto e nomeá-lo como `Gemfile` ou fazer isso na
própria shell com o comando `touch`.

```shell
$ touch Gemfile
```

Agora é só repetir a instrução que invoca o bundler que o sistema será
preparado sem erros.

```shell
$ bundle exec jekyll serve
```

Se a instalação tiver sido feita corretamente as seguintes mensagems
deverão ser apresentadas no terminal:

```shell
Configuration file: /home/user/meublog/_config.yml
            Source: /home/user/meublog
       Destination: /home/user/meublog/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 0.225 seconds.
 Auto-regeneration: enabled for '/home/user/meublog'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

O Jekyll deverá processar as páginas criadas localmente,
convertendo-as para HTML e hospedando-as no diretório _site, de onde
as páginas são dispensadas para o navegador.

Agora é só acessar o endereço
[http://127.0.0.1:4000](http://127.0.0.1:4000/) no seu navegador e o
esqueleto do blog deverá ser mostrado.

Mantenha o terminal onde o comando `bundle` foi lançado, para não
finalizar o processo que executa o pequeno servidor web e ainda poder
acompanhar todas as alterações realizadas no desenvolvimento dos
posts.

Os procedimentos descritos aqui servem apenas para criar um esqueleto
bem rudimentar para um blog baseado em Jekyll. A criação de um blog
com qualidade visual diferenciada é possível e será fruto de um post
futuro.

Para os curiosos, é possível trabalhar com temas em Jekyll, como
sugerem sites como [jekyllthemes.io](https://jekyllthemes.io/). O
próprio [github.com](https://github.com) suporta Jekyll e, inclusive,
ajuda a criação de blogs com alguns temas sugeridos.