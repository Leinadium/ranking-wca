FROM golang:latest AS build

WORKDIR /src
COPY ../go.mod ../go.sum /src/
RUN go mod download && go mod verify

COPY ../app /src/app
COPY ../pkg /src/pkg

RUN CGO_ENABLED=0 GOOS=linux go build -o /server /src/app/server/main.go

FROM gcr.io/distroless/base-debian11 AS release
WORKDIR /
COPY --from=build /server /server
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/server"]
