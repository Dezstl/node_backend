# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|

  config.vm.box = "puppetlabs/centos-6.6-64-puppet"

  config.vm.network "forwarded_port", guest: 8080, host: 8000,
    auto_correct: true

  config.vm.provider "virtualbox" do |v|
    v.customize [ "guestproperty", "set", :id, "/VirtualBox/GuestAdd/VBoxService/--timesync-set-threshold", 10000 ]
    v.customize [
            "modifyvm", :id,
            "--ioapic", "on",
            "--natdnsproxy1", "off",
            "--natdnshostresolver1", "off",
            "--memory", 2048,
            "--cpus", 4
        ]
  end

  config.vm.provision "shell", path: "provision.sh"

end