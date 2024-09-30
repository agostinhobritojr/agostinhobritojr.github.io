# -*- encoding: utf-8 -*-
# stub: gh 0.16.0 ruby lib

Gem::Specification.new do |s|
  s.name = "gh".freeze
  s.version = "0.16.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Konstantin Haase".freeze]
  s.date = "2020-04-07"
  s.description = "multi-layer client for the github api v3".freeze
  s.email = ["konstantin.mailinglists@googlemail.com".freeze]
  s.homepage = "https://github.com/travis-ci/gh".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0".freeze)
  s.rubygems_version = "3.4.20".freeze
  s.summary = "layered github client".freeze

  s.installed_by_version = "3.4.20" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
  s.add_development_dependency(%q<webmock>.freeze, [">= 0"])
  s.add_runtime_dependency(%q<faraday>.freeze, ["~> 0.8"])
  s.add_runtime_dependency(%q<faraday_middleware>.freeze, ["~> 0.14"])
  s.add_runtime_dependency(%q<activesupport>.freeze, ["~> 5.0"])
  s.add_runtime_dependency(%q<multi_json>.freeze, ["~> 1.0"])
  s.add_runtime_dependency(%q<addressable>.freeze, ["~> 2.4"])
  s.add_runtime_dependency(%q<net-http-persistent>.freeze, ["~> 2.9"])
  s.add_runtime_dependency(%q<net-http-pipeline>.freeze, [">= 0"])
end
