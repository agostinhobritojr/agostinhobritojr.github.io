# -*- encoding: utf-8 -*-
# stub: faraday-rack 2.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "faraday-rack".freeze
  s.version = "2.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "changelog_uri" => "https://github.com/lostisland/faraday-rack", "homepage_uri" => "https://github.com/lostisland/faraday-rack", "source_code_uri" => "https://github.com/lostisland/faraday-rack" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["@iMacTia".freeze]
  s.date = "2022-03-12"
  s.description = "Faraday adapter for Rack".freeze
  s.email = ["giuffrida.mattia@gmail.com".freeze]
  s.homepage = "https://github.com/lostisland/faraday-rack".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.4.0".freeze)
  s.rubygems_version = "3.4.20".freeze
  s.summary = "Faraday adapter for Rack".freeze

  s.installed_by_version = "3.4.20" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<faraday>.freeze, ["~> 2.0"])
end
