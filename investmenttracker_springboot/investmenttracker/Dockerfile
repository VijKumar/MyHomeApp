FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /investmenttracker

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /investmenttracker

COPY --from=build /investmenttracker/target/investmenttracker-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "/investmenttracker/investmenttracker-0.0.1-SNAPSHOT.jar" ]



