FROM golang:latest AS build

WORKDIR /src
COPY ../back/go.mod ../back/go.sum /src/
RUN go mod download && go mod verify

COPY ../back/cmd /src/cmd
COPY ../back/pkg /src/pkg

RUN CGO_ENABLED=0 GOOS=linux go build -o /server /src/cmd/server/main.go

FROM gcr.io/distroless/static-debian12 AS release
WORKDIR /
COPY --from=build /server /server
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/server"]
