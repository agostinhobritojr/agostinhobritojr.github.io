cmake_minimum_required(VERSION 3.25.0)
project(sampling VERSION 0.1.0 LANGUAGES C CXX)

find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})

add_executable(sampling sampling.cpp)
target_link_libraries(sampling ${OpenCV_LIBS})
