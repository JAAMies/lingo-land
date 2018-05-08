#!/bin/bash
# Getting the operating system
OpSys=`uname`
# Getting the port if needed
Args=(${1//=/ })
ArgName="${Args[0]=none}"
Port="${Args[1]=3333}"
if [ "${ArgName}" != "dev_port" ] && [ "${ArgName}" != "none" ];
then
	echo "$(tput setaf 1)ERROR: You passed an illegal argument! We only accept dev_port=<your-port-here> (tput sgr0)"
fi
# Template for stunnel.conf
read -d '' ConfExample << EOF
pid=
 
cert = cur_path/stunnel.pem
sslVersion = all
options = NO_SSLv2
foreground = yes
output = cur_path/stunnel.log # a path that exists
 
[https]
accept=8443
connect=${Port} # or 8000 or whatever port you're running on
TIMEOUTclose=1
EOF

# Where my hipsters at!?
if [ "$OpSys" = "Darwin" ];
then
	echo "$(tput setaf 4)Hello! We're on a mac - going to check for brew...$(tput sgr0)"
	if ! `type brew >/dev/null 2>&1`;
	then
		echo "$(tput setaf 1)ERROR: You need to install Brew to proceed... $(tput sgr0)"
		echo "$(tput setaf 1)To download brew checkout this site: http://brew.sh/ $(tput sgr0)"
	else
		echo "$(tput setaf 7)Sweet brew is installed!$(tput sgr0)"
	fi
fi

# Where my neckbeards at!?
if [ "$OpSys" = "Linux" ];
then
	echo "$(tput setaf 4)Hello! We're on a linux machine - going to check for apt...$(tput sgr0)"
	if ! `type apt-get >/dev/null 2>&1`;
	then
		echo "$(tput setaf 1)ERROR: You need to install apt-get to proceed... $(tput sgr0)"
		echo "$(tput setaf 1)To download apt-get checkout this page: http://bit.ly/1mTP84x $(tput sgr0)"
	else
		echo "$(tput setaf 7)Awesome apt is installed!$(tput sgr0)"
	fi
fi

echo "$(tput setaf 7)OK, Now we're going to create some ssl keys for stunnel...$(tput sgr0)"
cd ~/ && openssl genrsa 1024 > stunnel.key && openssl req -new -x509 -nodes -sha1 -days 365 -key ~/stunnel.key > ~/stunnel.cert && cat ~/stunnel.key ~/stunnel.cert > ~/stunnel.pem
# must stay down here because we just changed directories bro
StunnelDir=`pwd`
echo "$(tput setaf 4)Keys created at $StunnelDir/stunnel.key $StunnelDir/stunnel.cert && $StunnelDir/stunnel.pem$(tput sgr0)"

if [ "$ArgName" != "dev_port" ];
then
	echo "$(tput setaf 4)Using DEFAULT port $Port in stunnel.conf file$(tput sgr0)"
else
	echo "$(tput setaf 4)Using port $Port in stunnel.conf file$(tput sgr0)"
fi

# create the conf file
ConfExample="${ConfExample//cur_path/$StunnelDir}"
cd $StunnelDir && echo "$ConfExample" > stunnel.conf
echo "$(tput setaf 7)Awesome - we just created your stunnel.conf!$(tput sgr0)"
echo "$(tput setaf 4)DONT FORGET TO START YOUR DEV SERVER ON PORT $Port $(tput sgr0)"
echo "$(tput setaf 7)To run it: sudo stunnel $StunnelDir/stunnel.conf $(tput sgr0)"
