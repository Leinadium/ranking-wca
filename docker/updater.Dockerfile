FROM golang:latest AS build

WORKDIR /src
COPY ../back/go.mod ../back/go.sum /src/
RUN go mod download && go mod verify

COPY ../back/cmd /src/cmd
COPY ../back/pkg /src/pkg

RUN CGO_ENABLED=0 GOOS=linux go build -o /updater /src/cmd/updater/main.go

# -------------------------------------
FROM alpine:latest AS release
RUN apk add --no-cache mysql-client mariadb-connector-c

WORKDIR /
COPY --from=build /updater /updater
ENTRYPOINT ["/updater"]
