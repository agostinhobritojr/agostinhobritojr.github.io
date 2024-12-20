# -*- encoding: utf-8 -*-
# stub: libv8 3.16.14.19.1 x86_64-linux lib ext

Gem::Specification.new do |s|
  s.name = "libv8".freeze
  s.version = "3.16.14.19.1"
  s.platform = "x86_64-linux".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze, "ext".freeze]
  s.authors = ["Charles Lowell".freeze]
  s.date = "2017-03-09"
  s.description = "Distributes the V8 JavaScript engine in binary and source forms in order to support fast builds of The Ruby Racer".freeze
  s.email = ["cowboyd@thefrontside.net".freeze]
  s.homepage = "http://github.com/cowboyd/libv8".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.4.20".freeze
  s.summary = "Distribution of the V8 JavaScript engine".freeze

  s.installed_by_version = "3.4.20" if s.respond_to? :installed_by_version

  s.specification_version = 3

  s.add_development_dependency(%q<rake>.freeze, ["~> 10"])
  s.add_development_dependency(%q<rake-compiler>.freeze, ["~> 0"])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 2"])
  s.add_development_dependency(%q<rspec-spies>.freeze, ["~> 2"])
end
