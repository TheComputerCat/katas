KATA_ROOT=$(shell echo $${KATA_ROOT:-$(PWD)/code/})

build:
	docker build -t node-katas .
test-watch:
	docker run --rm -it -v $(KATA_ROOT):/root/src/code node-katas npm run test:watch
test:
	docker run --rm -it -v $(KATA_ROOT):/root/src/code node-katas npm test
bash:
	docker run --rm -it -v $(KATA_ROOT):/root/src/code node-katas /bin/bash
coverage:
	docker run --rm -it -v $(KATA_ROOT):/root/src/code node-katas npm run coverage

