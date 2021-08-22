run:
	make env-config
	docker-compose up

env-config:
	cp .env.example .env

reset:
	rm -rf node_modules dist coverage .env
	docker-compose down --rmi all -v
	make env-config

fix:
	sudo sysctl -w vm.max_map_count=262144
	sudo systemctl restart docker
