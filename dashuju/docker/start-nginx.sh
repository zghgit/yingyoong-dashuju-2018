#/bin/bash

PROFILE=$NGINX_PROFILE
echo $PROFILE configuration is activated!
if [ "$PROFILE" = "prod" ] ; then
	`mv /usr/share/nginx/dw-front/docker/conf/prod.conf /etc/nginx/conf.d/default.conf`
elif [ "$PROFILE" = "test" ] ; then
	`mv /usr/share/nginx/dw-front/docker/conf/test.conf /etc/nginx/conf.d/default.conf`
elif [ "$PROFILE" = "docker" ] ; then
	`mv /usr/share/nginx/dw-front/docker/conf/docker.conf /etc/nginx/conf.d/default.conf`
elif [ "$PROFILE" = "custom" ] ; then
	echo "$SERVER_LIST is providing api gateway services"
	SERVERS=$(echo $SERVER_LIST | tr "," "\n")
	UPSTREAM_STRING="upstream api_gateway {"
	for SERVER in $SERVERS; do
		UPSTREAM_STRING=${UPSTREAM_STRING}" server "${SERVER}" weight=6;"
	done
	UPSTREAM_STRING=${UPSTREAM_STRING}"}"
	echo $UPSTREAM_STRING > /etc/nginx/conf.d/default.conf
	`cat /usr/share/nginx/dw-front/docker/conf/custom.conf >> /etc/nginx/conf.d/default.conf`
else
	`mv /usr/share/nginx/dw-front/docker/conf/dev.conf /etc/nginx/conf.d/default.conf`
fi
`service nginx start`