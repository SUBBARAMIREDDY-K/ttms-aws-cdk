#!/bin/bash

# Update package lists
sudo yum update -y

# Install Apache
sudo yum install httpd -y

# Install PHP
sudo yum install php php-mysql -y

sudo systemctl enable httpd
# Start and enable Apache
sudo systemctl start httpd


# Restart Apache
sudo systemctl restart httpd

#Install Git
sudo yum install git -y

#clone the ttms repository from GitHub
git clone https://github.com/SUBBARAMIREDDY-K/ttms.git

#Change the permission
sudo chmod 777 /var/www/html

#move the files to the /var/www/html
sudo mv ttms/* /var/www/html


