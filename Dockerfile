FROM node:11

# Add User snail
RUN groupadd -g 999 snail && useradd -r -u 999 -g snail snail

WORKDIR /usr/src/app
RUN chown -R snail:snail /usr/src/app

# Add Tini Support
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

# Move and Install project
COPY package.json .
RUN npm install --production
COPY . .

# User
USER snail

EXPOSE 8000
ENTRYPOINT [ "/tini", "--" ]
CMD [ "node", "server" ]