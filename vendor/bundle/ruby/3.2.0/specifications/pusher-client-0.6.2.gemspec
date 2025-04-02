# -*- encoding: utf-8 -*-
# stub: pusher-client 0.6.2 ruby lib

Gem::Specification.new do |s|
  s.name = "pusher-client".freeze
  s.version = "0.6.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Pusher".freeze, "Logan Koester".freeze]
  s.date = "2015-05-14"
  s.description = "Client for consuming WebSockets from http://pusher.com".freeze
  s.email = ["support@pusher.com".freeze]
  s.extra_rdoc_files = ["LICENSE.txt".freeze, "README.rdoc".freeze]
  s.files = ["LICENSE.txt".freeze, "README.rdoc".freeze]
  s.homepage = "http://github.com/pusher/pusher-ruby-client".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.4.20".freeze
  s.summary = "Client for consuming WebSockets from http://pusher.com".freeze

  s.installed_by_version = "3.4.20" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<websocket>.freeze, ["~> 1.0"])
  s.add_runtime_dependency(%q<json>.freeze, [">= 0"])
  s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
  s.add_development_dependency(%q<rake>.freeze, [">= 0"])
  s.add_development_dependency(%q<bundler>.freeze, [">= 0"])
end
