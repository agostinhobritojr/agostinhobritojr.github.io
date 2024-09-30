# -*- encoding: utf-8 -*-
# stub: octopress-deploy 1.3.0 ruby lib

Gem::Specification.new do |s|
  s.name = "octopress-deploy".freeze
  s.version = "1.3.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Brandon Mathis".freeze]
  s.date = "2015-07-05"
  s.description = "Easily deploy any Jekyll or Octopress site using S3, Git, or Rsync.".freeze
  s.email = ["brandon@imathis.com".freeze]
  s.homepage = "https://github.com/octopress/deploy".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.4.20".freeze
  s.summary = "Easily deploy any Jekyll or Octopress site using S3, Git, or Rsync.".freeze

  s.installed_by_version = "3.4.20" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<colorator>.freeze, [">= 0"])
  s.add_development_dependency(%q<bundler>.freeze, ["~> 1.3"])
  s.add_development_dependency(%q<octopress>.freeze, [">= 0"])
  s.add_development_dependency(%q<rake>.freeze, [">= 0"])
  s.add_development_dependency(%q<clash>.freeze, [">= 0"])
  s.add_development_dependency(%q<aws-sdk-v1>.freeze, [">= 0"])
  s.add_development_dependency(%q<pry-byebug>.freeze, [">= 0"])
end
