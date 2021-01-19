FROM node:12.16.2-alpine AS builder
USER root

WORKDIR /opt/als-consent-oracle

RUN apk add --no-cache -t build-dependencies git make gcc g++ python libtool autoconf automake bash mysql-client \
    && cd $(npm root -g)/npm \
    && npm config set unsafe-perm true \
    && npm install -g node-gyp

COPY ./package.json ./package-lock.json /opt/als-consent-oracle/
RUN npm ci --only=production

COPY ./src /opt/als-consent-oracle/src

FROM node:12.16.2-alpine
WORKDIR /opt/als-consent-oracle

ARG BUILD_DATE
ARG VCS_URL
ARG VCS_REF
ARG VERSION

# See http://label-schema.org/rc1/ for label schema info
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.name="als-consent-oracle"
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.vcs-url=$VCS_URL
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.url="https://mojaloop.io/"
LABEL org.label-schema.version=$VERSION

# Create a non-root user: als-oracle-user
RUN adduser -D als-oracle-user
USER als-oracle-user

COPY --chown=als-oracle-user --from=builder /opt/als-consent-oracle .

EXPOSE 3000
CMD ["npm", "run", "start"]
