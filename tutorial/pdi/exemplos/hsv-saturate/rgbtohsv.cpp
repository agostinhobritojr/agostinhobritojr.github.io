// create code to convert from rgb to hsv

#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

vector<double> rgb2hsv(int r, int g, int b) {
    double R = r / 255.0;
    double G = g / 255.0;
    double B = b / 255.0;

    double Cmax = max(R, max(G, B));
    double Cmin = min(R, min(G, B));
    double delta = Cmax - Cmin;

    double H = 0;
    if (delta == 0) {
        H = 0;
    } else if (Cmax == R) {
        H = 60 * fmod((G - B) / delta, 6);
    } else if (Cmax == G) {
        H = 60 * ((B - R) / delta + 2);
    } else if (Cmax == B) {
        H = 60 * ((R - G) / delta + 4);
    }

    double S = Cmax == 0 ? 0 : delta / Cmax;
    double V = Cmax;

    return {H, S, V};
}

vector<double> rgbtohsv(int r, int g, int b){
    double R = r / 255.0;
    double G = g / 255.0;
    double B = b / 255.0;
    double H = 0, S = 0, V = 0;

    double Cmax = std::max(R, std::max(G, B));
    double Cmin = std::min(R, std::min(G, B));
    double delta = Cmax - Cmin; 

    V = Cmax;

    if( delta == 0 ) return {0, 0, V};

    if( V == R ) {
       H = 60*(G-B)/delta;
    }
    else if( V == G ) {
       H = 120+ 60*(B-R)/delta;
    }
    else if( V == B ) {
       H = 240+ (R-G)/delta;
    }

    if( V != 0 ) {
       S = 1 - Cmin/V;
    }
    else {
       S = 0;
    }

    if( H < 0 ) {
       H = H + 360;
    }

    return {H, S, V};
}

vector<int> hsv2rgb(double H, double S, double V) {
    double C = V * S;
    double X = C * (1 - abs(fmod(H / 60, 2) - 1));
    double m = V - C;

    double R, G, B;
    if (H >= 0 && H < 60) {
        R = C;
        G = X;
        B = 0;
    } else if (H >= 60 && H < 120) {
        R = X;
        G = C;
        B = 0;
    } else if (H >= 120 && H < 180) {
        R = 0;
        G = C;
        B = X;
    } else if (H >= 180 && H < 240) {
        R = 0;
        G = X;
        B = C;
    } else if (H >= 240 && H < 300) {
        R = X;
        G = 0;
        B = C;
    } else {
        R = C;
        G = 0;
        B = X;
    }

    return {int((R + m) * 255), int((G + m) * 255), int((B + m) * 255)};
}

int main() {
    vector<double> hsv = rgb2hsv(255, 254, 253);
    cout << "H: " << hsv[0] << " S: " << hsv[1] << " V: " << hsv[2] << endl;
    hsv = rgbtohsv(255, 254, 253);
    cout << "H: " << hsv[0] << " S: " << hsv[1] << " V: " << hsv[2] << endl;
    return 0;
}