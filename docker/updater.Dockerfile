FROM golang:latest AS build

WORKDIR /src
COPY ../go.mod ../go.sum /src/
RUN go mod download && go mod verify

COPY ../app /src/app
COPY ../pkg /src/pkg

RUN CGO_ENABLED=0 GOOS=linux go build -o /updater /src/app/updater/main.go

# -------------------------------------
FROM alpine:latest AS release
RUN apk add --no-cache mysql-client mariadb-connector-c

WORKDIR /
COPY --from=build /updater /updater
ENTRYPOINT ["/updater"]
