FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

# Bước 1: chỉ copy pom.xml, tải dependency trước
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Bước 2: copy source code sau, build sau
COPY src ./src
RUN mvn clean package -DskipTests -o

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]