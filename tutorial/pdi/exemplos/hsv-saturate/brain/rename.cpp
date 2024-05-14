#include <iostream>
#include <cstdlib>
#include <sstream>
#include <iomanip>

// rename files with a given extension
int main(int argc, char *argv[]){
  std::stringstream ss;
  std::string command;
  for(int i=1; i<109; i++){
    ss.str("");
    ss.fill(' ');
    ss << "mv MRbrain." << std::setw(1) << i ;
    ss.fill('0');
    ss << " MRbrain." << std::setw(3) << i ;
    command = ss.str();
    std::cout << command << std::endl;
    std::system(command.c_str());
  }
    return 0;
}