DOCKER_BUILD_CONTEXT=.
DOCKER_IMAGE_NAME_FRONT=ranking-wca-front
DOCKERFILE_PATH_FRONT=./docker/front.Dockerfile
PORT_FRONT=5173

build_front:
	sudo docker build $(DOCKER_BUILD_CONTEXT) -t $(DOCKER_IMAGE_NAME_FRONT) -f $(DOCKERFILE_PATH_FRONT)

run_front: build_front
	sudo docker run -d -p $(PORT_FRONT):$(PORT_FRONT) $(DOCKER_IMAGE_NAME_FRONT)

build_and_run_front: build_front run_front
