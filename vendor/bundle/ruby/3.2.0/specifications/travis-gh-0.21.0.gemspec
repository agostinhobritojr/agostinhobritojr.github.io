# -*- encoding: utf-8 -*-
# stub: travis-gh 0.21.0 ruby lib

Gem::Specification.new do |s|
  s.name = "travis-gh".freeze
  s.version = "0.21.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Travis CI".freeze]
  s.date = "2024-04-04"
  s.description = "multi-layer client for the github api v3".freeze
  s.email = "contact@travis-ci.org".freeze
  s.homepage = "https://github.com/travis-ci/gh".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new([">= 3.2".freeze, "< 4".freeze])
  s.rubygems_version = "3.4.20".freeze
  s.summary = "layered github client".freeze

  s.installed_by_version = "3.4.20" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<activesupport>.freeze, ["~> 7.0.8"])
  s.add_runtime_dependency(%q<addressable>.freeze, ["~> 2.8"])
  s.add_runtime_dependency(%q<faraday>.freeze, ["~> 2"])
  s.add_runtime_dependency(%q<faraday-retry>.freeze, [">= 0"])
  s.add_runtime_dependency(%q<faraday-typhoeus>.freeze, [">= 0"])
  s.add_runtime_dependency(%q<multi_json>.freeze, ["~> 1"])
  s.add_runtime_dependency(%q<net-http-persistent>.freeze, ["~> 4"])
  s.add_runtime_dependency(%q<net-http-pipeline>.freeze, [">= 0"])
end
