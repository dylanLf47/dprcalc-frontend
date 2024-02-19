FROM maven:latest AS build
COPY . .
RUN mvn clean package -Dskiptests

FROM openjdk:17-jdk-slim
COPY --from=build /target/demo-0.0.1-SNAPSHOT.jar demo.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","demo.jar"]