FROM golang:latest AS build

WORKDIR /src
COPY ../api/go.mod ../api/go.sum /src/
RUN go mod download && go mod verify

COPY ../api/cmd /src/cmd
COPY ../api/pkg /src/pkg

RUN CGO_ENABLED=0 GOOS=linux go build -o /server /src/cmd/server/main.go

FROM gcr.io/distroless/static-debian12 AS release
WORKDIR /
COPY --from=build /server /server
EXPOSE 8080
USER nonroot:nonroot
ENV GIN_MODE=release

ENTRYPOINT ["/server"]
