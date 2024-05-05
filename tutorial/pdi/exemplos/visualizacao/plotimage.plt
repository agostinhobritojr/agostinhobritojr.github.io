set size ratio 1
set palette gray 
set autoscale xfix
set autoscale yfix
set xtics 1
set ytics 1
set yrange [*:*] reverse
set mxtics 2
set mytics 2
set tics scale 0,0.001
set grid front mxtics mytics lw 1.5 lt -1 lc rgb 'white'
set format x ""
set format y ""
plot 'image.txt' matrix with image notitle
