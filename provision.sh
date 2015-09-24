#!/bin/bash

#Install Ruby 1.9.3
echo "Installing ruby 1.9.3"
if [[ $(ruby -e 'print RUBY_VERSION') != "1.9.3" ]]; then
    # Appears to be another firewall problem when trying to import the key
    # gpg2 --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
    # So, curl the key and import it
    wget -O /tmp/D39DC0E3.asc https://keybase.io/mpapis/key.asc
    gpg2 --import /tmp/D39DC0E3.asc
    curl -sSL https://get.rvm.io | bash -s stable
    source /etc/profile.d/rvm.sh
    rvm requirements
    rvm install 1.9.3
    rvm use 1.9.3 --default
    rvm rubygems current
fi
echo "Done"


# Install mongodb
echo "Installing mongodb"
hash mongo 2>/dev/null
if [[ $? -ne 0 ]]; then
    # Add mongo repo
    cat > /etc/yum.repos.d/mongodb.repo <<EOF
[mongodb]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1
EOF

    yum install -y mongodb-org

    # Allow mongo connections from vagrant host
    mongoConfig="/etc/mongod.conf"
    cp $mongoConfig $mongoConfig.old
    cat $mongoConfig | sed "s/127\.0\.0\.1/0\.0\.0\.0/" > $mongoConfig.new
    cp $mongoConfig.new $mongoConfig

    # Start mongodb
    service mongod start
fi
echo "Done"

#firewall!
service iptables stop
chkconfig iptables off
echo "Done"

# Install nodejs + npm
echo "Installing nodejs + npm"
hash node 2>/dev/null
if [[ $? -ne 0 ]]; then
    curl --silent --location https://rpm.nodesource.com/setup | bash -
    sudo yum install -y nodejs
fi
echo "Done"

# Install gems
echo "Installing ruby-devel"
yum install -y ruby-devel
echo "Done"


# Install packages
echo "Installing npm"
cd /vagrant/
npm install
echo "Done"

# Add sample data
#echo "Add sample MongoDB data"
#/data/mongo/reset.sh
#echo "Done"


